import useSupabaseAuth from "@/hooks/use-supabase-auth";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { useCallback } from "react";
import { Text, View } from "react-native";

export default function ProfileScreen() {

  const router = useRouter();
  const { signOut } = useSupabaseAuth();

  const handleLogout = useCallback(async () => {
    await signOut();
    router.replace("/login");
  }, [router.replace, signOut]);

  return (
    <View className="flex-1 justify-end mt-safe-offset-8 mb-safe-offset-20">

      <Button onPress={handleLogout} className="mx-3">
        <Button.Label>Sign out</Button.Label>
      </Button>
    </View>
  );
}
