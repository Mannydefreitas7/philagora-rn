import { Stack } from "expo-router";
import { View } from "react-native";

export default function PublicLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{ presentation: "fullScreenModal", animation: "fade", animationDuration: 200 }}
      />
      <Stack.Screen
        name="register"
        options={{
          animationMatchesGesture: true,
          animation: "fade",
          animationDuration: 200,
          presentation: "fullScreenModal",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
