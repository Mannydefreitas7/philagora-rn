import { Icon } from "@repo/ui";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { useColorScheme } from "react-native";

import useTikTokAuthStore from "./store";
import type { TTikTokAuthFeatureProps } from "./types";

export default function TikTokAuthFeature({ className }: TTikTokAuthFeatureProps) {
  const router = useRouter();
  const { submitting, signInWithTikTok } = useTikTokAuthStore();
  const theme = useColorScheme();

  const handleSignIn = async () => {
    const { error } = await signInWithTikTok();
    if (error) throw error;
    router.replace("/(public)/(tabs)");
  };

  return (
    <Button
      variant="secondary"
      className={`flex flex-auto border border-neutral-300 dark:border-neutral-800 ${className ?? ""}`}
      onPress={handleSignIn}
      isDisabled={submitting}>
      <Icon variant="fill" name="TiktokSquare2" color={theme === "dark" ? "white" : "black"} size={22} />
      <Button.Label>{submitting ? "Signing in..." : "TikTok"}</Button.Label>
    </Button>
  );
}
