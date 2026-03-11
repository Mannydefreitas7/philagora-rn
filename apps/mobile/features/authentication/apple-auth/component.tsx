import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { useColorScheme } from "react-native";
import useAppleAuthStore from "./store";
import { Apple } from "iconsax-react-nativejs";
import type { TAppleAuthFeatureProps } from "./types";
import useToast from "@/hooks/use-toast";

export default function AppleAuthFeature(props: TAppleAuthFeatureProps) {
	const router = useRouter();
	const { submitting, error, signInWithApple } = useAppleAuthStore();
	const theme = useColorScheme();
	const { show } = useToast();
	const handleSignIn = async () => {
		const { error: authError } = await signInWithApple();
		if (authError) {
			show({
				type: "danger",
				description: authError.message,
				placement: "bottom",
				title: "Apple authentication failed",
			});
			return;
		}
		if (error) {
			show({
				type: "danger",
				description: error,
				placement: "bottom",
				title: "Apple authentication failed",
			});
			return;
		}
		router.replace("/(public)/(tabs)");
	};

	return (
		<Button onPress={handleSignIn} variant="primary" className="flex flex-auto">
			<Apple color={theme === "dark" ? "black" : "white"} size={16} vectorEffect="default" variant="Bold" />
			<Button.Label className="text-white dark:text-black">{submitting ? "Signing in..." : "Apple"}</Button.Label>
		</Button>
	);
}
