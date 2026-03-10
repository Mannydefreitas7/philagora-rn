import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import { Platform, Text, View } from "react-native";

import useAppleAuthStore from "./store";
import { cn } from "heroui-native";
import type { TAppleAuthFeatureProps } from "./types";


export default function AppleAuthFeature({ className, buttonStyle, buttonType }: TAppleAuthFeatureProps) {
  const router = useRouter();
  const { submitting, error, signInWithApple } = useAppleAuthStore();

  const handleSignIn = async () => {
    const { error: authError } = await signInWithApple();
    if (authError) return;
    router.replace("/(public)/(tabs)");
  };

  if (Platform.OS !== "ios") return null;

  return (
    <View className={cn(className, "w-full")}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={buttonType ?? AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={buttonStyle ?? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={50}

        style={{ width: "100%", height: 50 }}
        onPress={handleSignIn}
      />

      {error ? <Text className="mt-3 text-sm text-red-600">{error}</Text> : null}
    </View>
  );
}
