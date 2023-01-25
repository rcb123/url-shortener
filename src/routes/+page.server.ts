import { error, type Actions } from '@sveltejs/kit';
import { loading, generatedURL } from '$root/stores';
import prisma from '$root/lib/prisma';

import 'dotenv';

function setLoading(state: boolean) {
	loading.set(state);
	console.log('set loading state to ' + state);
}

function setGeneratedURL(url: string | null) {
	generatedURL.set(url);
	console.log('set generated url to ' + url);
}

const isValidUrl = (longUrl: FormDataEntryValue | null) => {
	let url;

	try {
		url = new URL(longUrl as string);
	} catch (_) {
		return false;
	}

	return url.protocol === 'http:' || url.protocol === 'https:';
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const shortUrl = data.get('shortUrl') as string;
		const longUrl = data.get('longUrl') as string;

		setGeneratedURL(null);

		if (!isValidUrl(longUrl)) {
			// URL is invalid. Please enter valid URL.
			throw error(400, {
				message: `${longUrl} is invalid. Please enter a valid URL.`
			});
		}

		setLoading(true);

		try {
			const findUrl = await prisma.link.findUnique({
				where: {
					shortUrl: shortUrl
				}
			});

			if (findUrl) {
				throw error(500, {
					message: `${process.env.PUBLIC_SITE_URL}${shortUrl} is already taken.`
				});
			}

			await prisma.link.create({
				data: {
					longUrl,
					shortUrl
				}
			});

			await setLoading(false);
			await setGeneratedURL(shortUrl);
		} catch (err) {
			await setLoading(false);
			await setGeneratedURL(null);
			throw error(500, {
				message: `${err}`
			});
		}

		return { success: true };
	}
};
