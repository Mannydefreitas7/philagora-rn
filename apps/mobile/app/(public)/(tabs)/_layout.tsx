import React, { useMemo } from "react";

import { useUniwind } from "uniwind";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import TabButton from "@/components/tab-button";
import { tabs } from "@/constants/navigation";
import colors from "tailwindcss/colors";
import { oklabToHex } from "@/utils/convert";

export default function TabLayout() {
  const { theme } = useUniwind();
  const isDark = useMemo(() => theme === "dark", [theme]);
  const activeColor = useMemo(() => (isDark ? colors.white : colors.black), [isDark]);
  const color = useMemo(() => (isDark ? colors.neutral[300] : colors.neutral[600]), [isDark]);

  return (
    <Tabs>
      <TabSlot />
      <TabList className="mb-safe translate-y-2 mx-6 py-3 px-8 rounded-full bg-background-secondary border border-separator-secondary blur-lg">
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
      </TabList>
    </Tabs>
  );
}
