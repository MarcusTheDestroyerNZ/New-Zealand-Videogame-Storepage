<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<section class="space-y-6">
  <div class="rounded-3xl bg-base-200 p-6 shadow-sm">
    <p class="text-sm uppercase tracking-[0.2em] opacity-60">Wishlist</p>
    <h1 class="text-3xl font-bold">Saved games</h1>
    <p class="mt-2 opacity-70">Tap the heart on a game card to save it here for later.</p>

    {#if data.items.length > 0}
      <form method="post" action="?/clearWishlist" class="mt-4">
        <button class="btn btn-ghost rounded-3xl" type="submit">Clear wishlist</button>
      </form>
    {/if}
  </div>

  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {#each data.items as game}
      <article class="rounded-3xl bg-base-200 p-4 shadow-sm">
        <h2 class="font-semibold">{game.title}</h2>
        <p class="mt-1 text-sm opacity-70">{game.description}</p>
        <p class="mt-2 font-bold">${Number.parseFloat(game.price).toFixed(2)}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <form method="post" action="?/addToCart">
            <input type="hidden" name="gameId" value={game.id} />
            <button class="btn btn-secondary rounded-3xl" type="submit">Add to Cart</button>
          </form>
          <form method="post" action="?/buyNow">
            <input type="hidden" name="gameId" value={game.id} />
            <button class="btn btn-primary rounded-3xl" type="submit">Buy Now</button>
          </form>
          <form method="post" action="?/removeFromWishlist">
            <input type="hidden" name="gameId" value={game.id} />
            <button class="btn btn-ghost rounded-3xl" type="submit">Remove</button>
          </form>
        </div>
      </article>
    {:else}
      <article class="rounded-3xl bg-base-200 p-4 shadow-sm">
        <p class="opacity-70">No games in your wishlist yet.</p>
      </article>
    {/each}
  </div>
</section>