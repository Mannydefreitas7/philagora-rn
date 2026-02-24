import useSessionStore from "@/stores/session";
import useUserStore from "@/stores/user";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function PublicLayout() {
  const user = useUserStore((user) => user.user);
  const isLoggedIn = useSessionStore((state) => state);
  const router = useRouter();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.navigate("/(public)/(tabs)");
  //     return;
  //   }
  //   console.log("IS LOGGED", isLoggedIn);
  //   router.navigate("/(public)/(auth)/login");
  // }, [isLoggedIn]);

  return (
    <Stack>
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
