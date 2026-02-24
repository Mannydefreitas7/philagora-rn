import { SplashScreen } from "expo-router";
import { useSessionStore } from "@/stores/session";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useSessionStore((state) => state);

  if (!isLoading) {
    SplashScreen.hide();
  }

  return null;
}
