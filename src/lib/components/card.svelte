<script lang="ts">
  const { image_url, title, description, price } = $props();
</script>

<div class="card bg-base-200 w-96 shadow-sm rounded-3xl">
  <figure>
    <img
      src={image_url}
      alt="Cant LoadImage" 
      class="h-55 w-full object-cover"/>
  </figure>
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{description}</p>
    <div class="card-actions justify-end">
      <h1 class="m-1 mx-auto text-xl font-bold">${parseFloat(price).toFixed(2)}</h1>
      <li><a href="/cart" class="btn btn-secondary rounded-3xl">Add to Cart</a></li>
      <li><a href="/checkout" class="btn btn-primary rounded-3xl">Buy Now</a></li>
    </div>
  </div>
</div>