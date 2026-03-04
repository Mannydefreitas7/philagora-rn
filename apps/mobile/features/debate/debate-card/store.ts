import { createStore } from "zustand-x";

import type { DebateCardItem } from "./types";

type DebateCardStore = {
	debates: DebateCardItem[];
	selectedId?: string;
};

const initialValues: DebateCardStore = {
	selectedId: undefined,
	debates: [],
};

export const debateCardStore = createStore<DebateCardStore>(
	{
		...initialValues,
	},
	{
		name: "debate-card",
		immer: true,
		devtools: true,
	},
);

export default debateCardStore;
