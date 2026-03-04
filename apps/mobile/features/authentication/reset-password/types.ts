export type ResetPasswordItem = {
	id: string;
	email: string;
	redirectTo: string;
	createdAt: string;
};

export type ResetPasswordValues = {
	email: string;
};

export type ResetPasswordResult = {
	error: Error | null;
};
