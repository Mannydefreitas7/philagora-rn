import React, { useCallback, useEffect, useMemo } from "react";

import { Uniwind, useUniwind } from "uniwind";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import TabButton from "@/components/tab-button";
import { tabs } from "@/constants/navigation";
import colors from "tailwindcss/colors";
import { oklabToHex } from "@/utils/convert";
import { Stack, useFocusEffect, usePathname } from "expo-router";
import { BlurView } from "expo-blur";
import { useWindowDimensions, View } from "react-native";

export default function TabLayout() {
  const route = usePathname();

  useEffect(() => {
    if (route.includes("home")) {
      console.log(route);
      Uniwind.setTheme("dark");
    } else {
      Uniwind.setTheme("light");
    }
  }, [route]);

  const { theme } = useUniwind();
  const isDark = useMemo(() => theme === "dark", [theme]);
  const activeColor = useMemo(() => (isDark ? colors.white : colors.black), [isDark]);
  const color = useMemo(() => (isDark ? colors.neutral[300] : colors.neutral[600]), [isDark]);
  const { width } = useWindowDimensions();

  return (
    <Tabs>
      <View className="flex-1 bg-white dark:bg-black">
        <TabSlot />
      </View>
      <TabList asChild>
        <BlurView
          className="bottom-safe translate-y-3 flex-1 absolute py-3 px-8 rounded-full border border-separator-secondary"
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
  );
}
