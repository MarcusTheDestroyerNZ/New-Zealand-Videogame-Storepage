<script>
    import Navbar from "$lib/components/navbar.svelte";
	import Sidebar from "$lib/components/sidebar.svelte";
	import Index from "$lib/components/index.svelte";
</script>

<div class="min-h-screen">
	<Navbar />
	<div class="flex">
		<Sidebar />
		<main class="flex-1">
			<Index />
		</main>
	</div>
</div>
