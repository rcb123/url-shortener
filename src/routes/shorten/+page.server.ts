import type { Actions } from './$types';
import { loading, generatedURL } from '$root/stores';
import { supabase } from '$lib/supabaseClient';
import { env } from '$env/dynamic/public';

function setLoading(state: boolean) {
	loading.update((existing) => state);
}

function setGeneratedURL(url: string | null) {
	generatedURL.update((existing) => url);
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
			const existCheck = await supabase.from('shortLink').select().eq('slug', slug);
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

			const insertResponse = await supabase.from('shortLink').insert({
				url: url,
				slug: slug
			});

			if (insertResponse.error) {
				setLoading(false);
				return {
					success: false,
					message: insertResponse.error,
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
