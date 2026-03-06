import { useCallback, useMemo } from "react";
import {
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	useWindowDimensions,
	View,
	type ViewabilityConfig,
	type ViewToken,
} from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue, withTiming } from "react-native-reanimated";
import { SPACING } from "../../base/spacing";
import { type ICardState, PhCard } from "../../molecules/card";
import { CarouselProvider, useCarousel } from "./context";
import { DATA } from "./data";
import type { TCarouselProps } from "./types";

const VIEWABILITY_CONFIG: ViewabilityConfig = {
	waitForInteraction: false,
	viewAreaCoveragePercentThreshold: 50,
};

function InternalCarousel({ data, tabHeight, headerHeight, ...props }: TCarouselProps) {
	const { height } = useWindowDimensions();

	const PEEK_HEIGHT = height * 0.2;
	const ITEM_GAP = SPACING.md;
	const FOCUSED_HEIGHT = height * 0.7 - ITEM_GAP;
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
			animatedScrollY.value = withTiming(event.contentOffset.y, {
				duration: 10,
			});
		},
	});

	const keyExtractor = useCallback((item: ICardState) => item.id.toString(), []);
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
				decelerationRate={0}
				snapToOffsets={snapOffsets}
				scrollEventThrottle={8}
				onScrollBeginDrag={onScrollBeginDrag}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: headerHeight,
					paddingBottom: tabHeight,
					rowGap: ITEM_GAP,
				}}
				contentInsetAdjustmentBehavior="automatic"
				contentOffset={{ x: 0, y: headerHeight }}
				onScroll={scrollHandler}
				onScrollEndDrag={onScrollEndDrag}
				onMomentumScrollEnd={onMomentumScrollEnd}
				contentContainerClassName="px-4"
				//contentInset={{ top: headerHeight }} // ✅ iOS — offsets scroll origin// ✅ iOS — sets initial offset
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
