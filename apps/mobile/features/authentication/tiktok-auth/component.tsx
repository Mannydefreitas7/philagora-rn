import { CircularLoader, Icon } from "@repo/ui";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { useColorScheme } from "react-native";
import useToast from "@/hooks/use-toast";
import useTikTokAuthStore from "./store";
import type { TTikTokAuthFeatureProps } from "./types";

export default function TikTokAuthFeature({ className }: TTikTokAuthFeatureProps) {
	const router = useRouter();
	const { submitting, signInWithTikTok } = useTikTokAuthStore();
	const theme = useColorScheme();
	const { show } = useToast();

	const handleSignIn = async () => {
		const { error } = await signInWithTikTok();
		if (error) {
			show({
				title: "TikTok Authentication Failed",
				description: error.message,
				placement: "bottom",
				type: "danger",
			});
			return;
		}
		router.replace("/(public)/(tabs)");
	};

	return (
		<Button
			variant="secondary"
			className={`flex flex-auto border border-neutral-300 dark:border-neutral-800 ${className ?? ""}`}
			onPress={handleSignIn}
			isDisabled={submitting}>
			{!submitting ? (
				<CircularLoader
					size={18}
					strokeWidth={3}
					activeColor={theme === "light" ? "black" : "white"}
					enableBlur
					gradientLength={20}
				/>
			) : (
				<Icon name="TiktokSquare2" color={theme === "light" ? "black" : "white"} size={22} variant="fill" />
			)}
			<Button.Label>TikTok</Button.Label>
		</Button>
	);
}
