import { GrainyGradient, Header, useBottomBar } from "@repo/ui";
import type { TIconProps } from "@repo/ui/types";
import { Stack, usePathname } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { useColor } from "@/hooks/use-color";
import useCurrentTab from "@/hooks/use-current-tab";
import useSpacing from "@/hooks/use-spacing";

export default function PublicLayout() {
  const { isHomeTab } = useCurrentTab();
  const route = usePathname();

  const { activeTab } = useBottomBar(route);
  const { tabColor, backgroundColor } = useColor({ scheme: "dark", condition: isHomeTab });
  const { headerHeight } = useSpacing();

  const headerIcon = useMemo<TIconProps>(() => ({ ...activeTab.icon, variant: "fill" }), [activeTab.icon]);

  return (
    <Stack
      initialRouteName="login"
      screenLayout={({ children }) => {
        return (
          <View className="flex-1" style={{ backgroundColor }}>
            <GrainyGradient />
            {children}
          </View>
        );
      }}>
      <Stack.Screen
        name="login"
        options={{
          presentation: "fullScreenModal",
          animation: "fade",
          animationDuration: 200,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animationMatchesGesture: true,
          animation: "slide_from_bottom",
          animationDuration: 200,
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
      <Stack.Screen name="(tabs)">
        <Stack.Header asChild>
          <Header title={activeTab.name} icon={headerIcon} textColor={tabColor} height={headerHeight} />
        </Stack.Header>
      </Stack.Screen>
    </Stack>
  );
}
