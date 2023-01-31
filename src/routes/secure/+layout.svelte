<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
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

{#if !$page.data.session}
	<SigninForm {form} action="/signin" />
{:else}
	<slot />
{/if}
