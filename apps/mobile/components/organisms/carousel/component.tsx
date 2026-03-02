import { useWindowDimensions, View, ViewabilityConfig, ViewToken } from "react-native";
import useSpacing from "@/hooks/use-spacing";
import { useCallback } from "react";
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
  const { dispatch } = useCarousel();

  const animatedScrollY = useSharedValue(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<ICardState>[] }) => {
      if (viewableItems.length > 1) {
          const indexes = viewableItems.map(i => i.index);
        const filtered = indexes.filter(i => i !== null);
        const sliced = filtered.slice(0, 2);
        dispatch({ type: 'UPDATE_VIEWABLE_ITEMS', payload: sliced })
      }
      // update current index;
      if (viewableItems.length === 0 || !viewableItems[1] || viewableItems[1].index === null) return;
      dispatch({
        type: 'UPDATE_CURRENT_INDEX',
        payload: viewableItems[1].index
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
          scrollY={animatedScrollY}
          key={item.id}
          index={index}
        />
      );
    },
    [FOCUSED_HEIGHT, PEEK_HEIGHT, animatedScrollY],
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      animatedScrollY.value = Math.round(event.contentOffset.y);
    },
  });

  const keyExtractor = useCallback((item: ICardState) => item.id.toString(), []);
  const snapOffsets = DATA.map((_, index) => index * FOCUSED_HEIGHT);
  const items = data.length > 0 && process.env.NODE_ENV !== "development" ? data : DATA;
  return (
    <View className="flex-1">
      <Animated.FlatList
        {...props}
        data={DATA}
        pagingEnabled
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={onViewableItemsChanged}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToOffsets={snapOffsets}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: tabHeight }}
        contentInsetAdjustmentBehavior="scrollableAxes"
        onScroll={scrollHandler}
        contentContainerClassName="px-4 gap-y-4"
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
