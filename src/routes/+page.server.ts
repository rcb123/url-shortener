import { fail, type Actions } from '@sveltejs/kit';
import { loading, generatedURL } from '$root/stores';
import prisma from '$root/lib/prisma';

import 'dotenv';

function setLoading(state: boolean) {
	loading.set(state);
}

function setGeneratedURL(url: string | null) {
	generatedURL.set(url);
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

		if (!isValidUrl(longUrl)) {
			// URL is invalid. Please enter valid URL.
			return fail(400, { longUrl, invalid: true });
		}

		setLoading(true);

		try {
			const findUrl = await prisma.link.findUnique({
				where: {
					shortUrl: shortUrl
				}
			});

			if (findUrl) {
				return fail(500, {
					errorMessage: `${process.env.PUBLIC_SITE_URL}${shortUrl} is already taken.`
				});
			}

			await prisma.link.create({
				data: {
					longUrl,
					shortUrl
				}
			});

			setLoading(false);
			setGeneratedURL(longUrl);
			// enqueueSnackbar('URL shortened successfully!', { variant: 'success' });
		} catch (err) {
			console.log(err);
			setLoading(false);
			setGeneratedURL(null);
			// enqueueSnackbar(errorMessage, { variant: 'error' });
			return fail(500);
		}

		return { success: true };
	}
};
