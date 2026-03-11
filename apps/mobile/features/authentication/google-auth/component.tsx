import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { Google } from "iconsax-react-nativejs";
import { useColorScheme } from "react-native";

import useGoogleAuthStore from "./store";
import type { TGoogleAuthFeatureProps } from "./types";

export default function GoogleAuthFeature({ className }: TGoogleAuthFeatureProps) {
  const router = useRouter();
  const { submitting, error, signInWithGoogle } = useGoogleAuthStore();
  const theme = useColorScheme();
  const handleSignIn = async () => {
    const { error: authError } = await signInWithGoogle();
    if (authError) throw authError;
    if (error) throw new Error(error);
    router.replace("/(public)/(tabs)");
  };

  return (
    <Button
      variant="secondary"
      className="flex flex-auto border border-neutral-300 dark:border-neutral-800"
      onPress={handleSignIn}
      isDisabled={submitting}>
      <Google color={theme === "dark" ? "white" : "black"} size={16} variant="Bold" />
      <Button.Label>{submitting ? "Signing in..." : "Google"}</Button.Label>
    </Button>
  );
}
