<script lang="ts">
	// import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';

	const { data, error } = supabase.from('short link').select('*');

	// .eq('owner', $page.data.session?.user.id)

	console.log(data);
</script>

<div class="flex h-screen bg-base-200">
	<div
		class="m-auto px-6 py-3 w-[60vw] h-[60vh] shadow-primary shadow-md rounded-2xl bg-base-100 overflow-auto"
	>
		<h1 class="text-2xl mb-0 text-primary">Welcome to your Account Page,</h1>
		<p>Here you can create and track your shortlinks</p>

		<div>
			<h2 class="text-xl text-primary">Your Links:</h2>
			{#if !data}
				<p class="text-lg text-error">No Results</p>
			{:else}
				<table class="table">
					<p>hi</p>
					<p>hi</p>
				</table>
			{/if}
		</div>

		<div>
			<button class="btn btn-primary justify-end">
				Create a new link!
			</button>
		</div>
	</div>
</div>
