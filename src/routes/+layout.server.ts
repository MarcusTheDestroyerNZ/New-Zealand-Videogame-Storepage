import type { LayoutServerLoad } from './$types';
import { getCartGames } from '$lib/server/cart';
import { getWishlistGames } from '$lib/server/wishlist';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const [cartItems, wishlistItems] = await Promise.all([
		getCartGames(cookies),
		getWishlistGames(cookies)
	]);

	const cartTotal = cartItems.reduce((sum, item) => sum + Number.parseFloat(item.price), 0);

	return {
		user: locals.user ?? null,
		cartItems,
		cartCount: cartItems.length,
		cartTotal,
		wishlistIds: wishlistItems.map((item) => item.id),
		wishlistCount: wishlistItems.length
	};
};