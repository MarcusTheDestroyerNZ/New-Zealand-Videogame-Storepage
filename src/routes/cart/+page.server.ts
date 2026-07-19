import type { PageServerLoad } from './$types';
import { clearCart, getCartGames, removeFromCart } from '$lib/server/cart';

export const load: PageServerLoad = async ({ cookies }) => {
	const items = await getCartGames(cookies);
	const total = items.reduce((sum, item) => sum + Number.parseFloat(item.price), 0);

	return {
		items,
		total
	};
};

export const actions = {
	removeItem: async ({ request, cookies }) => {
		const formData = await request.formData();
		const gameId = formData.get('gameId');

		if (typeof gameId === 'string' && gameId.length > 0) {
			removeFromCart(cookies, gameId);
		}

		return { success: true };
	},
	clearCart: async ({ cookies }) => {
		clearCart(cookies);
		return { success: true };
	}
};