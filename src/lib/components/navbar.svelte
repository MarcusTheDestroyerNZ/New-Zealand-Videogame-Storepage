<div class="navbar bg-base-200 shadow-sm">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Nzidia</a>
	</div>
	<div class="flex-none gap-2">
		<div class="dropdown dropdown-end">
			<button type="button" class="btn btn-ghost btn-circle" aria-label="Open cart menu">
				<div class="indicator">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
					<span class="badge badge-sm indicator-item">0</span>
				</div>
			</button>
			<div tabindex="-1" class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
				<div class="card-body">
					<span class="text-lg font-bold">0 Items</span>
					<span class="text-info">Subtotal: $0.00</span>
					<div class="card-actions">
						<button type="button" class="btn btn-primary btn-block">View cart</button>
					</div>
				</div>
			</div>
		</div>
		<div class="dropdown dropdown-end">
			<button type="button" class="btn btn-ghost btn-circle avatar" aria-label="Open profile menu">
				<div class="w-10 rounded-full">
					<img
						alt="Tailwind CSS Navbar component"
						src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" />
				</div>
			</button>
			<ul class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
				<li><button type="button">Settings</button></li>
				<li><button type="button">Logout</button></li>
			</ul>
		</div>
	</div>
</div>