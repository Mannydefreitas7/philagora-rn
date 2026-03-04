import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import TabButton from "@/components/tab-button";
import { tabs } from "@/constants/navigation";

import { ScopedTheme } from "uniwind";
import { oklabToHex } from "@/utils/convert";
import { BlurView } from "expo-blur";
import { useColorScheme, useWindowDimensions, View } from "react-native";
import useCurrentTab from "@/hooks/use-current-tab";
import { GrainyGradient } from "@/components/ui/organisms/grainy-gradient";
import { useMemo } from "react";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

export default function TabLayout() {
  const { isHomeTab, activeColor, color } = useCurrentTab();
  const scheme = useColorScheme();
  const isDark = useMemo(() => scheme === "dark", [scheme]);
  const { width } = useWindowDimensions();
  return (
    <ScopedTheme theme={isHomeTab || isDark ? "dark" : "light"}>
      <Tabs>
        <Animated.View className="flex-1 bg-white dark:bg-black relative" entering={BounceIn} exiting={BounceOut}>
          <GrainyGradient />
          <TabSlot />
        </Animated.View>
        <TabList asChild>
          <BlurView
            className="bottom-safe translate-y-3 flex-1 absolute py-3 px-8 rounded-full border border-neutral-200 dark:border-neutral-700"
            intensity={30}
            style={{ width: width - 48, overflow: "hidden", marginHorizontal: 24 }}
          >
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
