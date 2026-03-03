import { View, Image, ViewStyle, StyleSheet } from "react-native";
import { Button, Chip, Card as HerouiCard, PressableFeedback } from "heroui-native";
import DebateLikeButton from "@/features/debate/like";

import Animated, { Extrapolation, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSequence, withSpring, withTiming } from "react-native-reanimated";
import type { TCardProps } from "./types";
import { useCarousel } from "@/components/organisms/carousel/context";
import { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
const AnimatedCard = Animated.createAnimatedComponent(HerouiCard);

export function PhCard({ index, scrollY, imageUri, title, description, focusedHeight, peekHeight, snapInterval, ...props }: TCardProps) {
  const cardHeight = useDerivedValue(() => scrollY.value);
  const opacity = useSharedValue(0);
  const { state, isVisible } = useCarousel();
  const isCardVisible = useMemo(() => isVisible(props.id), [props.id, isVisible]);

  const animatedInnerStyle = useAnimatedStyle(() => {

    const itemFocusedAt = index * snapInterval;
    const distance = cardHeight.value - itemFocusedAt;

    const animatedHeight = interpolate(distance, [-snapInterval, 0], [peekHeight, focusedHeight], Extrapolation.CLAMP);
    const animatedScale = interpolate(distance, [-snapInterval, 0], [0.8, 1], Extrapolation.CLAMP);

    const conditional = animatedHeight > focusedHeight * 0.4 ? focusedHeight : animatedHeight

    return {
      // velocity: initial speed, stiffness: spring strength, mass: weight, damping: friction
      // smoother config: lower stiffness/mass and moderate damping for gentle motion
      height: withSpring(conditional, { velocity: 10, stiffness: 200, mass: 1, damping: 100 }),
      transform: [
        {
          scaleX: withSpring(animatedScale)
        }
      ]
    } as ViewStyle;
  });

  return (
    <PressableFeedback className="overflow-hidden w-full">
      <AnimatedCard className="rounded-[48px]" style={[animatedInnerStyle]}>
        <Image source={{ uri: imageUri }} className="absolute bg-cover inset-0" style={StyleSheet.absoluteFill}
        />
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.1)']}
            style={StyleSheet.absoluteFill}
        />
        <PressableFeedback.Highlight className="absolute inset-0"  />
        <View className="gap-4 items-start justify-end flex-col flex-1 h-full p-3 relative">
          <Chip variant="soft" color="danger" size="md" className="absolute top-1 right-1">
            Live
          </Chip>
          <HerouiCard.Body>
            <View className="gap-1 mt-6">
              <HerouiCard.Title className="text-white font-bold">{title}</HerouiCard.Title>
              <HerouiCard.Title className="text-sm">{description}</HerouiCard.Title>
            </View>
            <HerouiCard.Description>Join the debate now.</HerouiCard.Description>
          </HerouiCard.Body>
          <HerouiCard.Footer className="gap-3 flex-row w-full justify-between items-center">
            <Button size="sm" variant="secondary">
              Join
            </Button>
            <DebateLikeButton debateId={props.id} userId={""} />
          </HerouiCard.Footer>
        </View>
      </AnimatedCard>

    </PressableFeedback>
  );
}
