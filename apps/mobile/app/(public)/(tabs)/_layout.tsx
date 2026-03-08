import { GrainyGradient, TabButton, tabs } from "@repo/ui";
import { GlassView } from "expo-glass-effect";
import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useResolveClassNames, useUniwind } from "uniwind";
import useCurrentTab from "@/hooks/use-current-tab";
import { oklabToHex } from "@/utils/convert";

export default function TabLayout() {
  const { activeColor, color } = useCurrentTab();
  const { theme } = useUniwind();
  const { width } = useWindowDimensions();
  const styles = useResolveClassNames(
    "bottom-safe translate-y-3 flex-1 absolute py-3 px-8 rounded-full  border-neutral-200  dark:border-neutral-700 overflow-hidden mx-6",
  );

  const flattendStyles = StyleSheet.flatten([styles, { width: width - 48 }]);
  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <GlassView glassEffectStyle={theme === 'dark' ? 'clear' : "regular"} style={flattendStyles}>
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
        </GlassView>
      </TabList>
    </Tabs>
  );
}
