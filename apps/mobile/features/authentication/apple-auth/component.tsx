import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { Apple } from "iconsax-react-nativejs";
import { useColorScheme } from "react-native";
import { CircleLoadingIndicator, CircularLoader } from "@repo/ui/molecules";
import useToast from "@/hooks/use-toast";
import useAppleAuthStore from "./store";
import type { TAppleAuthFeatureProps } from "./types";

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
		<Button
			onPress={handleSignIn}
			variant="secondary"
			className="flex flex-auto border border-neutral-300 dark:border-neutral-800">
			{submitting ? (
				<CircularLoader
					size={18}
					strokeWidth={3}
					activeColor={theme === "light" ? "black" : "white"}
					enableBlur
					gradientLength={20}
				/>
			) : (
				<Apple color={theme === "light" ? "black" : "white"} size={18} vectorEffect="default" variant="Bold" />
			)}

			<Button.Label>Apple</Button.Label>
		</Button>
	);
}
