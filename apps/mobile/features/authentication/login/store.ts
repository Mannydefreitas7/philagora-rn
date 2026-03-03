import { create } from "zustand";

import { supabase } from "@/utils/supabase";
import type { LoginResult, LoginValues } from "./types";

type LoginStore = {
  values: LoginValues;
  submitting: boolean;
  error: string | null;
  setField: <K extends keyof LoginValues>(field: K, value: LoginValues[K]) => void;
  reset: () => void;
  login: () => Promise<LoginResult>;
};

const initialValues: LoginValues = {
  email: "",
  password: "",
};

export const useLoginStore = create<LoginStore>((set, get) => ({
  values: initialValues,
  submitting: false,
  error: null,
  setField: (field, value) => {
    set((state) => ({
      values: {
        ...state.values,
        [field]: value,
      },
    }));
  },
  reset: () => {
    set({
      values: initialValues,
      submitting: false,
      error: null,
    });
  },
  login: async () => {
    const { values } = get();
    set({ submitting: true, error: null });

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    });

    if (error) {
      set({ submitting: false, error: error.message });
      return { error };
    }

    set({ submitting: false });
    return { error: null };
  },
}));

export default useLoginStore;
