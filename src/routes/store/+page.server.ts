import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { game } from '$lib/server/db/schema';

export const load = async () => {
  const allUsers = await db.select().from(user);
  const allGames = await db.select().from(game);

  return {
    gameList: allGames,
    userList: allUsers
  };
};