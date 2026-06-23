<script lang="ts">
    import Card from "$lib/components/card.svelte";
    let { data } = $props();
</script>

<h1 class="text-2xl font-bold mb-4">Game Store</h1>
<ul class="flex flex-wrap gap-4">
  {#each data.gameList as game}
    <Card image_url={game.url} title={game.title} description={game.description} price={game.price} />
  {:else}
    <p>No games found.</p>
  {/each}
</ul>