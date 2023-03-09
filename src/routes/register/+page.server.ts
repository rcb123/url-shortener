import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
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

const isPasswordMatch = (password: string | null, confirmPassword: string | null) => {
	if (!confirmPassword) {
		return 'Confirm Password is required';
	} else if (password != confirmPassword) {
		return 'Password and Confirm Password must match';
	} else {
		return null;
	}
};

const isAcceptingTerms = (terms: boolean) => {
	if (!terms) {
		return 'You must accept the terms before proceeding';
	} else {
		return null;
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = String(formData.get('email'));
		const password = String(formData.get('password'));
		const passwordConfirm = String(formData.get('passwordConfirm'));
		const terms = Boolean(formData.get('terms'));

		const validEmail: string | null = isValidEmail(email);
		const validPassword: string | null = isValidPassword(password);
		const passwordMatch: string | null = isPasswordMatch(password, passwordConfirm);
		const acceptedTerms: string | null = isAcceptingTerms(terms);
		const validationError: boolean = (validEmail || validPassword || passwordMatch || acceptedTerms) != null;

		if (validationError) {
			return fail(400, { email, validEmail, validPassword, passwordMatch, acceptedTerms });
		}

		const { error } = await supabase.auth.signUp({
			email: email,
			password: password
		});

		if (error) {
			return fail(400, {email, error})
		}

		return {
			status: 200, email: email
		};
	}
} satisfies Actions;
