import { create } from "zustand";

import type { DebateCardItem, DebateCardValues } from "./types";

type DebateCardStore = {
  debates: DebateCardItem[];
  values: DebateCardValues;
  setField: <K extends keyof DebateCardValues>(field: K, value: DebateCardValues[K]) => void;
  setDebates: (debates: DebateCardItem[]) => void;
  reset: () => void;
};

const initialValues: DebateCardValues = {
  selectedId: null,
};

export const useDebateCardStore = create<DebateCardStore>((set) => ({
  debates: [],
  values: initialValues,

  setField: (field, value) => {
    set((state) => ({ values: { ...state.values, [field]: value } }));
  },

  setDebates: (debates) => {
    set({ debates });
  },

  reset: () => {
    set({ debates: [], values: initialValues });
  },
}));

export default useDebateCardStore;
