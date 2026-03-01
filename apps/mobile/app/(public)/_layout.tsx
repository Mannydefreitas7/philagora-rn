import Header from "@/components/navigation/header";
import useCurrentTab from "@/hooks/use-current-tab";
import useHeaderTitle from "@/hooks/use-header-title";
import { Stack, usePathname } from "expo-router";
import { Text, View } from "react-native";
import { useCSSVariable } from "uniwind";

export default function PublicLayout() {
  const title = useHeaderTitle();
  const { isHomeTab } = useCurrentTab();

  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{ presentation: "fullScreenModal", animation: "fade", animationDuration: 200, headerShown: false }}
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
      <Stack.Screen name="(tabs)">
        <Stack.Header transparent asChild>
          <Header title={title} />
        </Stack.Header>
      </Stack.Screen>
    </Stack>
  );
}
