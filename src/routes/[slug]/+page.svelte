<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	import 'dotenv';

	export let data: PageData;

	onMount(async () => {
		window.location.href = data.longURL;
	});
</script>

<body>
	<p>Please follow <a href={data.longURL}>this link</a>.</p>
</body>
