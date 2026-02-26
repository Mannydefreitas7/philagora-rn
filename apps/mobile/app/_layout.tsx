import "./../global.css";
import {SplashScreen, Stack} from "expo-router";
import {HeroUINativeProvider} from "heroui-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useEffect} from "react";
import useSupabaseAuth from "@/hooks/use-supabase-auth";
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const {initializing} = useSupabaseAuth();

    useEffect(() => {
        console.log("RootLayout useEffect", initializing);
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
                }}
            >
                <Stack screenOptions={{headerShown: false}}/>
          </HeroUINativeProvider>
        </KeyboardProvider>
        </GestureHandlerRootView>
    );
}
