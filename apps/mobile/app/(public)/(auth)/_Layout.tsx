import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <Stack screenOptions={{ fullScreenGestureEnabled: true, animationTypeForReplace: 'pop' }} screenLayout={({ children }) => {
      return <View className="bg-white dark:bg-neutral-800 flex flex-1">
        {children}
      </View>
    }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      </Stack>
  );
}
