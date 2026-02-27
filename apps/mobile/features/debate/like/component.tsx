import { Button } from "heroui-native";

import useDebateLikeStore from "./store";
import { Heart } from "iconsax-react-nativejs";

type DebateLikeButtonProps = {
  debateId: string;
  userId: string;
};

export default function DebateLikeButton({ debateId, userId }: DebateLikeButtonProps) {
  const toggleLike = useDebateLikeStore((state) => state.toggleLike);
  const key = `${debateId}:${userId}`;
  const liked = useDebateLikeStore((state) => state.likes[key] ?? false);

  const handleToggleLike = async () => {
    await toggleLike(debateId, userId);
  };

  return (
    <Button size="sm" isIconOnly variant={"ghost"} onPress={handleToggleLike}>
      <Heart size={20} color={"red"} variant={liked ? "Bold" : "Outline"} />
    </Button>
  );
}
