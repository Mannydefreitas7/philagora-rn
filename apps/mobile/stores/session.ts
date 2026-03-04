import type {} from "@repo/typings";
import { create } from "zustand";
import type { IAuthState } from "@/types/auth";
/**
 * Create the Zustand store hook.
 */
export const useSessionStore = create<IAuthState>((set, _get) => ({
	token: null,
	isLoggedIn: false,

	setToken: (token) => {
		set({
			token,
			isLoggedIn: Boolean(token),
		});
	},

	login: (_user, token) => {
		set({
			token,
			isLoggedIn: true,
		});
	},

	logout: () => {
		set({
			token: null,
			isLoggedIn: false,
		});
	},
}));

export default useSessionStore;
