<script lang="ts">
    let count = $state(0)

    function increment(){
        count ++
    }
</script>

<h1>{count}</h1>
<button onclick={() => increment()}>Click</button>