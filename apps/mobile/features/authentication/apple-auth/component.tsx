import { Platform, Text, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";

import useAppleAuthStore from "./store";

export default function AppleAuthFeature() {
  const router = useRouter();
  const { submitting, error, signInWithApple } = useAppleAuthStore();

  const handleSignIn = async () => {
    const { error: authError } = await signInWithApple();
    if (authError) return;
    router.replace("/(public)/(tabs)");
  };

  if (Platform.OS !== "ios") return null;

  return (
    <View className="w-full">
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={8}
        style={{ width: "100%", height: 50 }}
        onPress={handleSignIn}
      />

      {error ? <Text className="mt-3 text-sm text-red-600">{error}</Text> : null}
    </View>
  );
}
