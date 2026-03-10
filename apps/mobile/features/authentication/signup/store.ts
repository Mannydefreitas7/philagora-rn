import { create } from "zustand";

import supabase from "@/utils/supabase";
import type { SignupResult, SignupValues } from "./types";

type SignupStore = {
  values: SignupValues;
  submitting: boolean;
  error: string | null;
  setField: <K extends keyof SignupValues>(field: K, value: SignupValues[K]) => void;
  reset: () => void;
  signup: () => Promise<SignupResult>;
};

const initialValues: SignupValues = {
  email: "",
  password: "",
  confirm: "",
  fullName: "",
};

export const useSignupStore = create<SignupStore>((set, get) => ({
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
  signup: async () => {
    const { values } = get();
    set({ submitting: true, error: null });

    const { error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password,
      options: {
        data: {
          full_name: values.fullName.trim(),
        },
      },
    });

    if (error) {
      set({ error: error.message, submitting: false });
      return { error };
    }

    set({ submitting: false });
    return { error: null };
  },
}));

export default useSignupStore;
