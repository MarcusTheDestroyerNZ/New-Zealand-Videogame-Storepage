<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>
<div class="flex flex-col items-center gap-4">
	<h1 class="text-2xl font-bold mb-4">Login</h1>
	<form class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" action="?/signInEmail" method="POST" use:enhance>
		<fieldset class="fieldset">
			<label class="label" for="email">Email</label>
			<input type="email" id="email" class="input validator" name='email' placeholder="john.doe@email.com" required />
			<p class="validator-hint hidden">Required</p>
		</fieldset>

		<label class="fieldset">
			<span class="label">Name (Only for registration)</span>
			<input type="text" id="name" class="input validator" name="name" placeholder="John Doe" />
			<span class="validator-hint hidden">Required</span>
		</label>

		<label class="fieldset">
			<span class="label">Password</span>
			<input type="password" id="password" class="input validator" name="password" placeholder="Password" required />
			<span class="validator-hint hidden">Required</span>
		</label>

		<button class="btn btn-primary mt-4" type="submit">Login</button>
		<button class="btn btn-neutral mt-4" type="submit" formaction="?/signUpEmail">Register</button>
		<button class="btn btn-ghost mt-1" type="reset">Reset</button>
	</form>

	<p class="text-red-500">{form?.message ?? ''}</p>
</div>