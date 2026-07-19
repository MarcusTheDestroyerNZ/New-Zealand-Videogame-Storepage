<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="space-y-6">
	<div class="rounded-3xl bg-base-200 p-6 shadow-sm">
		<p class="text-sm uppercase tracking-[0.2em] opacity-60">Checkout</p>
		<h1 class="text-3xl font-bold">Confirm your order</h1>
		<p class="mt-2 opacity-70">This is the final step before the purchase is written into your library.</p>
	</div>

	{#if data.items.length > 0}
		<div class="rounded-3xl bg-base-200 p-6 shadow-sm space-y-4">
			{#each data.items as item}
				<div class="flex items-center justify-between gap-4 border-b border-base-300 pb-3 last:border-b-0 last:pb-0">
					<div>
						<h2 class="font-semibold">{item.title}</h2>
						<p class="text-sm opacity-70">{item.description}</p>
					</div>
					<p class="font-bold">${Number.parseFloat(item.price).toFixed(2)}</p>
				</div>
			{/each}

			<div class="rounded-2xl bg-base-300 p-4">
				<p class="text-sm uppercase opacity-60">Total</p>
				<p class="text-2xl font-bold">${data.total.toFixed(2)}</p>
			</div>

			<form method="post" action="?/completePurchase">
				<button class="btn btn-primary rounded-3xl" type="submit">Complete purchase</button>
			</form>
		</div>
	{:else}
		<div class="rounded-3xl bg-base-200 p-6 shadow-sm">
			<p class="opacity-70">Nothing is staged for checkout yet.</p>
			<a href="/store" class="btn btn-primary mt-4 rounded-3xl">Back to store</a>
		</div>
	{/if}
</section>