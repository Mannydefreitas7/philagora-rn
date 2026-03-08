import { oklabToHex } from "@repo/utils";
import { BlurView } from "expo-blur";
import { TabList, TabTrigger, useTabSlot } from "expo-router/ui";
import { useWindowDimensions, View } from "react-native";
import { TabButton } from "../../molecules/tab-button";
import { GrainyGradient } from "../grainy-gradient";
import { tabs } from "./data";
import type { TBottomBarProps } from "./types";

const BottomBar = ({ activeColor, color }: TBottomBarProps) => {
  const { width } = useWindowDimensions();
  const tabslot = useTabSlot();
  return (
    <>
      <View className="flex-1 bg-white dark:bg-black relative">
        <GrainyGradient />
        {tabslot}
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
    </>
  );
};

export const useBottomBar = (route: string) => {
  const activeTab = tabs.find((tab) => tab.route === route) || tabs[0];
  return {
    activeTab,
    tabs,
  };
};

export default BottomBar;
