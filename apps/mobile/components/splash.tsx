import { SplashScreen } from "expo-router";
import { useSessionStore } from "@/stores/session";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const isLoggedIn = useSessionStore((state) => state.isLoggedIn);

  if (typeof isLoggedIn === "boolean") {
    SplashScreen.hide();
  }

  return null;
}
