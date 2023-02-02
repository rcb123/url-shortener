export interface ValidatorResult {
	[validatorName: string]: {
		error: boolean;
		message?: string;
	};
}

export type ValidatorFn = (value: any) => ValidatorResult;

function required(value: any): ValidatorResult {
	if (value === '' || value == null) {
		return { required: { error: true, message: 'Field is required' } };
	}
	return { required: { error: false } };
}

function url(url: FormDataEntryValue | null): ValidatorResult {
	let validate;

	try {
		validate = new URL(url as string);
	} catch (_) {
		return { validURL: { error: true, message: 'URL is invalid' } };
	}

	if (validate.protocol === 'http:' || validate.protocol === 'https:') {
		return { validURL: { error: false } };
	} else {
		return { validURL: { error: true, message: 'URL is invalid' } };
	}
}

function email(email: string) {
	// eslint-disable-next-line no-useless-escape
	const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
		if (!email?.match(format)) {
			return { email: { error: true, message: 'Email must be a valid email address'}};
		}
		return { email: {error: false} };
	
}

function length(field: string, min: number, max: number, type = "Field") {
	if (field) {
		if (field?.length < min) {
			return { length: { error: true, message: `${type} must be at least ${min} characters`}}
		} else if (field?.length > max) {
			return { length: { error: true, message: `${type} must be less than ${max} characters`}}
		} else {
			return { length: { error: false }};
		}
	} else {
		return 'Password is required';
	}
}

function valueMatch(value1: string, value2: string, type = "Field") {
	if (value1 != value2) {
		return { valueMatch: { error: true, message: `${type} and Confirm ${type} must match`}};
	} else {
		return { valueMatch: { error: false}};
	}
}

function checkBox(state: boolean) {
	if (!state) {
		return { checkBox: { error: true, message: 'You must accept before proceeding'}};
	} else {
		return { checkBox: { error: false}};
	}
}

export const Validators = {
	required,
	email,
	length,
	url,
	valueMatch,
	checkBox
};
