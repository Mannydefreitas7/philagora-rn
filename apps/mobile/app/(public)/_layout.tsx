import { Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Uniwind } from "uniwind";

export default function PublicLayout() {
  const route = usePathname();
  useEffect(() => {
    if (route.includes("home")) {
      console.log(route);
      Uniwind.setTheme("dark");
    } else {
      Uniwind.setTheme("light");
    }
  }, [route]);

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

          headerTitle: params.route.name,
          headerShadowVisible: false,
          headerShown: true,
        })}
      />
    </Stack>
  );
}
