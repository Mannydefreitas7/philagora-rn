import { createStore } from "zustand-x";

import type { DebateCardItem, DebateCardValues } from "./types";

type DebateCardStore = {
  debates: DebateCardItem[];
  values: DebateCardValues;
};

const initialValues: DebateCardValues = {
  selectedId: null,
};

export const useDebateCardStore = createStore<DebateCardStore>(
  {
    debates: [],
    values: initialValues
  },
  {
    name: 'debate-card',
    immer: true,
    devtools: true
  }
);

export default useDebateCardStore;
