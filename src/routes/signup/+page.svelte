<script lang="ts">
    import SignupForm from "$components/SignupForm.svelte";


    /*
	let loading = false;
	let email: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			console.log(error);
			alert('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
			}
		} finally {
			loading = false;
		}
	};
    */

   export let form: any;
</script>

<!-- <form class="row flex-center flex" on:submit|preventDefault={handleLogin}>
	<div class="col-6 form-widget">
		<h1 class="header">Supabase + SvelteKit</h1>
		<p class="description">Sign in via magic link with your email below</p>
		<div>
			<input class="inputField" type="email" placeholder="Your email" bind:value={email} />
		</div>
		<div>
			<input
				type="submit"
				class="button block"
				value={loading ? 'Loading' : 'Send magic link'}
				disabled={loading}
			/>
		</div>
	</div>
</form> -->

<SignupForm form={form} action="/" />
