import { useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";

import useLogoutStore from "./store";

export default function LogoutFeature() {
  const router = useRouter();
  const { loading, error, logout } = useLogoutStore();

  const handleLogout = async () => {
    const { error: logoutError } = await logout();
    if (!logoutError) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    void handleLogout();
  }, []);

  return (
    <View className="flex-1 items-center justify-center gap-y-3 px-6">
      <Text className="text-base text-neutral-700 dark:text-neutral-200">
        {loading ? "Signing out..." : "Signed out."}
      </Text>
      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
      {error ? (
        <Button onPress={handleLogout} variant="primary" isDisabled={loading}>
          Try again
        </Button>
      ) : null}
    </View>
  );
}
