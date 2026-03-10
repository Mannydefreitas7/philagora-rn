import type { LegendListRenderItemProps } from "@legendapp/list";
import { LegendList } from "@legendapp/list";
import { useCallback, useMemo } from "react";
import { useWindowDimensions, View, type ViewabilityConfig, type ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SPACING } from "../../base/spacing";
import type { ICardState } from "../../molecules/types";
import { PhCard } from "../../molecules/card";
import { CarouselProvider, useCarousel } from "./context";
import { DATA } from "./data";
import type { TCarouselProps } from "./types";

const VIEWABILITY_CONFIG: ViewabilityConfig = {
  waitForInteraction: false,
  itemVisiblePercentThreshold: 80,
};

function InternalCarousel({ data, tabHeight, headerHeight, ...props }: TCarouselProps) {
  const { height } = useWindowDimensions();

  const PEEK_HEIGHT = height * 0.2;
  const ITEM_GAP = SPACING.md;
  const FOCUSED_HEIGHT = height * 0.7;
  const SNAP_INTERVAL = FOCUSED_HEIGHT + ITEM_GAP;
  const { dispatch } = useCarousel();

  const animatedScrollY = useSharedValue(0);

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken<ICardState>[] }) => {
    const indexes = viewableItems.map((item) => item.index).filter((item): item is number => item !== null);
    dispatch({ type: "UPDATE_VIEWABLE_ITEMS", payload: indexes.slice(0, 2) });
    const nearestViewable = indexes[0];
    if (nearestViewable === undefined) return;
    dispatch({
      type: "UPDATE_CURRENT_INDEX",
      payload: nearestViewable,
    });
  }, []);

  const renderItem = useCallback(
    ({ item, index }: LegendListRenderItemProps<ICardState, string | undefined>) => {
      return (
        <PhCard
          {...item}
          id={item.id}
          peekHeight={PEEK_HEIGHT}
          focusedHeight={FOCUSED_HEIGHT}
          snapInterval={SNAP_INTERVAL}
          scrollY={animatedScrollY}
          key={item.id}
          index={index}
        />
      );
    },
    [FOCUSED_HEIGHT, PEEK_HEIGHT, SNAP_INTERVAL, animatedScrollY],
  );

  const keyExtractor = useCallback((item: ICardState, index: number) => item.id.toString(), []);
  const items = data.length > 0 && process.env.NODE_ENV !== "development" ? data : DATA;
  const snapOffsets = useMemo(() => {
    return items.map((_, index) => index * SNAP_INTERVAL);
  }, [items, SNAP_INTERVAL]);

  const onScrollEndDrag = useCallback(() => {
    dispatch({ type: "IS_SCROLLING", payload: false });
  }, [dispatch]);

  const onScrollBeginDrag = useCallback(() => {
    dispatch({ type: "IS_SCROLLING", payload: true });
  }, [dispatch]);

  const { bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <LegendList
        {...props}
        data={items}
        snapToAlignment="start"
        pagingEnabled
        snapToInterval={SNAP_INTERVAL}
        snapToIndices={snapOffsets}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={onViewableItemsChanged}
        decelerationRate={"fast"}
        contentContainerStyle={{ paddingBottom: bottom + tabHeight, rowGap: ITEM_GAP }}
        scrollEventThrottle={16}
        maintainVisibleContentPosition
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        showsVerticalScrollIndicator={false}
        progressViewOffset={headerHeight}
        renderItem={renderItem}
        pinchGestureEnabled={false}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

export default (props: TCarouselProps) => (
  <CarouselProvider>
    <InternalCarousel {...props} />
  </CarouselProvider>
);
