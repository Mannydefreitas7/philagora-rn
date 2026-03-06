import { GrainyGradient, TabButton, tabs } from "@repo/ui";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { BlurView } from "expo-blur";
import { useMemo } from "react";
import { useColorScheme, useWindowDimensions, View } from "react-native";
import { ScopedTheme } from "uniwind";
import useCurrentTab from "@/hooks/use-current-tab";
import { oklabToHex } from "@/utils/convert";

export default function TabLayout() {
  const { isHomeTab, activeColor, color } = useCurrentTab();
  const scheme = useColorScheme();
  const isDark = useMemo(() => scheme === "dark", [scheme]);
  const { width } = useWindowDimensions();

  return (
    <ScopedTheme theme={isHomeTab || isDark ? "dark" : "light"}>
      <Tabs>
        <View className="flex-1 bg-white dark:bg-black relative">
          <GrainyGradient />
          <TabSlot />
        </View>
        <TabList asChild>
          <BlurView
            className="bottom-safe translate-y-3 flex-1 absolute py-3 px-8 rounded-full border border-neutral-200 dark:border-neutral-700"
            intensity={30}
            style={{ width: width - 48, overflow: "hidden", marginHorizontal: 24 }}>
            {tabs.map((tab) => (
              <TabTrigger key={tab.id} name={tab.name} href={tab.route} asChild>
                <TabButton
                  icon={tab.icon}
                  label={tab.name}
                  activeColor={oklabToHex(activeColor)}
                  color={oklabToHex(color)}
                />
              </TabTrigger>
            ))}
          </BlurView>
        </TabList>
      </Tabs>
    </ScopedTheme>
  );
}
