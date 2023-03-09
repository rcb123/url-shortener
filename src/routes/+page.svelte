<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import LoginForm from '$components/LoginForm.svelte';

	let response: Response;
	let responseJSON: { data: string; status: number };
	let responseData: any = [''];

	let email: number = 0;
	let emailError: number = 0;
	let passwordError: number = 0;
	let passwordMatchError: number = 0;
	let termsError: number = 0;
	let signUpError: number = 0;

	const signOut = async () => {
		await supabase.auth.signOut();
		window.location.href = '/';
	};

	const handleSubmit = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		response = await fetch('/register', {
			method: 'POST',
			body: formData
		});
		responseJSON = await response.json();
		responseData = await JSON.parse(responseJSON.data);
		email = responseData[0].email;
		emailError = responseData[0].validEmail;
		passwordError = responseData[0].validPassword;
		passwordMatchError = responseData[0].passwordMatch;
		termsError = responseData[0].acceptedTerms;
		signUpError = responseData[0].error;
	};
</script>

<!-- Sign up and Login Forms -->
<input type="checkbox" id="register-modal" class="modal-toggle" />
<label for="register-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<div class="lg:container mx-auto h-full w-full p-8">
			<form
				on:submit|preventDefault|trusted={handleSubmit}
				class="flex flex-col items-center w-full justify-center"
			>
				<h1 class="text-3xl font-medium text-center my-2">Register</h1>
				<div class="form-control w-full max-w-xs">
					<label for="email" class="label">
						<span class="label-text">Email</span>
					</label>
					<input
						type="email"
						name="email"
						class="input w-full max-w-xs {responseData[emailError]
							? 'input-error'
							: 'input-bordered'}"
						value={responseData[email] ?? ''}
					/>
					<label for="email" class="label">
						{#if responseData[emailError]}
							<span class="label-text-alt text-error">{responseData[emailError]}</span>
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
						class="input w-full max-w-xs {responseData[passwordError]
							? 'input-error'
							: 'input-bordered'}"
					/>
					<label for="password" class="label">
						{#if responseData[passwordError]}
							<span class="label-text-alt text-error">{responseData[passwordError]}</span>
						{/if}
					</label>
				</div>
				<div class="form-control w-full max-w-xs">
					<label for="passwordConfirm" class="label">
						<span class="label-text">Confirm Password</span>
					</label>
					<input
						type="password"
						name="passwordConfirm"
						class="input w-full max-w-xs {responseData[passwordMatchError]
							? 'input-error'
							: 'input-bordered'}"
					/>
					<label for="passwordConfirm" class="label">
						{#if responseData[passwordMatchError]}
							<span class="label-text-alt text-error">{responseData[passwordMatchError]}</span>
						{/if}
					</label>
				</div>
				<div class="form-control w-full max-w-xs pb-2">
					<label class="label cursor-pointer justify-start space-x-4">
						<input
							type="checkbox"
							name="terms"
							class="checkbox checkbox-primary {responseData[passwordMatchError]
								? 'border-error'
								: ''}"
						/>
						<span class="label-text">I accept the terms and conditions</span>
					</label>
					<label for="terms" class="label">
						{#if responseData[termsError]}
							<span class="label-text-alt text-error">{responseData[termsError]}</span>
						{/if}
					</label>
				</div>
				<div class="w-full max-w-xs">
					<button class="btn btn-primary w-full" type="submit">Register</button>
				</div>
			</form>
			{#if responseJSON?.status == 200}
				<div class="mt-10 bg-slate-50 rounded-xl p-6 shadow-lg w-fit mx-auto">
					<p>Verification email sent!</p>
					<p>Please check your email</p>
				</div>
			{/if}
			{#if responseData[signUpError]}
				<div class="mt-10 bg-slate-50 rounded-xl p-6 shadow-lg w-fit mx-auto">
					<p class="text-lg text-center font-medium text-error">{responseData[signUpError]}</p>
				</div>
			{/if}
		</div>
	</label>
</label>

<input type="checkbox" id="login-modal" class="modal-toggle" />
<label for="login-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<LoginForm />
	</label>
</label>

<!-- Vertically centerd div-->
<div class="flex h-screen bg-base-200">
	<div
		class="m-auto px-6 py-3 max-w-[60vw] min-w-[30rem] shadow-primary shadow-md rounded-2xl bg-base-100 overflow-auto"
	>
		<h1 class="text-2xl mb-0 text-primary">Welcome to Shortly,</h1>
		<p>the simplest and most efficient URL shortening service on the web.</p>
		<br />
		<p>
			Our easy-to-use interface allows you to quickly and easily shorten any long URL into a
			shorter, more manageable link.
		</p>
		<br />
		<p>
			Whether you're looking to share a link on social media, include it in an email or text
			message, or simply make a long link more manageable, Shortly has you covered.
		</p>
		<br />
		<p>
			To get started, simply enter the long URL you wish to shorten in the field provided and click
			the "Shorten" button. In just a matter of seconds, you'll have a new, shorter link that you
			can use anywhere you need it.
		</p>
		<br />
		<p>
			Shortly also provides advanced features such as custom link and link analytics to make your
			short links more useful.
		</p>
		<br />
		<p>
			Try Shortly today and experience the convenience of having a simple and reliable URL
			shortening service at your fingertips.
		</p>
		<br />

		<div class="flex flex-row justify-between mb-2">
			<a href="/shorten">
				<button class="btn btn-primary justify-start">Shorten your link now!</button>
			</a>
			{#if !$page.data.session}
				<label for="register-modal" class="btn btn-primary mx-2 w-28">register</label>
				<label for="login-modal" class="btn btn-primary w-28">login</label>
			{:else}
				<a href="/account">
					<button class="btn btn-primary w-28">account</button>
				</a>
				<button class="btn btn-primary w-28" on:click={signOut}>sign out</button>
			{/if}
		</div>
	</div>
</div>
