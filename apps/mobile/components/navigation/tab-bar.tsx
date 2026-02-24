import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { useResolveClassNames } from "uniwind";
import { GlassView, GlassContainer, isLiquidGlassAvailable } from "expo-glass-effect";
import TabButton from "../tab-button";
import { tabs } from "@/constants/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

const TabBar = () => {
  const color = useResolveClassNames("text-cyan-700 dark:text-cyan-300");

  return (
    <Tabs className="px-8">
      <TabSlot />
      <TabList className="pb-safe">
        {tabs.map((tab) => (
          <TabTrigger key={tab.id} name={tab.name} href={tab.route} asChild>
            {/*<TabButton icon={tab.icon} label={tab.name} />*/}
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
};

export default TabBar;
