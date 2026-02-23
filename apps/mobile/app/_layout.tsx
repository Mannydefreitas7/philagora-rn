import useUserStore from "@/stores/userStore";
import "./../global.css";
import { Stack, useRouter } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useEffect } from "react";

export default function RootLayout() {

  const isLoggedIn = useUserStore(user => user.isLoggedIn);
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      router.navigate("/(tabs)")
      return;
    }
    console.log("IS LOGGED", isLoggedIn)
    router.navigate("/(auth)/login");
  }, [isLoggedIn])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modal)" options={{ headerShown: false }} />
        </Stack>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
