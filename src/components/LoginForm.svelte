<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let success: boolean = false;
	let email: string | null;
	let password: string | null;
	let emailError: string | null = null;
	let passwordError: string | null = null;
	let signInError: string | null = null;

	const isValidEmail = (email: string | null) => {
		// eslint-disable-next-line no-useless-escape
		const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (email) {
			if (!email?.match(format)) {
				return 'Email must be a valid email address';
			}
			if (email?.length < 1) {
				return 'Email is required';
			}
			if (email?.length > 64) {
				return 'Email must be less than 64 characters';
			}
			return null;
		} else return 'Email is required';
	};

	const isValidPassword = (password: string | null) => {
		if (password) {
			if (password?.length < 6) {
				return 'Password must be at least 6 characters';
			} else if (password?.length > 32) {
				return 'Password must be less than 32 characters';
			} else {
				return null;
			}
		} else {
			return 'Password is required';
		}
	};

	const login = async () => {
		success = false;
		const validEmail = isValidEmail(email);
		const validPassword = isValidPassword(password);
		const validationError = validEmail || validPassword;

		if (validationError) {
			emailError = validEmail;
			passwordError = validPassword;
			return;
		}

		if (!email || !password) {
			return;
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			signInError = String(error);
			return;
		}

		emailError = null;
		passwordError = null;
		success = true;
		return;
	};

	$: if (success) {
		window.location.href = '/';
	}
</script>

<div class="lg:container mx-auto h-full w-full p-6">
	<form
		on:submit|preventDefault|trusted={login}
		class="flex flex-col items-center w-full justify-center"
	>
		<h1 class="text-3xl font-medium text-center mb-2">Login</h1>
		<div class="form-control w-full max-w-xs">
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				bind:value={email}
				class="input w-full max-w-xs {emailError ? 'input-error' : 'input-bordered'}"
			/>
			<label for="email" class="label">
				{#if emailError}
					<span class="label-text-alt text-error">{emailError}</span>
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
				bind:value={password}
				class="input w-full max-w-xs {passwordError ? 'input-error' : 'input-bordered'}"
			/>
			<label for="password" class="label">
				{#if passwordError}
					<span class="label-text-alt text-error">{passwordError}</span>
				{/if}
			</label>
		</div>
		<div class="w-full max-w-xs">
			<button class="btn btn-primary w-full" type="submit">Login</button>
		</div>
		{#if signInError}
			<div class="w-full rounded-lg bg-slate-100 mt-4 p-4 max-w-xs">
				<p class="text-base text-center font-medium text-error">{signInError}</p>
			</div>
		{/if}
	</form>
</div>
