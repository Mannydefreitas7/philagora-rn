import "./../global.css";
import { Slot, SplashScreen } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import useSupabaseAuth from "@/hooks/use-supabase-auth";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { initializing } = useSupabaseAuth();

  useEffect(() => {
    if (!initializing) SplashScreen.hideAsync();
  }, [initializing]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }} className="bg-white dark:bg-background">
      <HeroUINativeProvider
        config={{
          devInfo: {
            stylingPrinciples: false,
          },
        }}
      >
        <Slot />
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
