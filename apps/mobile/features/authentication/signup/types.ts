export type SignupItem = {
	id: string;
	email: string;
	fullName: string;
	createdAt: string;
};

export type SignupValues = {
	email: string;
	password: string;
	confirm: string;
	fullName: string;
};

export type SignupResult = {
	error: Error | null;
};
