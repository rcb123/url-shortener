<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { env } from '$env/dynamic/public';

	import Loader from '$components/Loader.svelte';

	let loading: boolean = false;
	let slug: string | null = null;
	let url: string | null = null;
	let utm_source: string | null = null;
	let utm_medium: string | null = null;
	let utm_campaign: string | null = null;
	let success: boolean | null = null;
	let message: string | null = null;

	const isValidUrl = (url: FormDataEntryValue | null) => {
		let validate;

		try {
			validate = new URL(url as string);
		} catch (_) {
			return false;
		}

		return validate.protocol === 'http:' || validate.protocol === 'https:';
	};

	const copyUrl = async () => {
		await navigator.clipboard.writeText(`${env.PUBLIC_SITE_URL}${slug}`);
		alert('URL copied successfully!');
	};

	const shorten = async () => {
		const owner = $page.data?.session?.user.id;

		if (!isValidUrl(url)) {
			success = false;
			message = `${url} is invalid. Please enter a valid URL.`;
			slug = null;
			return;
		}

		loading = true;

		try {
			const existCheck = await supabase.from('shortLink').select().eq('slug', slug);
			if (existCheck.count) {
				loading = false;
				success = false;
				message = `Error! ${env.PUBLIC_SITE_URL}${slug} is already taken. Please try another short URL.`;
				slug = null;
				return;
			}

			const insertResponse = await supabase.from('shortLink').insert({
				url: url,
				slug: slug,
				utm_source: utm_source,
				utm_medium: utm_medium,
				utm_campaign: utm_campaign,
				owner: owner
			});

			if (insertResponse.error) {
				loading = false;
				success = false;
				message = String(insertResponse.error);
				slug = null;
				return;
			}

			loading = false;
		} catch (error) {
			loading = false;
			success = false;
			message = String(error);
			slug = null;
			return;
		}

		success = true;
		message = `Success! Short link created at rezab.vercel.app/${slug}`;
		slug = slug;
		return;
	};
</script>

<div class="h-screen flex flex-col justify-center items-center space-y-4">
	<h1 class="font-bold text-xl text-center mb-1">URL Shortener</h1>
	<form on:submit|preventDefault|trusted={shorten} class="space-y-3 flex flex-col">
		<div class="flex-1">
			<input
				autoComplete="off"
				name="url"
				bind:value={url}
				type="text"
				placeholder="Enter your long URL"
				class="px-2 bg-gray-100 focus:bg-white input input-sm w-full rounded-md"
			/>
		</div>
		<div class="space-x-1 sm:space-x-2">
			<label
				>{env.PUBLIC_SITE_URL}
				<input
					autoComplete="off"
					name="slug"
					bind:value={slug}
					type="text"
					id="short-url"
					placeholder="Enter your short URL"
					class="w-[170px] sm:w-auto px-2 ml-1 bg-gray-100 focus:bg-white input input-sm rounded-md"
				/>
			</label>
		</div>
		<div>
			<input
				autoComplete="off"
				name="utm_source"
				bind:value={utm_source}
				type="text"
				placeholder="utm_source"
				class="px-2 mb-1 bg-gray-100 focus:bg-white input input-sm w-full rounded-md"
			/>
			<input
				autoComplete="off"
				name="utm_medium"
				bind:value={utm_medium}
				type="text"
				placeholder="utm_medium"
				class="px-2 mb-1 bg-gray-100 focus:bg-white input input-sm w-full rounded-md"
			/>
			<input
				autoComplete="off"
				name="utm_campaign"
				bind:value={utm_campaign}
				type="text"
				placeholder="utm_campaign"
				class="px-2 bg-gray-100 focus:bg-white input input-sm w-full rounded-md"
			/>
		</div>
		<button
			type="submit"
			class="flex place-self-end px-3 opacity-80 hover:opacity-90 text-white rounded-md btn btn-primary btn-sm normal-case"
		>
			Shorten URL!
		</button>
	</form>
	{#if loading == true}
		<Loader />
	{/if}
	{#if success == true}
		<div>
			<button
				type="button"
				on:click={() => copyUrl()}
				title="copy link"
				class={`bg-success mt-2 px-4 py-2 flex space-x-4 rounded-md w-full ${
					loading && 'bg-gray-200 animate-pulse h-10'
				}`}
			>
				<h1 class={`${loading && 'hidden'} flex-1 text-gray-100 text-left`}>
					{env.PUBLIC_SITE_URL}{slug}
				</h1>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class={`h-6 w-6 ${loading && 'hidden'}`}
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
	{/if}
	<div>
		{#if success != null}
			<p>{message}</p>
		{/if}
	</div>
</div>
