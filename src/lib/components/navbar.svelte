<script lang="ts">
	import type { CartGame } from '$lib/server/cart';

	type NavData = {
		user: { name: string; email: string } | null;
		cartItems: CartGame[];
		cartCount: number;
		cartTotal: number;
		wishlistCount: number;
	};

	let { data }: { data: NavData } = $props();

	const cartLabel = $derived.by(() => (data.cartCount === 1 ? '1 item' : `${data.cartCount} items`));
</script>

<div class="navbar bg-base-200 shadow-sm">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl rounded-3xl">Nzidia</a>
		<a href="/store" class="btn btn-ghost p-5 rounded-3xl">Store</a>
		{#if data.user}
			<a href="/library" class="btn btn-ghost p-5 rounded-3xl">Library</a>
			<a href="/wishlist" class="btn btn-ghost p-5 rounded-3xl">Wishlist</a>
		{/if}
		<a href={data.user ? '/account' : '/login'} class="btn btn-ghost p-5 rounded-3xl">{data.user ? 'Account' : 'Login'}</a>
	</div>
	<div class="flex-none gap-2">
		<div class="dropdown dropdown-end dropdown-hover">
			<a href="/cart" class="btn btn-ghost btn-circle" aria-label="Open cart">
				<div class="indicator">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
					<span class="badge badge-sm indicator-item">{data.cartCount}</span>
				</div>
			</a>
			<div tabindex="-1" class="card card-compact dropdown-content bg-base-200 z-10 mt-3 w-72 shadow rounded-b-3xl rounded-t-none">
				<div class="card-body">
					<span class="text-lg font-bold">{cartLabel}</span>
					<span class="text-info">Subtotal: ${data.cartTotal.toFixed(2)}</span>
					<div class="space-y-2">
						{#each data.cartItems as item}
							<div class="flex items-center justify-between gap-3 text-sm">
								<span class="truncate">{item.title}</span>
								<span>${Number.parseFloat(item.price).toFixed(2)}</span>
							</div>
						{:else}
							<p class="text-sm opacity-70">Cart is empty.</p>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<a href="/wishlist" class="btn btn-ghost btn-circle" aria-label="Wishlist">
			<div class="indicator">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
				<span class="badge badge-sm indicator-item">{data.wishlistCount}</span>
			</div>
		</a>
		<a href='/login' class="btn btn-ghost btn-circle avatar" aria-label="Account">
			<div class="w-10 rounded-full flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
					<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
					<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
				</svg>
			</div>
		</a>
	</div>
</div>