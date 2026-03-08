import { BOTTOM_TAB, HEADER, SPACING } from "@repo/ui";
import { useCallback, useMemo } from "react";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";

const useSpacing = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useSafeAreaFrame();

  const offsets = useCallback(
    <T>(items: T[]) => {
      return items.length;
    },
    [top],
  );

  const tabHeight = useMemo(() => {
    return bottom + BOTTOM_TAB.icon + BOTTOM_TAB.label + BOTTOM_TAB.paddingVertical;
  }, [useSafeAreaFrame]);

  const headerHeight = useMemo(() => {
    return top + SPACING.xl + HEADER.paddingVertical;
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
