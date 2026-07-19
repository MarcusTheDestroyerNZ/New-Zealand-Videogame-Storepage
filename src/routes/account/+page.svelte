<script lang="ts">
  import type { PageData } from './$types';
  import type { ActionData } from './$types';

  let { data, form }: { data: PageData; form?: ActionData } = $props();
</script>

<section class="space-y-6">
  <div class="rounded-3xl bg-base-200 p-6 shadow-sm">
    <p class="text-sm uppercase tracking-[0.2em] opacity-60">Account</p>
    <h1 class="text-3xl font-bold">Profile settings</h1>
    <p class="mt-2 opacity-70">Update your account details, password, or sign out from here.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <form method="post" action="?/updateProfile" class="rounded-3xl bg-base-200 p-6 shadow-sm space-y-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] opacity-60">Profile</p>
        <h2 class="text-2xl font-bold">Username</h2>
      </div>

      <label class="form-control">
        <span class="label-text text-sm opacity-70">Username</span>
        <input name="name" class="input input-bordered rounded-2xl" value={data.user.name} />
      </label>

      <button class="btn btn-primary rounded-3xl" type="submit">Save username</button>
    </form>

    <form method="post" action="?/changeEmail" class="rounded-3xl bg-base-200 p-6 shadow-sm space-y-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] opacity-60">Email</p>
        <h2 class="text-2xl font-bold">Change email</h2>
      </div>

      <label class="form-control">
        <span class="label-text text-sm opacity-70">Current email</span>
        <input class="input input-bordered rounded-2xl" value={data.user.email} disabled />
      </label>

      <label class="form-control">
        <span class="label-text text-sm opacity-70">New email</span>
        <input type="email" name="newEmail" class="input input-bordered rounded-2xl" placeholder="new@email.com" />
      </label>

      <button class="btn btn-primary rounded-3xl" type="submit">Change email</button>
    </form>

    <form method="post" action="?/changePassword" class="rounded-3xl bg-base-200 p-6 shadow-sm space-y-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] opacity-60">Security</p>
        <h2 class="text-2xl font-bold">Change password</h2>
      </div>

      <label class="form-control">
        <span class="label-text text-sm opacity-70">Current password</span>
        <input type="password" name="currentPassword" class="input input-bordered rounded-2xl" />
      </label>

      <label class="form-control">
        <span class="label-text text-sm opacity-70">New password</span>
        <input type="password" name="newPassword" class="input input-bordered rounded-2xl" />
      </label>

      <button class="btn btn-primary rounded-3xl" type="submit">Change password</button>
      {#if form?.message}
        <p class="text-sm text-error">{form.message}</p>
      {/if}
    </form>

    <div class="rounded-3xl bg-base-200 p-6 shadow-sm space-y-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] opacity-60">Session</p>
        <h2 class="text-2xl font-bold">Sign out</h2>
      </div>

      <p class="opacity-70">Use this button to log out of your current account</p>

      <form method="post" action="?/signOut">
        <button class="btn btn-secondary rounded-3xl" type="submit">Log out</button>
      </form>
    </div>
  </div>
</section>