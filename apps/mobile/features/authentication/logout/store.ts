import { create } from "zustand";

import useSessionStore from "@/stores/session";
import useUserStore from "@/stores/user";
import { supabase } from "@/utils/supabase";

type LogoutResult = {
  error: Error | null;
};

type LogoutStore = {
  loading: boolean;
  error: string | null;
  logout: () => Promise<LogoutResult>;
};

export const useLogoutStore = create<LogoutStore>((set) => ({
  loading: false,
  error: null,
  logout: async () => {
    set({ loading: true, error: null });

    const { error } = await supabase.auth.signOut();
    if (error) {
      set({ loading: false, error: error.message });
      return { error };
    }

    useSessionStore.getState().logout();
    useUserStore.getState().clearUser();
    set({ loading: false });
    return { error: null };
  },
}));

export default useLogoutStore;
