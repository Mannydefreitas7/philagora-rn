import { GrainyGradient } from "@repo/ui";
import { View } from "react-native";
import Login from "@/features/authentication/login";

export default function LoginPage() {
  return (
    <View className="flex-1 bg-white dark:bg-neutral-950">
      <GrainyGradient />
      <Login />
    </View>
  );
}
