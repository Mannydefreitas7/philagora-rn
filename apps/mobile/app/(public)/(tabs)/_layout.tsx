import { TabSlot } from "expo-router/ui";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { ScopedTheme } from "uniwind";
import useCurrentTab from "@/hooks/use-current-tab";
import { BottomBar } from "@repo/ui";


export default function TabLayout() {
  const { isHomeTab, activeColor, color } = useCurrentTab();
  const scheme = useColorScheme();
  const isDark = useMemo(() => scheme === "dark", [scheme]);

  return (
    <ScopedTheme theme={isHomeTab || isDark ? "dark" : "light"}>
      <BottomBar color={color} activeColor={activeColor}>
        <TabSlot />
      </BottomBar>
    </ScopedTheme>
  );
}
