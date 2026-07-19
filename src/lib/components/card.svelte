<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    game_id: string;
    image_url: string;
    title: string;
    description: string;
    price: string;
    wishlisted?: boolean;
    children?: Snippet;
  };

  let { game_id, image_url, title, description, price, wishlisted = false, children }: Props = $props();
</script>

<div class="card bg-base-200 w-100 shadow-sm rounded-3xl">
  <figure>
    <img
      src={image_url}
      alt="Cant LoadImage" 
      class="h-55 w-full object-cover"/>
  </figure>
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{description}</p>
    <!-- Keep the actions grouped near the price so the card stays quick to scan. -->
    <div class="card-actions flex flex-wrap items-center justify-end gap-2">
      <h1 class="m-1 mx-auto text-xl font-bold">${parseFloat(price).toFixed(2)}</h1>
      {#if children}
        {@render children?.()}
      {:else}
        <form method="post" action="/wishlist?/addToWishlist">
          <input type="hidden" name="gameId" value={game_id} />
          <button type="submit" aria-label={wishlisted ? 'Saved to wishlist' : 'Add to wishlist'} class={`btn rounded-3xl ${wishlisted ? 'btn-secondary text-secondary-content' : 'btn-ghost'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" class={`h-5 w-5 ${wishlisted ? 'fill-current' : ''}`} fill={wishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
        </form>
        <form method="post" action="?/addToCart">
          <input type="hidden" name="gameId" value={game_id} />
          <button type="submit" class="btn btn-secondary rounded-3xl">Add to Cart</button>
        </form>
        <form method="post" action="/checkout?/buyNow">
          <input type="hidden" name="gameId" value={game_id} />
          <button type="submit" class="btn btn-primary rounded-3xl">Buy Now</button>
        </form>
      {/if}
    </div>
  </div>
</div>