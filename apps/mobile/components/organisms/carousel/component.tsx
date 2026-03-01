import { useWindowDimensions, View, ViewabilityConfig, ViewToken } from "react-native";
import useSpacing from "@/hooks/use-spacing";
import { HEADER } from "@/constants/navigation";
import { useCallback, useMemo, useState } from "react";
import { PhCard } from "@/components/molecules/card";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { DATA } from "./data";
import { TCarouselProps } from "./types";
import { ICardState } from "@/components/molecules/card/types";

const VIEWABILITY_CONFIG: ViewabilityConfig = {
  waitForInteraction: false,
  minimumViewTime: 500,
  itemVisiblePercentThreshold: 20,
};

export default function PhCarousel({ data, ...props }: TCarouselProps) {
  const { tabHeight, headerHeight } = useSpacing();
  const { height } = useWindowDimensions();

  const FOCUSED_HEIGHT = height * 0.6;
  const PEEK_HEIGHT = height * 0.2;
  const [currentItem, setCurrentItem] = useState<ICardState>();
  const animatedScrollY = useSharedValue(0);

  const offsetHeaderHeight = useMemo(() => {
    const total = headerHeight - HEADER.spacing.paddingVertical;
    return total;
  }, [headerHeight]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<ICardState>[] }) => {
      if (viewableItems.length > 1 && viewableItems[1].isViewable) {
        console.log("Viewable items", viewableItems[1]);
        setCurrentItem(viewableItems[1].item);
      }
    },
    [currentItem],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: ICardState; index: number }) => {
      return (
        <PhCard
          {...item}
          peekHeight={PEEK_HEIGHT}
          focusedHeight={FOCUSED_HEIGHT}
          scrollY={animatedScrollY}
          key={index}
          index={index}
        />
      );
    },
    [FOCUSED_HEIGHT, PEEK_HEIGHT, animatedScrollY],
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      animatedScrollY.value = event.contentOffset.y;
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
