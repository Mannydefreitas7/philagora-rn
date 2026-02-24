import useSessionStore from "@/stores/session";
import { Redirect, Stack } from "expo-router";

export default function PublicLayout() {
  const isLoggedIn = useSessionStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/(public)/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
