<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<section class="space-y-6">
    <div class="rounded-3xl bg-base-200 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] opacity-60">Cart</p>
        <h1 class="text-3xl font-bold">Your cart</h1>
        <p class="mt-2 opacity-70">Review items before checkout or clear the cart if you want to start over.</p>
    </div>

    {#if data.items.length > 0}
        <div class="space-y-4">
            {#each data.items as item}
                <div class="rounded-3xl bg-base-200 p-4 shadow-sm">
                    <h2 class="font-semibold">{item.title}</h2>
                    <p class="text-sm opacity-70">{item.description}</p>
                    <div class="mt-3 flex flex-wrap items-center gap-3">
                        <p class="font-bold">${Number.parseFloat(item.price).toFixed(2)}</p>
                        <form method="post" action="?/removeItem">
                            <input type="hidden" name="gameId" value={item.id} />
                            <button class="btn btn-ghost rounded-3xl" type="submit">Remove</button>
                        </form>
                    </div>
                </div>
            {/each}

            <div class="rounded-3xl bg-base-300 p-4">
                <p class="font-semibold">Total</p>
                <p class="text-2xl font-bold">${data.total.toFixed(2)}</p>
                <div class="mt-4 flex flex-wrap gap-3">
                    <a href="/checkout" class="btn btn-primary rounded-3xl">Go to checkout</a>
                    <form method="post" action="?/clearCart">
                        <button class="btn btn-ghost rounded-3xl" type="submit">Clear cart</button>
                    </form>
                </div>
            </div>
        </div>
    {:else}
        <p class="rounded-3xl bg-base-200 p-6 opacity-70">Your cart is empty.</p>
    {/if}
</section>
