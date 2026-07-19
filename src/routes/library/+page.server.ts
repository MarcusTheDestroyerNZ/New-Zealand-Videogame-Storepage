import { eq, inArray } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { db, dbReady } from '$lib/server/db';
import { game } from '$lib/server/db/schema';
import { user } from '$lib/server/db/auth.schema';

export const load: PageServerLoad = async ({ locals }) => {
	await dbReady;

	if (!locals.user) {
		return { ownedGames: [], userName: '' };
	}

	const [currentUser] = await db.select().from(user).where(eq(user.id, locals.user.id));
	const ownedGameIds = (() => {
		try {
			const parsed = JSON.parse(currentUser?.gamesOwned ?? '[]');
			return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
		} catch {
			return [] as string[];
		}
	})();

	const ownedGames = ownedGameIds.length > 0 ? await db.select().from(game).where(inArray(game.id, ownedGameIds)) : [];

	return {
		ownedGames,
		userName: currentUser?.name ?? locals.user.name
	};
};