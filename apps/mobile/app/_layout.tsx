import "./../global.css";
import { SplashScreen, Stack } from "expo-router";
import { LinkPreviewContextProvider } from "expo-router/build/link/preview/LinkPreviewContext";
import { HeroUINativeProvider } from "heroui-native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import useSupabaseAuth from "@/hooks/use-supabase-auth";
import { Uniwind } from "uniwind";
import useSpacing from "@/hooks/use-spacing";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { initializing } = useSupabaseAuth();
  const { headerHeight } = useSpacing();

  useEffect(() => {
    Uniwind.updateCSSVariables(Uniwind.currentTheme, {
      '--h-height': headerHeight
    });
    if (initializing) SplashScreen.hide();
  }, [initializing]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }} className="bg-white dark:bg-neutral-900">
      <KeyboardProvider>
        <HeroUINativeProvider
          config={{
            devInfo: {
              stylingPrinciples: false,
            },
          }}>
          <LinkPreviewContextProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </LinkPreviewContextProvider>
        </HeroUINativeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
