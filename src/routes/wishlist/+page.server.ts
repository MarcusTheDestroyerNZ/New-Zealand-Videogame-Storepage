import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { addGameToCart, replaceCart } from '$lib/server/cart';
import { addToWishlist, clearWishlist, getWishlistGames, removeFromWishlist } from '$lib/server/wishlist';

export const load: PageServerLoad = async ({ cookies }) => {
	const items = await getWishlistGames(cookies);

	return {
		items
	};
};

export const actions: Actions = {
	addToWishlist: async ({ request, cookies }) => {
		const formData = await request.formData();
		const gameId = formData.get('gameId');

		if (typeof gameId !== 'string' || gameId.length === 0) {
			throw redirect(303, '/store');
		}

		addToWishlist(cookies, gameId);
		throw redirect(303, '/wishlist');
	},
	removeFromWishlist: async ({ request, cookies }) => {
		const formData = await request.formData();
		const gameId = formData.get('gameId');

		if (typeof gameId !== 'string' || gameId.length === 0) {
			throw redirect(303, '/wishlist');
		}

		removeFromWishlist(cookies, gameId);
		throw redirect(303, '/wishlist');
	},
	addToCart: async ({ request, cookies }) => {
		const formData = await request.formData();
		const gameId = formData.get('gameId');

		if (typeof gameId !== 'string' || gameId.length === 0) {
			throw redirect(303, '/wishlist');
		}

		addGameToCart(cookies, gameId);
		throw redirect(303, '/cart');
	},
	buyNow: async ({ request, cookies }) => {
		const formData = await request.formData();
		const gameId = formData.get('gameId');

		if (typeof gameId !== 'string' || gameId.length === 0) {
			throw redirect(303, '/wishlist');
		}

		replaceCart(cookies, [gameId]);
		throw redirect(303, '/checkout');
	},
	clearWishlist: async ({ cookies }) => {
		clearWishlist(cookies);
		throw redirect(303, '/wishlist');
	}
};