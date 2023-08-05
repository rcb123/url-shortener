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

<div>
	<a class="absolute right-10 bottom-12 text-lg" href="https://github.com/rcb123/url-shortener"
		>&lt;/&gt; GitHub</a
	>
	<a class="absolute right-10 bottom-5 text-lg" href="https://rezab.vercel.app/">🖥️ Portfolio</a>
</div>