import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Chip, Card as HerouiCard, PressableFeedback, useThemeColor } from "heroui-native";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { clamp, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { Glow } from "../../base/glow";
import { SPACING } from "../../base/spacing";
import { useCarousel } from "../../organisms/carousel/context";
import type { TCardProps } from "./types";

const AnimatedCard = Animated.createAnimatedComponent(HerouiCard);

export function PhCard({
  index,
  imageUri,
  title,
  description,
  focusedHeight,
  peekHeight,
  snapInterval,
  footer,
  ...props
}: TCardProps) {
  const [mutedColor, accentColor] = useThemeColor(["muted", "accent"]);
  const { isVisible, scrollY, isScrolling, activeCard, dispatch, isFirst } = useCarousel();
  const isCardVisible = useMemo(() => isVisible(props.id), [props.id, isVisible]);
  const isActive = useMemo(() => isFirst(props.id) && isCardVisible, [props.id, isCardVisible, activeCard?.id]);

  const handleOnPress = () => {
    "worklet";
    dispatch({ type: "UPDATE_ACTIVE_CARD_ID", payload: props.id as string });
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: focusedHeight,
    };
  }, [isActive]);

  return (

    <Glow
      style={"spinner"}
      size={2}
      width={24}
      intensity={3}
      speed={0.1}
      radius={48}
      color={mutedColor}
      secondaryColor={accentColor}
      animated={isScrolling}
    >
      <PressableFeedback onPress={handleOnPress}>
        <AnimatedCard className="rounded-[48px]" style={animatedStyle}>
          <Image
            source={{ uri: imageUri }}
            style={[StyleSheet.absoluteFill, { aspectRatio: isActive ? 9 / 16 : 4 / 3 }]}
            contentFit="cover"
            cachePolicy={"memory-disk"}
          />
          <LinearGradient colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.1)"]} style={StyleSheet.absoluteFill} />
          <PressableFeedback.Highlight />
          <View className="gap-4 items-start justify-end flex-col flex-1 h-full relative">
            <Chip
              variant={isActive ? "primary" : "soft"}
              color={isActive ? "danger" : "accent"}
              size="md"
              className="absolute top-2 right-2">
              Live
            </Chip>
            <BlurView
              intensity={isActive ? 40 : 0}
              tint="dark"
              blurMethod="dimezisBlurView"
              className="inset-0 w-full px-5 py-4 rounded-4xl overflow-hidden"
              style={{
                rowGap: isActive ? SPACING.md : SPACING.xs,
              }}>
              <HerouiCard.Body>
                <HerouiCard.Title className="text-white font-bold text-shadow-sm text-shadow-neutral-800">
                  {title}
                </HerouiCard.Title>
                <HerouiCard.Description className="text-neutral-100 font-medium text-shadow-2xs text-sm text-shadow-neutral-700">
                  {description}
                </HerouiCard.Description>
              </HerouiCard.Body>
              {footer && isActive && (
                <HerouiCard.Footer className="gap-3 flex-row w-full justify-between items-center">
                  {footer}
                </HerouiCard.Footer>
              )}
            </BlurView>
          </View>
        </AnimatedCard>
      </PressableFeedback>
    </Glow>
  );
}
