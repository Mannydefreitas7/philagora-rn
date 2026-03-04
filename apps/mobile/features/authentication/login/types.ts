export type LoginItem = {
	id: string;
	email: string;
	createdAt: string;
};

export type LoginValues = {
	email: string;
	password: string;
};

export type LoginResult = {
	error: Error | null;
};
