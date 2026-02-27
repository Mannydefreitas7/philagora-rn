import { create } from "zustand";

import { supabase } from "@/utils/supabase";

type LoginValues = {
  email: string;
  password: string;
};

type LoginResult = {
  error: Error | null;
};

type LoginStore = {
  values: LoginValues;
  loading: boolean;
  submitError: string | null;
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
  loading: false,
  submitError: null,
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
      loading: false,
      submitError: null,
    });
  },
  login: async () => {
    const { values } = get();
    set({ loading: true, submitError: null });

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    });

    if (error) {
      set({ loading: false, submitError: error.message });
      return { error };
    }

    set({ loading: false });
    return { error: null };
  },
}));

export default useLoginStore;
