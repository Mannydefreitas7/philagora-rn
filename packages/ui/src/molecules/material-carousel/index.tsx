import type React from "react";
import { memo, useMemo } from "react";
import {
	Image,
	type ImageProps,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	StyleSheet,
	type ViewStyle,
} from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { IMAGE_WIDTH, MEDIUM_IMAGE, SCREEN_WIDTH, SMALL_IMAGE } from "./const";
import type { ICarouselItem, IMaterialCarousel } from "./types";

const AnimatedImage = Animated.createAnimatedComponent<ImageProps>(Image);

const CarouselItem: React.FC<ICarouselItem> & React.FunctionComponent<ICarouselItem> = memo<ICarouselItem>(
	({
		item,
		scrollY,
		index,
		renderItem,
		dataLength,
	}: ICarouselItem): (React.ReactNode & React.JSX.Element & React.ReactElement) | null => {
		const isLastImage = useMemo<boolean>(() => index + 1 === dataLength, [index]);
		const isSecondLastItem = useMemo<boolean>(() => index + 2 === dataLength, [index]);

		const inputRange = useMemo<number[]>(
			() => [(index - 2) * SMALL_IMAGE, (index - 1) * SMALL_IMAGE, index * SMALL_IMAGE, (index + 1) * SMALL_IMAGE],
			[index],
		);

		const outputRange = useMemo<number[]>(
			() =>
				isLastImage
					? [SMALL_IMAGE, MEDIUM_IMAGE, IMAGE_WIDTH, IMAGE_WIDTH]
					: isSecondLastItem
						? [SMALL_IMAGE, MEDIUM_IMAGE, IMAGE_WIDTH, MEDIUM_IMAGE]
						: [SMALL_IMAGE, MEDIUM_IMAGE, IMAGE_WIDTH, SMALL_IMAGE],
			[isLastImage, isSecondLastItem],
		);

		const rnStylez = useAnimatedStyle<
			Required<Partial<Pick<ViewStyle, "marginBottom" | "marginTop" | "height" | "transform">>>
		>(() => {
			return {
				marginTop: 16,
				marginBottom: index === 0 ? 16 : 0,
				height: interpolate(scrollY.value, inputRange, outputRange, "clamp"),
				transform: [
					{
						scale: interpolate(scrollY.value, inputRange, [0.8, 0.9, 1, 0.8], Extrapolation.CLAMP),
					},
				],
			};
		}, [inputRange, outputRange, isLastImage]);
		const containerStylez = useAnimatedStyle<Required<Partial<Pick<ViewStyle, "height" | "opacity">>>>(() => {
			const outPutRangeItem = isLastImage ? [0, 1, 1, 1] : isSecondLastItem ? [0, 1, 0, 0, 1] : [0, 0, 1, 0, 1];
			return {
				height: interpolate(scrollY.value, inputRange, outputRange, Extrapolation.CLAMP),
				opacity: interpolate(
					scrollY.value,

					inputRange,
					outPutRangeItem,
					Extrapolation.CLAMP,
				),
			};
		});
		return (
			<>
				<Animated.View style={[rnStylez]}>
					<AnimatedImage source={{ uri: item }} style={[styles.imageStyle]} />
				</Animated.View>
				<Animated.View
					style={[
						{
							position: "absolute",
						},
						containerStylez,
					]}>
					{renderItem?.(item, index)}
				</Animated.View>
			</>
		);
	},
);

const MaterialCarousel: React.FC<IMaterialCarousel> & React.FunctionComponent<IMaterialCarousel> =
	memo<IMaterialCarousel>(
		({
			data,
			renderItem: _renderItem,
		}: IMaterialCarousel): (React.ReactNode & React.JSX.Element & React.ReactElement) | null => {
			const scrollY = useSharedValue<number>(0);

			const renderItem = ({ item, index }: { item: string; index: number }) => (
				<CarouselItem item={item} scrollY={scrollY} index={index} renderItem={_renderItem} dataLength={data.length} />
			);

			const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
				scrollY.value = e.nativeEvent.contentOffset.y;
			};

			return (
				<Animated.FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(_, idx) => idx.toString()}
					// horizontal
					showsVerticalScrollIndicator={false}
					onScroll={onScroll}
					bounces={true}
					contentInsetAdjustmentBehavior={"always"}
					decelerationRate="fast"
					snapToInterval={SMALL_IMAGE}
					snapToAlignment="start"
					//  style={{ flex: 1 }}
					contentContainerStyle={[
						styles.listStyle,
						{
							paddingTop: 16,
							paddingBottom: SCREEN_WIDTH / 2 - IMAGE_WIDTH / 2 + 16,
						},
					]}
					scrollEventThrottle={16}
				/>
			);
		},
	);

export default memo<React.FC<IMaterialCarousel> & React.FunctionComponent<IMaterialCarousel>>(MaterialCarousel);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	listStyle: {
		alignItems: "center",
	},
	imageStyle: {
		width: 400,
		borderRadius: 24,
	},
});
