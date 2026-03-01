import Constants from "expo-constants";
import { create } from "zustand";

import { supabase } from "@/utils/supabase";
import type { ResetPasswordResult, ResetPasswordValues } from "./types";

type ResetPasswordStore = {
  values: ResetPasswordValues;
  submitting: boolean;
  error: string | null;
  sent: boolean;
  resetPasswordRedirectTo: string;
  setField: <K extends keyof ResetPasswordValues>(field: K, value: ResetPasswordValues[K]) => void;
  reset: () => void;
  sendResetLink: () => Promise<ResetPasswordResult>;
};

function getResetPasswordRedirectTo() {
  const configScheme = Constants.expoConfig?.scheme;
  const scheme = typeof configScheme === "string" ? configScheme : (configScheme?.[0] ?? "mobile");
  return `${scheme}://reset-password`;
}

const initialValues: ResetPasswordValues = {
  email: "",
};

export const useResetPasswordStore = create<ResetPasswordStore>((set, get) => ({
  values: initialValues,
  submitting: false,
  error: null,
  sent: false,
  resetPasswordRedirectTo: getResetPasswordRedirectTo(),
  setField: (field, value) => {
    set((state) => ({ values: { ...state.values, [field]: value } }));
  },
  reset: () => {
    set({
      values: initialValues,
      submitting: false,
      error: null,
      sent: false,
    });
  },
  sendResetLink: async () => {
    set({ error: null, sent: false });

    const normalizedEmail = get().values.email.trim().toLowerCase();
    if (!normalizedEmail) {
      const message = "Email is required.";
      set({ error: message });
      return { error: new Error(message) };
    }

    set({ submitting: true });

    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: get().resetPasswordRedirectTo,
    });

    if (error) {
      set({ submitting: false, error: error.message });
      return { error };
    }

    set({ submitting: false, sent: true });
    return { error: null };
  },
}));

export default useResetPasswordStore;
