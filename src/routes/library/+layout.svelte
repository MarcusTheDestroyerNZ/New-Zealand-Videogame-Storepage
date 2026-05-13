<script lang="ts">
  let { children } = $props();
</script>

<div class="bg-base-200 h-128 w-64 rounded-2xl p-4">
  <h1>Library:</h1>
    <p>Owned Games:</p>
    <ul>
        <button class="w-full px-2 py-1 bg-base-300 rounded hover:bg-base-400 flex items-center gap-8">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Logo" class="w-4 h-4 inline-block mr-1" />
            <div class="divider"></div>
            <span class="text-sm">GitHub</span>
        </button>
        <button class="w-full px-2 py-1 bg-base-300 rounded hover:bg-base-400 flex items-center gap-8 ">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Logo" class="w-4 h-4 inline-block mr-1" />
            <div class="divider"></div>
            <span class="text-sm">GitHub</span>
        </button>
    </ul>
  
</div>

{@render children()}