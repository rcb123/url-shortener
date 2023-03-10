<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<div class="flex h-screen bg-base-200">
	<div
		class="m-auto px-6 py-3 w-[60vw] min-w-[30rem] h-[60vh] shadow-primary shadow-md rounded-2xl bg-base-100 overflow-auto"
	>
		<h1 class="text-2xl mb-0 text-primary">Welcome to your Account Page,</h1>
		<p>Here you can create and track your shortlinks</p>

		<div>
			<h2 class="text-xl text-primary">Your Links:</h2>
			{#if !data}
				<p class="text-lg text-error">No Results</p>
			{:else}
				<table class="table bg-slate-300 rounded-lg h-[44vh] w-full">
					{#each data.data as link, index}
						<div class="flex flex-col px-2 overflow-wrap bg-gray-50 rounded-lg m-2">
							<p>Link {index + 1}:</p>
							<p>Long URL: {link.url}</p>
							<p>Slug: {link.slug}</p>
							<p>Clicks: {link.clicks}</p>
						</div>
					{/each}
				</table>
			{/if}
		</div>

		<div class="mt-2">
			<a href="/account/shorten">
				<button class="btn btn-primary justify-end"> Create a new link! </button>
			</a>
		</div>
	</div>
</div>
