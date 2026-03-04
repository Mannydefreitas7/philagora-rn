import type { TabTriggerSlotProps } from "expo-router/ui";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { SPACING } from "@/base/spacing";
import { tabIcons } from "@/constants/icons";
import type { ITab } from "@/types/navigation";

type TabButtonProps = TabTriggerSlotProps & {
  icon: ITab["icon"];
  label: ITab["name"];
  color: string;
  activeColor: string;
};

const TabButton = ({ icon, label, isFocused, ...props }: TabButtonProps) => {
  const Icon = tabIcons[icon];
  const color = useMemo(() => {
    return isFocused ? props.activeColor : props.color;
  }, [isFocused, props.activeColor, props.color]);
  return (
    <Pressable {...props}>
      <View className="flex-col items-center gap-1">
        <Icon size={SPACING.lg} variant={isFocused ? "Bold" : "Outline"} color={color} />
        <Text style={{ color }} className="font-semibold capitalize text-xs">
          {label}
        </Text>
      </View>
    </Pressable>
  );
};
export default React.memo(TabButton);
