<script lang="ts">
    import Card from "$lib/components/card.svelte";
    let { data } = $props();
</script>

<h1 class="text-2xl font-bold mb-4">Game Store</h1>

<p>Filters:</p>
<div class="flex gap-2 mb-4">
  <button class="px-4 py-2 bg-base-200 rounded hover:bg-base-300">Price</button>
  <button class="px-4 py-2 bg-base-200 rounded hover:bg-base-300">Name</button>
</div>


<ul class="flex flex-wrap gap-4">
  {#each data.gameList as game}
    <Card image_url={game.url} title={game.title} description={game.description} price={game.price} />
  {:else}
    <p>No games found.</p>
  {/each}
</ul>