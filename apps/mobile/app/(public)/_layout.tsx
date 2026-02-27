import { Stack } from "expo-router";
import { View } from "react-native";

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="login"
      screenLayout={(layout) => {
        return <View className="bg-white dark:bg-neutral-950 flex-1">{layout.children}</View>;
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
