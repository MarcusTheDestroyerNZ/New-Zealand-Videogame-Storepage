<script lang="ts">
	import './layout.css';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from "$lib/components/navbar.svelte";

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar data={data} />
<div class="p-10">
	{@render children()}
</div>


