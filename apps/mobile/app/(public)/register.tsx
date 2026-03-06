import { GrainyGradient } from "@repo/ui";
import SignupFeature from "@/features/authentication/signup";
import { View } from "react-native";

export const unstable_settings = {
  anchor: "login", // Anchor to the index route
};

export default function RegisterScreen() {

  return (
    <View className="flex-1 bg-white dark:bg-neutral-950">
      <GrainyGradient />
      <SignupFeature />
    </View>
  )
}
