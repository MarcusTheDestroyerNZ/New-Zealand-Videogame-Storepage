<script lang="ts">
  import { page } from "$app/state";
  const split_pages = page.url.pathname.split("/").filter(Boolean);
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/">Home</a></li>
    {#each split_pages as page_item}
      <li><a href="/{page_item}">{page_item.charAt(0).toUpperCase() + page_item.slice(1)}</a></li>
    {/each}
  </ul>
</div>