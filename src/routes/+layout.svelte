<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from "$lib/components/navbar.svelte";

	let { children } = $props();

	import { page } from "$app/state";
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="min-h-screen">
	<Navbar />
	<div class="flex">
		<div class="drawer" class:drawer-open={page.url.pathname === '/library'}>	
			<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content p-10">
				{@render children()}
			</div>
			<div class="drawer-side is-drawer-close:overflow-visible">
			<label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
			<div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
			<!-- Sidebar content here -->
			<ul class="menu w-full grow">
				<li>
					<label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<!-- Sidebar toggle icon -->
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
			</label>
				</li>

				<!-- List item -->
				<li>
				<button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Game1">
					<!-- Game icon -->
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4"><path d="M12 9l-3 3h6l-3 3"></path><path d="M20 7h-16a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -2z"></path></svg>
					<span class="is-drawer-close:hidden">Game1</span>
				</button>
				</li>
			</ul>
			</div>
		</div>
		</div>
	</div>
</div>

