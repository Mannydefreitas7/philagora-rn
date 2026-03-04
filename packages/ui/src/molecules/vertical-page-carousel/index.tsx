import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  useAnimatedProps,
} from "react-native-reanimated";
import type { VerticalPageItem, VerticalPageItemProps, VerticalPageProps } from "./types";
import { BlurView, BlurViewProps } from "expo-blur";

import PagerView from "react-native-pager-view";

const { height } = Dimensions.get("window");

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const VerticalPageItemComponent = <ItemT extends VerticalPageItem>({
  item,
  index,
  scrollY,
  renderItem,
  rotationRange,
  opacityRange,
  useBlur,
}: VerticalPageItemProps<ItemT>) => {
  const animatedBlurViewProps = useAnimatedProps<BlurViewProps>(() => {
    const blurAmount = interpolate(scrollY.value, [index - 1, index, index + 1], [20, 0, 20], Extrapolation.CLAMP);
    return {
      intensity: blurAmount,
    };
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: `${interpolate(scrollY.value, [index - 1, index, index + 1], opacityRange, Extrapolation.CLAMP) * 100}%`,
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollY.value, [index - 1, index, index + 1], rotationRange),
        },
      ],
    };
  });

  const defaultStyle = useAnimatedStyle(() => {
    return {
      height: "100%",
      width: "100%",
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      {item.image && <Animated.Image source={item.image} style={[defaultStyle, imageAnimatedStyle]} />}

      {renderItem({ item, index })}
      {useBlur && (
        <AnimatedBlurView style={StyleSheet.absoluteFill} animatedProps={[animatedBlurViewProps]} tint="regular" />
      )}
    </Animated.View>
  );
};

const VerticalPageCarousel = <ItemT extends VerticalPageItem>({
  data,
  renderItem,
  keyExtractor,
  cardMargin = 5,
  cardSpacing = 10,
  opacityRange = [1, 1, 1],
  scaleRange = [1, 1, 1],
  rotationRange = [1, 0, 1],
  useBlur = false,
}: VerticalPageProps<ItemT>) => {
  const scrollY = useSharedValue(0);

  const defaultKeyExtractor = (item: ItemT, index: number) =>
    keyExtractor ? keyExtractor(item, index) : `item-${index}`;

  return (
    <AnimatedPagerView
      orientation="vertical"
      onPageScroll={(event) => {
        console.log(event.nativeEvent.offset * 100);
        scrollY.value = event.nativeEvent.offset;
      }}
      offscreenPageLimit={2}
      style={{ height: "100%", width: "100%" }}
    >
      {data.map((item, index) => (
        <View key={index}>
          <VerticalPageItemComponent
            key={defaultKeyExtractor(item, index)}
            item={item}
            index={index}
            scrollY={scrollY}
            renderItem={renderItem}
            itemHeight={height}
            cardMargin={cardMargin}
            cardSpacing={cardSpacing}
            opacityRange={opacityRange}
            scaleRange={scaleRange}
            rotationRange={rotationRange}
            useBlur={useBlur}
          />
        </View>
      ))}
    </AnimatedPagerView>
  );
};

export { VerticalPageCarousel, VerticalPageItemProps, VerticalPageProps, VerticalPageItem };
