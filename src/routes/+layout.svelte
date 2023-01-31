<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import SignupForm from '$components/SignupForm.svelte';

	import { onMount } from 'svelte';
	import '$root/styles.css';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	// // USER SIGNUP
	// let { data, error } = await supabase.auth.signUp({
	// email: 'someone@email.com',
	// password: 'EutSGKmgFgvqfGHEJCko'
	// })

	// // USER LOGIN
	// let { data, error } = await supabase.auth.signInWithPassword({
	// email: 'someone@email.com',
	// password: 'EutSGKmgFgvqfGHEJCko'
	// })

	export let form: any;
</script>

<input type="checkbox" id="login-modal" class="modal-toggle" />
<label for="login-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<SignupForm {form} action="/signup" />
	</label>
</label>
<div>
	<slot />
</div>
