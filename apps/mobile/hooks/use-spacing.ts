import { useCallback, useMemo } from "react";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { BOTTOM_TAB, HEADER } from "@/constants/navigation";
import { SPACING } from "@/constants/size";

const useSpacing = () => {
	const { top, bottom } = useSafeAreaInsets();
	const { width, height } = useSafeAreaFrame();

	const offsets = useCallback(
		<T>(items: T[]) => {
			return items.length;
		},
		[top],
	);

	const tabHeight = useMemo(() => {
		return bottom + BOTTOM_TAB.spacing.icon + BOTTOM_TAB.spacing.label + BOTTOM_TAB.spacing.paddingVertical;
	}, [useSafeAreaFrame]);

	const headerHeight = useMemo(() => {
		return top + SPACING.xxl + HEADER.spacing.paddingVertical;
	}, [useSafeAreaInsets]);

	const primaryCardHeight = useMemo(() => {
		return height - (headerHeight + tabHeight + SPACING.xxl * 2);
	}, [height, headerHeight, tabHeight]);

	const secondaryCardHeight = useMemo(() => {
		return primaryCardHeight / 2;
	}, [height, headerHeight, tabHeight, primaryCardHeight]);

	return {
		tabHeight,
		offsets,
		headerHeight,
		secondaryCardHeight,
		primaryCardHeight,
	};
};
export default useSpacing;
