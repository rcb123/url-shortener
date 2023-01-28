import type { Actions } from '@sveltejs/kit';
import { loading, generatedURL } from '$root/stores';
import { supabase } from '$lib/supabaseClient';
import { env } from '$env/dynamic/public';

function setLoading(state: boolean) {
	loading.update((existing) => state);
	console.log('set loading state to ' + state);
}

function setGeneratedURL(url: string | null) {
	generatedURL.update((existing) => url);
	console.log('set generated url to ' + url);
}

const isValidUrl = (url: FormDataEntryValue | null) => {
	let validate;

	try {
		validate = new URL(url as string);
	} catch (_) {
		return false;
	}

	return validate.protocol === 'http:' || validate.protocol === 'https:';
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const slug = String(data.get('slug'));
		const url = String(data.get('url'));
		const utm_source = String(data.get('utm_source'));
		const utm_medium = String(data.get('utm_medium'));
		const utm_campaign = String(data.get('utm_campaign'));

		setGeneratedURL(null);

		if (!isValidUrl(url)) {
			return {
				success: false,
				message: `${url} is invalid. Please enter a valid URL.`,
				slug: null,
				status: 500
			};
		}

		setLoading(true);

		try {
			const existCheck = await supabase.from('short link').select().eq('slug', slug);
			console.log(existCheck);
			if (existCheck.count) {
				setLoading(false);
				return {
					success: false,
					message: `Error! ${env.PUBLIC_SITE_URL}${slug} is already taken. Please try another short URL.`,
					slug: null,
					status: 500
				};
			}

			const insResponse = await supabase.from('short link').insert({
				url: url,
				slug: slug,
				utm_source: utm_source,
				utm_medium: utm_medium,
				utm_campaign: utm_campaign
			});

			if (insResponse.error) {
				setLoading(false);
				return {
					success: false,
					message: insResponse.error,
					slug: null,
					status: 500
				};
			}

			setLoading(false);
			setGeneratedURL(slug);
		} catch (error) {
			setLoading(false);
			setGeneratedURL(null);
			return {
				success: false,
				message: error,
				slug: null,
				status: 500
			};
		}

		return {
			success: true,
			message: `Success! Short link created at rezab.vercel.app/${slug}`,
			slug: slug,
			status: 200
		};
	}
} satisfies Actions;