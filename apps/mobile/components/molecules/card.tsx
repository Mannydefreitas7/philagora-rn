import useSpacing from "@/hooks/use-spacing";
import { useCallback } from "react";
import { ViewToken, View, Image } from "react-native";
import { Button, Chip, Card as HerouiCard } from "heroui-native";
import DebateLikeButton from "@/features/debate/like";
import { Session } from "@/types/session";
import { Debate } from "@/types/debate";
import Animated, {
  isSharedValue,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  item: Session<Debate>;
  height?: number | SharedValue<number>;
  active: boolean;
};

const AnimatedCard = Animated.createAnimatedComponent(HerouiCard);

export function Card({ item, active, height }: Props) {
  const { primaryCardHeight, secondaryCardHeight, tabHeight, headerHeight } = useSpacing();
  const animatedHeight = useDerivedValue(() =>
    height && isSharedValue<number>(height) ? height.value : primaryCardHeight,
  );
  const style = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  return (
    <AnimatedCard className="rounded-4xl" style={style}>
      <Image source={{ uri: item.image }} className="absolute inset-0" />
      <View className="bg-black/50 absolute inset-0" />
      <View className="gap-4 items-start justify-end flex-col flex-1 h-full p-3 relative">
        <Chip variant="soft" color="danger" size="md" className="absolute top-1 right-1">
          Live
        </Chip>
        <HerouiCard.Body>
          <View className="gap-1 mt-6">
            <HerouiCard.Title className="text-white font-bold">{item.title}</HerouiCard.Title>
            <HerouiCard.Title className="text-sm">{item.description}</HerouiCard.Title>
          </View>
          <HerouiCard.Description>Join the debate now.</HerouiCard.Description>
        </HerouiCard.Body>
        <HerouiCard.Footer className="gap-3 flex-row w-full justify-between items-center">
          <Button size="sm" variant="secondary">
            Join
          </Button>
          <DebateLikeButton debateId={item.id} userId={""} />
        </HerouiCard.Footer>
      </View>
    </AnimatedCard>
  );
}
