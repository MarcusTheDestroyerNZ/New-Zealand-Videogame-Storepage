<script lang="ts">
  const { image_url, title, description } = $props();
</script>

<div class="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={image_url}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{description}</p>
    <div class="card-actions justify-end">
        <button class="btn btn-secondary">Add to Cart</button>
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>