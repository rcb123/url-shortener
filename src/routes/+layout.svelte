<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import SignupForm from '$components/SignupForm.svelte';
	import SigninForm from '$components/SigninForm.svelte';

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

	export let form: any;
</script>

<input type="checkbox" id="register-modal" class="modal-toggle" />
<label for="register-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<SignupForm {form} action="/signup" />
	</label>
</label>

<input type="checkbox" id="login-modal" class="modal-toggle" />
<label for="login-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<SigninForm {form} action="/signin" />
	</label>
</label>

<div>
	<slot />
</div>
