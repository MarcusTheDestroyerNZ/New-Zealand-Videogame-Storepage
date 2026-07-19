import { and, eq, inArray } from 'drizzle-orm';
import type { Cookies } from '@sveltejs/kit';
import { db, dbReady } from '$lib/server/db';
import { GameOwnership, game } from '$lib/server/db/schema';
import { user } from '$lib/server/db/auth.schema';

const CART_COOKIE = 'nzidia_cart';

export type CartGame = typeof game.$inferSelect;

function readCartIds(cookies: Cookies) {
	const rawValue = cookies.get(CART_COOKIE);

	if (!rawValue) {
		return [] as string[];
	}

	try {
		const parsed = JSON.parse(rawValue);

		return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
	} catch {
		return [] as string[];
	}
}

function writeCartIds(cookies: Cookies, ids: string[]) {
	cookies.set(CART_COOKIE, JSON.stringify(ids), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false,
		maxAge: 60 * 60 * 24 * 30
	});
}

export function addGameToCart(cookies: Cookies, gameId: string) {
	const cartIds = readCartIds(cookies);

	if (!cartIds.includes(gameId)) {
		cartIds.push(gameId);
		writeCartIds(cookies, cartIds);
	}
}

export function replaceCart(cookies: Cookies, ids: string[]) {
	writeCartIds(cookies, ids);
}

export function clearCart(cookies: Cookies) {
	writeCartIds(cookies, []);
}

export function removeFromCart(cookies: Cookies, gameId: string) {
	const cartIds = readCartIds(cookies).filter((item) => item !== gameId);
	writeCartIds(cookies, cartIds);
}

export async function getCartGames(cookies: Cookies) {
	await dbReady;

	const cartIds = readCartIds(cookies);

	if (cartIds.length === 0) {
		return [] as CartGame[];
	}

	const items = await db.select().from(game).where(inArray(game.id, cartIds));
	const byId = new Map(items.map((item) => [item.id, item]));

	return cartIds.map((id) => byId.get(id)).filter((item): item is CartGame => Boolean(item));
}

export async function purchaseCart(userId: string, gameIds: string[]) {
	await dbReady;

	if (gameIds.length === 0) {
		return;
	}

	const existingOwnership = await db
		.select({ gameId: GameOwnership.gameId })
		.from(GameOwnership)
		.where(and(eq(GameOwnership.userId, userId), inArray(GameOwnership.gameId, gameIds)));

	const ownedGameIds = new Set(existingOwnership.map((item) => item.gameId));
	const newOwnerships = gameIds
		.filter((gameId) => !ownedGameIds.has(gameId))
		.map((gameId) => ({ gameId, userId }));

	if (newOwnerships.length > 0) {
		await db.insert(GameOwnership).values(newOwnerships);
	}

	const [currentUser] = await db.select().from(user).where(eq(user.id, userId));
	const ownedIds = (() => {
		try {
			const parsed = JSON.parse(currentUser?.gamesOwned ?? '[]');
			return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
		} catch {
			return [] as string[];
		}
	})();

	const mergedIds = Array.from(new Set([...ownedIds, ...gameIds]));

	await db.update(user).set({ gamesOwned: JSON.stringify(mergedIds) }).where(eq(user.id, userId));
}