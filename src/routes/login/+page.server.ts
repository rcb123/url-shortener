import type { Actions } from './$types';
import { supabase } from '$lib/supabaseClient';

const isValidEmail = (email: string | null) => {
	// eslint-disable-next-line no-useless-escape
	const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email) {
		if (!email?.match(format)) {
			return 'Email must be a valid email address';
		}
		if (email?.length < 1) {
			return 'Email is required';
		}
		if (email?.length > 64) {
			return 'Email must be less than 64 characters';
		}
		return null;
	} else return 'Email is required';
};

const isValidPassword = (password: string | null) => {
	if (password) {
		if (password?.length < 6) {
			return 'Password must be at least 6 characters';
		} else if (password?.length > 32) {
			return 'Password must be less than 32 characters';
		} else {
			return null;
		}
	} else {
		return 'Password is required';
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		console.log('got here (1)');

		const formData = await request.formData();
		const email = String(formData.get('email'));
		const password = String(formData.get('password'));

		console.log('got here (2)');

		const validEmail = isValidEmail(email);
		const validPassword = isValidPassword(password);
		const validationError = validEmail || validPassword;

		if (validationError) {
			return {
				status: 500,
				errors: {
					email: validEmail,
					password: validPassword
				}
			};
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			console.log(error);
		} else {
			console.log(data);
		}

		if (error) {
			return {
				status: 500,
				errors: {
					signIn: String(error)
				}
			};
		}

		return {
			status: 200,
			errors: {
				email: null,
				password: null
			}
		};
	}
} satisfies Actions;
