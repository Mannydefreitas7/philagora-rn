import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { Google } from "iconsax-react-nativejs";
import { useColorScheme } from "react-native";

import useGoogleAuthStore from "./store";
import type { TGoogleAuthFeatureProps } from "./types";
import useToast from "@/hooks/use-toast";
import { CircularLoader } from "@repo/ui";

export default function GoogleAuthFeature({ className }: TGoogleAuthFeatureProps) {
	const router = useRouter();
	const { submitting, error, signInWithGoogle } = useGoogleAuthStore();
	const theme = useColorScheme();
	const { show } = useToast();
	const handleSignIn = async () => {
		const { error: authError } = await signInWithGoogle();
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
			variant="secondary"
			className="flex flex-auto border border-neutral-300 dark:border-neutral-800"
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
				<Google color={theme === "light" ? "black" : "white"} size={16} vectorEffect="default" variant="Bold" />
			)}
			<Button.Label>{submitting ? "Signing in..." : "Google"}</Button.Label>
		</Button>
	);
}
