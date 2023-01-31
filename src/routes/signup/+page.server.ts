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

const isValidPassword = (password: string | null, confirmPassword: string | null) => {
	if (password && confirmPassword) {
		if (password?.length < 6) {
			return 'Password must be at least 6 characters';
		} else if (password?.length > 32) {
			return 'Password must be less than 32 characters';
		} else if (password != confirmPassword) {
			return 'Password and Confirm Password must match';
		} else {
			return null;
		}
	} else if (password && !confirmPassword) {
		return 'Confirm Password is required';
	} else {
		return 'Password is required';
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = String(formData.get('email'));
		const password = String(formData.get('password'));
		const confirmPassword = String(formData.get('passwordConfirm'));
		const terms = Boolean(formData.get('terms'));

		const validEmail = isValidEmail(email);
		const validPassword = isValidPassword(password, confirmPassword);
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

		const { data, error } = await supabase.auth.signUp({
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
					signUp: String(error)
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
