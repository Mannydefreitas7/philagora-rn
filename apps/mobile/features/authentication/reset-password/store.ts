import Constants from "expo-constants";
import * as ExpoLinking from "expo-linking";
import { create } from "zustand";

import { supabase } from "@/utils/supabase";

type ResetPasswordResult = {
  error: Error | null;
};

type ResetPasswordStore = {
  email: string;
  loading: boolean;
  error: string | null;
  sent: boolean;
  resetPasswordRedirectTo: string;
  setEmail: (value: string) => void;
  reset: () => Promise<ResetPasswordResult>;
  clear: () => void;
};

function getResetPasswordRedirectTo() {
  const configScheme = Constants.expoConfig?.scheme;
  const scheme = typeof configScheme === "string" ? configScheme : (configScheme?.[0] ?? "mobile");
  return ExpoLinking.createURL("reset-password", { scheme });
}

export const useResetPasswordStore = create<ResetPasswordStore>((set, get) => ({
  email: "",
  loading: false,
  error: null,
  sent: false,
  resetPasswordRedirectTo: getResetPasswordRedirectTo(),
  setEmail: (value) => {
    set({ email: value });
  },
  clear: () => {
    set({
      email: "",
      loading: false,
      error: null,
      sent: false,
    });
  },
  reset: async () => {
    set({ error: null, sent: false });

    const normalizedEmail = get().email.trim().toLowerCase();
    if (!normalizedEmail) {
      const message = "Email is required.";
      set({ error: message });
      return { error: new Error(message) };
    }

    set({ loading: true });

    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: get().resetPasswordRedirectTo,
    });

    if (error) {
      set({ loading: false, error: error.message });
      return { error };
    }

    set({ loading: false, sent: true });
    return { error: null };
  },
}));

export default useResetPasswordStore;
