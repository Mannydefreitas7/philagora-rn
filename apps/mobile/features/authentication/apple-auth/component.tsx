import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
} from "expo-apple-authentication";
import { useRouter } from "expo-router";
import { Button, cn } from "heroui-native";
import { Platform, Text, useColorScheme, View } from "react-native";
import useAppleAuthStore from "./store";
import { Apple } from "iconsax-react-nativejs";
import type { TAppleAuthFeatureProps } from "./types";

export default function AppleAuthFeature({ className, label }: TAppleAuthFeatureProps) {
  const router = useRouter();
  const { submitting, error, signInWithApple } = useAppleAuthStore();
  const theme = useColorScheme();
  const handleSignIn = async () => {
    const { error: authError } = await signInWithApple();
    if (authError) throw authError;
    if (error) throw new Error(error);
    router.replace("/(public)/(tabs)");
  };

  return (
    <Button onPress={handleSignIn} variant="primary" className="flex flex-auto">
      <Apple color={theme === "dark" ? "black" : "white"} size={16} vectorEffect="default" variant="Bold" />
      <Button.Label className="text-white dark:text-black">{submitting ? "Signing in..." : "Apple"}</Button.Label>
    </Button>
  );
}
