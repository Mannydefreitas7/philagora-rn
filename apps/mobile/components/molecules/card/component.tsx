import useSpacing from "@/hooks/use-spacing";
import { View, Image } from "react-native";
import { Button, Chip, Card as HerouiCard } from "heroui-native";
import DebateLikeButton from "@/features/debate/like";

import Animated, { Extrapolation, interpolate, useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import type { TCardProps } from "./types";

const AnimatedCard = Animated.createAnimatedComponent(HerouiCard);

export function PhCard({ id, index, scrollY, imageUri, title, description, focusedHeight, peekHeight }: TCardProps) {
  const cardHeight = useDerivedValue(() => scrollY.value);
  const animatedInnerStyle = useAnimatedStyle(() => {
    const itemFocusedAt = index * focusedHeight;
    const distance = cardHeight.value - itemFocusedAt;

    const animatedHeight = interpolate(distance, [-focusedHeight, 0], [peekHeight, focusedHeight], Extrapolation.CLAMP);

    return { height: animatedHeight };
  });

  return (
    <View className="overflow-hidden">
      <AnimatedCard className="rounded-[48px]" style={animatedInnerStyle}>
        <Image source={{ uri: imageUri }} className="absolute inset-0" />
        <View className="bg-black/50 absolute inset-0" />
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
            <DebateLikeButton debateId={id} userId={""} />
          </HerouiCard.Footer>
        </View>
      </AnimatedCard>
    </View>
  );
}
