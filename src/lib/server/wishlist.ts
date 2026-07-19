import { inArray } from 'drizzle-orm';
import type { Cookies } from '@sveltejs/kit';
import { db, dbReady } from '$lib/server/db';
import { game } from '$lib/server/db/schema';

const WISHLIST_COOKIE = 'nzidia_wishlist';

export type WishlistGame = typeof game.$inferSelect;

function readWishlistIds(cookies: Cookies) {
	const rawValue = cookies.get(WISHLIST_COOKIE);

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

function writeWishlistIds(cookies: Cookies, ids: string[]) {
	cookies.set(WISHLIST_COOKIE, JSON.stringify(ids), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false,
		maxAge: 60 * 60 * 24 * 30
	});
}

export function addToWishlist(cookies: Cookies, gameId: string) {
	const wishlistIds = readWishlistIds(cookies);

	if (!wishlistIds.includes(gameId)) {
		wishlistIds.push(gameId);
		writeWishlistIds(cookies, wishlistIds);
	}
}

export function removeFromWishlist(cookies: Cookies, gameId: string) {
	const wishlistIds = readWishlistIds(cookies).filter((item) => item !== gameId);
	writeWishlistIds(cookies, wishlistIds);
}

export function clearWishlist(cookies: Cookies) {
	writeWishlistIds(cookies, []);
}

export async function getWishlistGames(cookies: Cookies) {
	await dbReady;

	const wishlistIds = readWishlistIds(cookies);

	if (wishlistIds.length === 0) {
		return [] as WishlistGame[];
	}

	const items = await db.select().from(game).where(inArray(game.id, wishlistIds));
	const byId = new Map(items.map((item) => [item.id, item]));

	return wishlistIds.map((id) => byId.get(id)).filter((item): item is WishlistGame => Boolean(item));
}