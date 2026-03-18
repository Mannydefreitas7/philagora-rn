import SignupFeature from "@/features/authentication/signup";
import { View } from "react-native";
import { DOMComponent } from "@repo/ui";

export const unstable_settings = {
  anchor: "login", // Anchor to the index route
};

export default function RegisterScreen() {

  return (
    <View className="flex-1">
      <DOMComponent name="Register" />
      <SignupFeature />
    </View>
  )
}
