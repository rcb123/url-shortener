<script lang="ts">
	import { enhance } from '$app/forms';
	import { loading } from '$root/stores';
	import { generatedURL } from '$root/stores';

	import { PUBLIC_SITE_URL } from '$env/static/public';

	let shortenedURL: string | null;
	let loadingState: boolean;

	loading.subscribe((value) => {
		loadingState = value;
	});

	generatedURL.subscribe((value) => {
		shortenedURL = value;
	});

	const copyUrl = async () => {
		await navigator.clipboard.writeText(`${PUBLIC_SITE_URL}${shortenedURL}`);
		alert('URL copied successfully!');
	};
</script>

<div class="h-screen flex flex-col justify-center items-center space-y-4">
	<h1 class="font-bold text-xl text-center mb-1">URL Shortener</h1>
	<form method="POST" use:enhance class="space-y-3 flex flex-col">
		<div class="flex-1">
			<input
				autoComplete="off"
				name="longUrl"
				type="text"
				placeholder="Enter your long URL"
				class="px-2 bg-gray-100 focus:bg-white input input-sm w-full rounded-md"
			/>
		</div>
		<div class="space-x-1 sm:space-x-2">
			<label
				>{PUBLIC_SITE_URL}
				<input
					autoComplete="off"
					name="shortUrl"
					type="text"
					id="short-url"
					placeholder="Enter your short URL"
					class="w-[170px] sm:w-auto px-2 ml-1 bg-gray-100 focus:bg-white input input-sm rounded-md"
				/>
			</label>
		</div>
		<button
			type="submit"
			class="flex place-self-end px-3 opacity-80 hover:opacity-90 text-white rounded-md btn btn-primary btn-sm normal-case"
		>
			Shorten URL!
		</button>
	</form>
	<div class={shortenedURL ? 'opacity-100' : 'opacity-0 pointer-events-none'}>
		<button
			type="button"
			on:click={() => copyUrl()}
			title="copy link"
			class={`bg-green-600 mt-2 px-4 py-2 flex space-x-4 rounded-md w-full ${
				loadingState && 'bg-gray-200 animate-pulse h-10'
			}`}
		>
			<h1 class={`${loadingState && 'hidden'} flex-1 text-gray-100 text-left`}>
				{PUBLIC_SITE_URL}
				{shortenedURL}
			</h1>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class={`h-6 w-6 ${loadingState && 'hidden'}`}
				fill="none"
				viewBox="0 0 24 24"
				stroke="white"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
				/>
			</svg>
		</button>
	</div>
</div>
