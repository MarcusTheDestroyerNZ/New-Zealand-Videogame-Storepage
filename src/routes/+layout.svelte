<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from "$lib/components/navbar.svelte";
	import Breadcrumbs from "$lib/components/breadcrumbs.svelte";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar />
<div class="p-10">
	{#key page.url.pathname}
		<Breadcrumbs />
	{/key}
	{@render children()}
</div>


