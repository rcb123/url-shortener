import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = (async ({ params }) => {
	const slug = params.slug;

	try {
		const response = await supabase.from('short link').select().eq('slug', slug);
		if (response.data) {
			if (response.data.length != 0) {
				const clicksinc = response.data[0].clicks + 1;
				const { error } = await supabase
					.from('short link')
					.update({ clicks: `${clicksinc}` })
					.eq('slug', `${slug}`);
				if (error) {
					console.log(error);
					return {
						url: '/',
						status: 500
					}
				}

				return {
					url: `${response.data[0].url}`,
					status: 302
				};
			} else {
				return {
					url: '/',
					status: 404
				};
			}
		}
	} catch (error) {
		console.error(error);
		return {
			error: error,
			status: 500
		};
	}
}) satisfies PageServerLoad;
