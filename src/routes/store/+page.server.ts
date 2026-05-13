import { db } from '$lib/server/db';
import { game } from '$lib/server/db/schema';

export const load = async () => {
  const allGames = await db.select().from(game);

  return {
    gameList: allGames
  };
};