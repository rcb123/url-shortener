<script lang="ts">
	import { enhance } from '$app/forms';
	export let action: string;
	export let form: any;
</script>

<div class="lg:container mx-auto h-full w-full p-8">
	<form method="POST" action="/signin" use:enhance class="flex flex-col items-center w-full justify-center">
		<h1 class="text-3xl font-medium text-center my-2">Login</h1>
		<div class="form-control w-full max-w-xs">
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				class="input w-full max-w-xs {form?.errors?.email ? 'input-error' : 'input-bordered'}"
				value={form?.data?.email ?? ''}
			/>
			<label for="email" class="label">
				{#if form?.errors?.email}
					<span class="label-text-alt text-error">{form?.errors?.email}</span>
				{/if}
			</label>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="password" class="label">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="password"
				class="input w-full max-w-xs {form?.errors?.password ? 'input-error' : 'input-bordered'}"
			/>
			<label for="password" class="label">
				{#if form?.errors?.password}
					<span class="label-text-alt text-error">{form?.errors?.password}</span>
				{/if}
			</label>
		</div>
		<div class="w-full max-w-xs">
			<button class="btn btn-primary w-full" type="submit">Login</button>
		</div>
	</form>
</div>
