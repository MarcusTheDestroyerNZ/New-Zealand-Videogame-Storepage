import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { clearCart, getCartGames, purchaseCart, replaceCart } from '$lib/server/cart';

export const load: PageServerLoad = async ({ cookies }) => {
	const items = await getCartGames(cookies);
	const total = items.reduce((sum, item) => sum + Number.parseFloat(item.price), 0);

	return {
		items,
		total
	};
};

export const actions: Actions = {
	buyNow: async ({ request, cookies }) => {
		const formData = await request.formData();
		const gameId = formData.get('gameId');

		if (typeof gameId !== 'string' || gameId.length === 0) {
			throw redirect(303, '/store');
		}

		replaceCart(cookies, [gameId]);

		throw redirect(303, '/checkout');
	},
	completePurchase: async ({ cookies, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const items = await getCartGames(cookies);
		await purchaseCart(locals.user.id, items.map((item) => item.id));
		clearCart(cookies);

		throw redirect(303, '/library');
	}
};