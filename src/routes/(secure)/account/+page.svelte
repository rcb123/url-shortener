<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		console.log($page.data);
	});
</script>

<div class="flex h-screen bg-base-200">
	<div
		class="m-auto px-6 py-3 w-[60vw] h-[60vh] shadow-primary shadow-md rounded-2xl bg-base-100 overflow-auto"
	>
		<h1 class="text-2xl mb-0 text-primary">Welcome to your Account Page,</h1>
		<p>Here you can create and track your shortlinks</p>
	</div>
</div>
