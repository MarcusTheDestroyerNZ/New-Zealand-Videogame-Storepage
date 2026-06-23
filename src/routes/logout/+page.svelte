<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>
<div class="max-w-md mx-auto flex items-center justify-center">
    <div class="bg-base-200 p-8 rounded shadow-md w-full">
        <div class="mb-6 text-center">
            <h2 class="text-2xl font-bold">Logout</h2>
            <p class="text-white">Are you sure you want to log out of {data.user.name}?</p>
            <form method="post" action="?/signOut" use:enhance class="mt-4">
                <button class="bg-white text-base-200 px-4 py-2 rounded-md hover:bg-base-200 hover:text-white transition">Sign out</button>
            </form>
        </div>
    </div>
</div>