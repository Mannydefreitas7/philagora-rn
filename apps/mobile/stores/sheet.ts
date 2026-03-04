import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ISheet } from "@/types/navigation";
import type { ISheetStore } from "@/types/store";

/**
 * Create the Zustand store hook.
 */
export const useSheetStore = create<ISheetStore>()(
	immer((set, get) => ({
		sheet: null,
		setSheet: (sheet: ISheet | null) => {
			set({
				sheet,
			});
		},
		component: get() && get() === null ? null : get()?.sheet?.content,
		opened: false,
		open: (sheet: ISheet | null) => {
			set({
				sheet,
				opened: true,
			});
		},
		close: () => {
			set({
				sheet: null,
				opened: false,
			});
		},
	})),
);

export default useSheetStore;
