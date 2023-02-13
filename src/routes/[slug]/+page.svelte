<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(async () => {
		if (data.url) {
			window.location.href = data.url;
		} else {
			window.location.href = '/';
		}
	});
</script>

<body>
	<p>Please follow <a href={data.url}>this link</a>.</p>
</body>
