<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';

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
</script>

<div>
	<slot />
</div>
