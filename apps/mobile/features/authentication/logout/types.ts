export type LogoutItem = {
	id: string;
	userId: string;
	createdAt: string;
};

export type LogoutValues = Record<string, never>;

export type LogoutResult = {
	error: Error | null;
};
