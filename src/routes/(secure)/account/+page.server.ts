import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = (async ({ parent }) => {
	const { session } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const data = await supabase.from('shortLink').select('*').eq('owner', session.user.id);
	return data;
}) satisfies PageServerLoad;
