<script lang="ts">
    import Breadcrumbs from "$lib/components/breadcrumbs.svelte";
    import Card from "$lib/components/card.svelte";
    let { data } = $props();
</script>

<ul>
  {#each data.userList as user}
    <li>{user.name} ({user.email})</li>
  {:else}
    <p>No users found.</p>
  {/each}
</ul>

<Breadcrumbs />
<Card image_url="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" 
    title="Shoe" 
    description="Its a Shoe" />