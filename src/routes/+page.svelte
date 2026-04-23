<script>
    import Navbar from "$lib/components/navbar.svelte";
	import Sidebar from "$lib/components/sidebar.svelte";

</script>

<div class="min-h-screen">
	<Navbar />

	<div class="flex min-h-[calc(100vh-4rem)]">
		<Sidebar />

		<main class="flex-1">
			<div class="h-full border-dashed border-zinc-300 bg-white p-6">
				<h2 class="text-xl font-semibold">Main content</h2>
				<p class="mt-2 text-sm text-zinc-600">woah</p>
			</div>
		</main>
	</div>
</div>
