import { create } from "zustand";

import useSessionStore from "@/stores/session";
import useUserStore from "@/stores/user";
import { supabase } from "@/utils/supabase";
import type { LogoutResult } from "./types";

type LogoutStore = {
	submitting: boolean;
	error: string | null;
	reset: () => void;
	logout: () => Promise<LogoutResult>;
};

export const useLogoutStore = create<LogoutStore>((set) => ({
	submitting: false,
	error: null,
	reset: () => {
		set({ submitting: false, error: null });
	},
	logout: async () => {
		set({ submitting: true, error: null });

		const { error } = await supabase.auth.signOut();
		if (error) {
			set({ submitting: false, error: error.message });
			return { error };
		}

		useSessionStore.getState().logout();
		useUserStore.getState().clearUser();
		set({ submitting: false });
		return { error: null };
	},
}));

export default useLogoutStore;
