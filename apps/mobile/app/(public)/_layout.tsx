import { Stack, usePathname } from "expo-router";

export default function PublicLayout() {
  const route = usePathname();

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
      <Stack.Screen
        name="(tabs)"
        options={(params) => ({
          headerTransparent: true,
          headerTintColor: "white",
          headerLargeTitleEnabled: true,
          headerShadowVisible: false,
          headerShown: true,
        })}
      />
    </Stack>
  );
}
