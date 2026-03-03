import { NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions, View, ViewabilityConfig, ViewToken } from "react-native";
import useSpacing from "@/hooks/use-spacing";
import { useCallback, useMemo } from "react";
import { PhCard } from "@/components/molecules/card";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { DATA } from "./data";
import { TCarouselProps } from "./types";
import { ICardState } from "@/components/molecules/card/types";
import { CarouselProvider, useCarousel } from "./context";

const VIEWABILITY_CONFIG: ViewabilityConfig = {
  waitForInteraction: false,
  itemVisiblePercentThreshold: 80,
};

function InternalCarousel({ data, ...props }: TCarouselProps) {
  const { tabHeight, headerHeight } = useSpacing();
  const { height } = useWindowDimensions();

  const FOCUSED_HEIGHT = height * 0.7;
  const PEEK_HEIGHT = height * 0.15;
  const ITEM_GAP = 16;
  const SNAP_INTERVAL = FOCUSED_HEIGHT + ITEM_GAP;
  const { dispatch } = useCarousel();

  const animatedScrollY = useSharedValue(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<ICardState>[] }) => {
      const indexes = viewableItems
        .map((item) => item.index)
        .filter((item): item is number => item !== null);

      dispatch({ type: "UPDATE_VIEWABLE_ITEMS", payload: indexes.slice(0, 2) });

      const nearestViewable = indexes[0];
      if (nearestViewable === undefined) return;

      dispatch({
        type: "UPDATE_CURRENT_INDEX",
        payload: nearestViewable,
      });
    },
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: ICardState; index: number }) => {
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
      animatedScrollY.value = Math.round(event.contentOffset.y);
    },
  });

  const keyExtractor = useCallback((item: ICardState) => item.id.toString(), []);
  const items = data.length > 0 && process.env.NODE_ENV !== "development" ? data : DATA;
  const snapOffsets = useMemo(() => {
    return items.map((_, index) => index * SNAP_INTERVAL);
  }, [items, SNAP_INTERVAL]);

  const VELOCITY_THRESHOLD = 1.6;

  const clampIndex = useCallback(
    (index: number) => {
      const maxIndex = Math.max(items.length - 1, 0);
      return Math.min(Math.max(index, 0), maxIndex);
    },
    [items.length],
  );

  const getClosestIndex = useCallback(
    (offsetY: number) => {
      return clampIndex(Math.round(offsetY / SNAP_INTERVAL));
    },
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
    },
    [dispatch, getTargetIndexFromVelocity],
  );

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const finalIndex = getClosestIndex(offsetY);

      dispatch({ type: "UPDATE_CURRENT_INDEX", payload: finalIndex });
    },
    [dispatch, getClosestIndex],
  );
  return (
    <View className="flex-1">
      <Animated.FlatList
        {...props}
        data={items}
        disableIntervalMomentum
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={onViewableItemsChanged}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToOffsets={snapOffsets}
        snapToInterval={SNAP_INTERVAL}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: tabHeight,
          rowGap: ITEM_GAP,
        }}
        contentInsetAdjustmentBehavior="scrollableAxes"
        onScroll={scrollHandler}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerClassName="px-4"
        // contentInset={{ top: tabHeight + headerHeight }} // ✅ iOS — offsets scroll origin// ✅ iOS — sets initial offset
        progressViewOffset={headerHeight}
        renderItem={renderItem}
        pinchGestureEnabled={false}
        keyExtractor={keyExtractor}
      />
      </View>
  );
}


export default (props: TCarouselProps) => <CarouselProvider>
  <InternalCarousel {...props} />
</CarouselProvider>
