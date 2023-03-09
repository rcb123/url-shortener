<script lang="ts">
	let response: Response;
	let responseData: any = [''];
	let responseJSON: { data: string; status: number; };

	let email: number = 0;
	let emailError: number = 0;
	let passwordError: number = 0;
	let passwordMatchError: number = 0;
	let termsError: number = 0;
	let signUpError: number = 0;

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
				class="input w-full max-w-xs {responseData[emailError] ? 'input-error' : 'input-bordered'}"
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
					class="checkbox checkbox-primary {responseData[passwordMatchError] ? 'border-error' : ''}"
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
		<div class="mt-10 bg-slate-50 rounded-xl p-6 shadow-lg w-full max-w-xs mx-auto text-center">
			<p>Verification email sent!</p>
			<p>Please check your email</p>
		</div>
	{/if}
	{#if responseData[signUpError]}
		<div class="mt-10 bg-slate-50 rounded-xl p-6 shadow-lg w-full max-w-xs mx-auto text-center font-medium">
			<p class="text-error">{responseData[signUpError]}</p>
		</div>
	{/if}
</div>
