<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<section class="space-y-8">
  <div class="relative overflow-hidden rounded-[2rem] bg-base-200 p-10 shadow-sm">
    <div class="absolute inset-0 bg-gradient-to-br from-base-300 via-base-200 to-base-100 opacity-70"></div>
    <div class="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
      <div class="space-y-6">
        <p class="text-sm uppercase tracking-[0.3em] opacity-60">Nzidia</p>
        <h1 class="max-w-xl text-5xl font-black leading-tight md:text-6xl">Popular New Zealand games, All in One Place</h1>
        <p class="max-w-2xl text-base opacity-80 md:text-lg">
          Welcome to Nzidia, your one-stop shop for all things New Zealand gaming!
        </p>

        <div class="flex flex-wrap gap-3">
          <a class="btn btn-primary rounded-3xl" href="/store">Browse store</a>
          {#if data.user}
            <a class="btn btn-secondary rounded-3xl" href="/library">Open library</a>
            <a class="btn btn-ghost rounded-3xl" href="/account">Account</a>
          {:else}
            <a class="btn btn-secondary rounded-3xl" href="/login">Login/Register</a>
          {/if}
        </div>
      </div>

      <div class="grid gap-3 rounded-[1.5rem] bg-base-100/80 p-4 backdrop-blur">
        <p class="text-sm uppercase tracking-[0.2em] opacity-60">Features</p>
        <div class="rounded-2xl bg-base-200 p-4">
          <p class="text-xs uppercase opacity-60">Wishlist</p>
          <p class="mt-1 text-2xl font-bold">Track your favorites games</p>
        </div>
        <div class="rounded-2xl bg-base-200 p-4">
          <p class="text-xs uppercase opacity-60">Cart</p>
          <p class="mt-1 text-2xl font-bold">Manage your shopping cart</p>
        </div>
        <div class="rounded-2xl bg-base-200 p-4">
          <p class="text-xs uppercase opacity-60">Library</p>
          <p class="mt-1 text-2xl font-bold">Access your owned games</p>
        </div>
      </div>
    </div>
  </div>
</section>