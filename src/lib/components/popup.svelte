<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    let { open = false, title = '', children } = $props();
</script>

{#if open}
    <div class="fixed inset-0 z-50 flex items-center justify-center" transition:fade>
        <button
            type="button"
            class="absolute inset-0 bg-black opacity-50"
            aria-label="Close popup"
            onclick={() => dispatch('close')}
        ></button>
        <div class="relative bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">{title}</h2>
            {@render children?.()}
        </div>
    </div>
{/if}