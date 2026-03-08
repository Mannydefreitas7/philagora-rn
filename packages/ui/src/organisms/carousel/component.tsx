import { useCallback, useMemo } from "react";
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  useWindowDimensions,
  View,
  type ViewabilityConfig,
  type ViewToken,
} from "react-native";
import { useAnimatedScrollHandler, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SPACING } from "../../base/spacing";
import { type ICardState, PhCard } from "../../molecules/card";
import { CarouselProvider, useCarousel } from "./context";
import { DATA } from "./data";
import type { TCarouselProps } from "./types";
import { LegendList } from "@legendapp/list";
import type { LegendListRenderItemProps } from "@legendapp/list";

const VIEWABILITY_CONFIG: ViewabilityConfig = {
  waitForInteraction: false,
  itemVisiblePercentThreshold: 80,
};

function InternalCarousel({ data, tabHeight, headerHeight, ...props }: TCarouselProps) {
  const { height } = useWindowDimensions();

  const PEEK_HEIGHT = height * 0.2;
  const ITEM_GAP = SPACING.md;
  const FOCUSED_HEIGHT = height * 0.75;
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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      animatedScrollY.value = withTiming(event.contentOffset.y, {
        duration: 10,
      });
    },
  });

  const keyExtractor = useCallback((item: ICardState, index: number) => item.id.toString(), []);
  const items = data.length > 0 && process.env.NODE_ENV !== "development" ? data : DATA;
  const snapOffsets = useMemo(() => {
    return items.map((_, index) => index * SNAP_INTERVAL);
  }, [items, SNAP_INTERVAL]);

  const VELOCITY_THRESHOLD = 1.8;

  const clampIndex = useCallback(
    (index: number) => {
      const maxIndex = Math.max(items.length - 1, 0);
      return Math.min(Math.max(index, 0), maxIndex);
    },
    [items.length],
  );

  const getClosestIndex = useCallback(
    (offsetY: number) => clampIndex(Math.round(offsetY / SNAP_INTERVAL)),
    [SNAP_INTERVAL, clampIndex],
  );

  const getTargetIndexFromVelocity = useCallback(
    (offsetY: number, velocityY: number) => {
      const closestIndex = getClosestIndex(offsetY);
      if (velocityY >= VELOCITY_THRESHOLD) return clampIndex(closestIndex + 1);
      if (velocityY <= -VELOCITY_THRESHOLD) return clampIndex(closestIndex - 1);
      return closestIndex;
    },
    [VELOCITY_THRESHOLD, clampIndex, getClosestIndex],
  );

  const onScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const velocityY = event.nativeEvent.velocity?.y ?? 0;
      const targetIndex = getTargetIndexFromVelocity(offsetY, velocityY);
      dispatch({ type: "UPDATE_CURRENT_INDEX", payload: targetIndex });
      dispatch({ type: "IS_SCROLLING", payload: false });
    },
    [dispatch],
  );

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
        decelerationRate={'fast'}
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
