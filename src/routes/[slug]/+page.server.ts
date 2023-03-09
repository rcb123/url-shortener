import type { PageServerLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = (async ({ params }) => {
	const slug = params.slug;

	const response = await supabase.from('shortLink').select().eq('slug', slug);
	if (response.data) {
		if (response.data.length != 0) {
			const clicksinc = response.data[0].clicks + 1;
			const increment = await supabase
				.from('shortLink')
				.update({ clicks: `${clicksinc}` })
				.eq('slug', `${slug}`);
			if (increment.error) {
				throw error(500, increment.error)
			}

			throw redirect(302, `${response.data[0].url}`);
		} else {
			throw error(404, 'Short link not found!');
		}
	}
}) satisfies PageServerLoad;
