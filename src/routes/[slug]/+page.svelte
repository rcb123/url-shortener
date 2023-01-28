<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	import 'dotenv';

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
