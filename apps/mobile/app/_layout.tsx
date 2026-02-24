import useSessionStore from "@/stores/session";
import "./../global.css";
import { Slot, SplashScreen } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const session = useSessionStore((state) => state.token);

  useEffect(() => {
    if (!session) SplashScreen.hideAsync();
  }, [session]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <Slot />
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
