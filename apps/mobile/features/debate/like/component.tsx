import { Button, useThemeColor } from "heroui-native";
import { Heart } from "iconsax-react-nativejs";
import useDebateLikeStore from "./store";

type DebateLikeButtonProps = {
	debateId: string;
	userId: string;
};

export default function DebateLikeButton({ debateId, userId }: DebateLikeButtonProps) {
	const toggleLike = useDebateLikeStore((state) => state.toggleLike);
	const key = `${debateId}:${userId}`;
	const liked = useDebateLikeStore((state) => state.likes[key] ?? false);
	const accentColor = useThemeColor("accent");

	const handleToggleLike = async () => {
		await toggleLike(debateId, userId);
	};

	return (
		<Button size="sm" isIconOnly feedbackVariant="scale-ripple" variant={"ghost"} onPress={handleToggleLike}>
			<Heart size={18} color={accentColor} variant={liked ? "Bold" : "Outline"} />
		</Button>
	);
}
