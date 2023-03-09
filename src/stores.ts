import { writable, type Writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabaseClient';

const defaultStore: Store = {
	user: null
};

export type Store = {
	user: User;
};

export const loading: Writable<boolean> = writable(false);

export const generatedURL: Writable<string | null> = writable(null);

export const store = writable<Store>(defaultStore);

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN' && session) {
		store.update((oldStore) => {
			return {
				...oldStore,
				user: session.user
			};
		});
	} else if (event == 'SIGNED_OUT') {
		store.set(defaultStore);
	}
});