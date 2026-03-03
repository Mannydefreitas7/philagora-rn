import { View, Image, ViewStyle, StyleSheet } from "react-native";
import { Button, Chip, Card as HerouiCard, PressableFeedback, useThemeColor } from "heroui-native";
import DebateLikeButton from "@/features/debate/like";

import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { TCardProps } from "./types";
import { useCarousel } from "@/components/organisms/carousel/context";
import { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Glow } from "@/components/ui/base/glow";
import { BlurView } from "expo-blur";
import { SPACING } from "@/constants/size";
const AnimatedCard = Animated.createAnimatedComponent(HerouiCard);

export function PhCard({
  index,
  scrollY,
  imageUri,
  title,
  description,
  focusedHeight,
  peekHeight,
  snapInterval,
  ...props
}: TCardProps) {
  const cardHeight = useDerivedValue(() => scrollY.value);
  const [mutedColor, accentColor] = useThemeColor(["muted", "accent"]);
  const { isVisible, isFirst, isScrolling } = useCarousel();
  const isCardVisible = useMemo(() => isVisible(props.id), [props.id, isVisible]);
  const isActive = useMemo(() => isFirst(props.id) && isCardVisible, [props.id, isFirst, isCardVisible]);

  const animatedInnerStyle = useAnimatedStyle(() => {
    const itemFocusedAt = index * snapInterval;
    const distance = cardHeight.value - itemFocusedAt;
    const animatedHeight = interpolate(distance, [-snapInterval, 0], [peekHeight, focusedHeight], Extrapolation.CLAMP);
    return {
      // velocity: initial speed, stiffness: spring strength, mass: weight, damping: friction
      // smoother config: lower stiffness/mass and moderate damping for gentle motion
      height: withSpring(animatedHeight, {
        velocity: 20,
        stiffness: 100,
        mass: 0.5,
        damping: 50,
        energyThreshold: 1.01,
      }),
    } as ViewStyle;
  });

  const animatedInnerImageStyle = useAnimatedStyle(() => {
    const itemFocusedAt = index * snapInterval;
    const distance = cardHeight.value - itemFocusedAt;
    const animatedY = interpolate(distance, [-snapInterval, 0, snapInterval], [50, 0, 50], Extrapolation.CLAMP);
    return {
      top: -animatedY,
      transform: [{ translateY: animatedY }],
    };
  });

  return (
    <Glow
      style={"spinner"}
      size={2}
      intensity={2}
      speed={0.5}
      duration={5000}
      radius={48}
      color={mutedColor}
      secondaryColor={accentColor}
      animated={isScrolling}
    >
      <PressableFeedback className="overflow-hidden w-full">
        <AnimatedCard className="rounded-[48px]" style={animatedInnerStyle}>
          <Image source={{ uri: imageUri }} style={StyleSheet.absoluteFill} />
          <LinearGradient colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.1)"]} style={StyleSheet.absoluteFill} />
          <PressableFeedback.Highlight className="absolute inset-0" />
          <View className="gap-4 items-start justify-end flex-col flex-1 h-full relative">
            <Chip
              variant={isActive ? "primary" : "soft"}
              color={isActive ? "danger" : "accent"}
              size="md"
              className="absolute top-2 right-2"
            >
              Live
            </Chip>
            <BlurView
              intensity={isActive ? 40 : 0}
              tint="dark"
              blurMethod="dimezisBlurView"
              className="inset-0 w-full px-5 py-4 rounded-4xl overflow-hidden"
              style={{
                rowGap: isActive ? SPACING.md : SPACING.xs,
              }}
            >
              <HerouiCard.Body>
                <HerouiCard.Title className="text-white font-bold text-shadow-sm text-shadow-neutral-800">
                  {title}
                </HerouiCard.Title>
                <HerouiCard.Description className="text-neutral-100 font-medium text-shadow-2xs text-sm text-shadow-neutral-700">
                  {description}
                </HerouiCard.Description>
              </HerouiCard.Body>
              {isActive && (
                <HerouiCard.Footer className="gap-3 flex-row w-full justify-between items-center">
                  <Button size="sm" variant="secondary">
                    Join
                  </Button>
                  <DebateLikeButton debateId={props.id} userId={""} />
                </HerouiCard.Footer>
              )}
            </BlurView>
          </View>
        </AnimatedCard>
      </PressableFeedback>
    </Glow>
  );
}
