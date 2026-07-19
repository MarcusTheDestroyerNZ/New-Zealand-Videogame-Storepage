import { db } from '$lib/server/db';
import { dbReady } from '$lib/server/db';
import { game } from '$lib/server/db/schema';
import { addGameToCart } from '$lib/server/cart';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
  await dbReady;

  const allGames = await db.select().from(game);

  return {
    gameList: allGames
  };
};

export const actions = {
  addToCart: async ({ request, cookies }) => {
    const formData = await request.formData();
    const gameId = formData.get('gameId');

    if (typeof gameId !== 'string' || gameId.length === 0) {
      throw redirect(303, '/store');
    }

    addGameToCart(cookies, gameId);
    throw redirect(303, '/store');
  }
};