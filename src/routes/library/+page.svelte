<script lang="ts">
  import Popup from '$lib/components/popup.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let search = $state('');
  let sortBy = $state('title');
  let selectedGameId = $state('');
  let playPopupOpen = $state(false);

  const filteredGames = $derived.by(() => {
    const query = search.trim().toLowerCase();
    const games = [...data.ownedGames];

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

  const selectedGame = $derived.by(() => {
    return filteredGames.find((game) => game.id === selectedGameId) ?? filteredGames[0] ?? null;
  });

  // Keep the selected game aligned with whatever the current filter returns.
  $effect(() => {
    if (filteredGames.length === 0) {
      selectedGameId = '';
      return;
    }

    if (!selectedGameId || !filteredGames.some((game) => game.id === selectedGameId)) {
      selectedGameId = filteredGames[0].id;
    }
  });
</script>

<section class="grid gap-6 lg:grid-cols-[18rem_1fr]">
  <aside class="space-y-4 rounded-3xl bg-base-200 p-6 shadow-sm">
    <p class="text-sm uppercase tracking-[0.2em] opacity-60">Library</p>
    <h1 class="text-2xl font-bold">Owned games</h1>
    <p class="mt-2 text-sm opacity-70">{data.ownedGames.length} games in your collection</p>

    <label class="mt-4 block">
      <span class="text-sm opacity-70">Search library</span>
      <input bind:value={search} class="input input-bordered mt-2 w-full rounded-2xl" placeholder="Search your games" />
    </label>

    <label class="mt-4 block">
      <span class="text-sm opacity-70">Sort by</span>
      <select bind:value={sortBy} class="select select-bordered mt-2 w-full rounded-2xl">
        <option value="title">Title</option>
        <option value="price">Price</option>
      </select>
    </label>

    <div class="mt-4 space-y-3">
      {#each filteredGames as game}
        <!-- Each item stays simple so the selected state is easy to read. -->
        <button
          type="button"
          class={`w-full rounded-2xl bg-base-300 p-3 text-left transition ${selectedGame?.id === game.id ? 'ring-2 ring-primary' : 'hover:bg-base-100'}`}
          onclick={() => (selectedGameId = game.id)}
        >
          <p class="font-semibold">{game.title}</p>
        </button>
      {:else}
        <p class="text-sm opacity-70">No owned games match this filter.</p>
      {/each}
    </div>
  </aside>

  <main class="space-y-6">
    {#if selectedGame}
      <div class="grid gap-6 rounded-3xl bg-base-200 p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div class="overflow-hidden rounded-3xl bg-base-300">
          {#if selectedGame.url}
            <img src={selectedGame.url} alt={selectedGame.title} class="h-full w-full object-cover" />
          {:else}
            <div class="flex min-h-72 items-center justify-center opacity-60">No artwork available</div>
          {/if}
        </div>

        <div class="space-y-4">
          <p class="text-sm uppercase tracking-[0.2em] opacity-60">Selected game</p>
          <h2 class="text-3xl font-bold">{selectedGame.title}</h2>
          <p class="opacity-70">{selectedGame.description}</p>
          <div class="flex flex-wrap gap-3">
            <button type="button" class="btn btn-primary rounded-3xl" onclick={() => (playPopupOpen = true)}>Play</button>
          </div>
        </div>
      </div>
    {:else}
      <div class="rounded-3xl bg-base-200 p-6 shadow-sm">
        <p class="opacity-70">No owned games match this filter.</p>
      </div>
    {/if}
  </main>
</section>

<Popup open={playPopupOpen} title="Play game" on:close={() => (playPopupOpen = false)}>
  <p class="text-sm opacity-80">We don't have the rights to let you play this game, please buy it somewhere else.</p>
</Popup>