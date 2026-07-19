<script lang="ts">
    import Card from "$lib/components/card.svelte";
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

  let search = $state('');
  let sortBy = $state('title');

    const filteredGames = $derived.by(() => {
      const query = search.trim().toLowerCase();
      const games = [...data.gameList];

      const matchesSearch = query
        ? games.filter((game) => {
            return (
              game.title.toLowerCase().includes(query) ||
              game.description.toLowerCase().includes(query)
            );
          })
        : games;

      return matchesSearch.sort((left, right) => {
        if (sortBy === 'price') {
          return Number.parseFloat(left.price) - Number.parseFloat(right.price);
        }

        return left.title.localeCompare(right.title);
      });
    });
</script>

<section class="space-y-6">
  <div class="rounded-3xl bg-base-200 p-6 shadow-sm">
    <p class="text-sm uppercase tracking-[0.2em] opacity-60">Store</p>
    <h1 class="text-3xl font-bold">Game Store</h1>
    <p class="mt-2 max-w-2xl opacity-70">
      Browse the catalogue, filter it down, and keep the actions attached to each card.
    </p>

    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <label class="form-control">
        <span class="label-text text-sm opacity-70">Search games</span>
        <input bind:value={search} class="input input-bordered rounded-2xl" placeholder="Search by title or description" />
      </label>
      <label class="form-control">
        <span class="label-text text-sm opacity-70">Sort by</span>
        <select bind:value={sortBy} class="select select-bordered rounded-2xl">
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
      </label>
    </div>
  </div>

  <div class="flex flex-wrap gap-4">
    {#each filteredGames as game}
      <Card game_id={game.id} image_url={game.url} title={game.title} description={game.description} price={game.price} wishlisted={data.wishlistIds.includes(game.id)} />
    {:else}
      <p class="rounded-3xl bg-base-200 p-6 opacity-70">No games found.</p>
    {/each}
  </div>
</section>