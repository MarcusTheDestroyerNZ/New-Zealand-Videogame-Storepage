<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    export let open = false;
    export let title = '';
</script>

{#if open}
    <div class="fixed inset-0 z-50 flex items-center justify-center" transition:fade>
        <div class="absolute inset-0 bg-black opacity-50" on:click={() => dispatch('close')}></div>
        <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">{title}</h2>
            <slot></slot>
        </div>
    </div>
{/if}