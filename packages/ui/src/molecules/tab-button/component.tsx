import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { SPACING } from "../../base/spacing";
import { Icon } from "../icon";
import type { TabButtonProps } from "./types";

const TabButton = ({ icon, label, isFocused, ...props }: TabButtonProps) => {
  const color = useMemo(() => {
    return isFocused ? props.activeColor : props.color;
  }, [isFocused, props.activeColor, props.color]);
  return (
    <Pressable {...props}>
      <View className="flex-col items-center gap-1">
        <Icon {...icon} variant={isFocused ? "fill" : "outline"} name={icon.name} size={SPACING.lg} color={color} />
        <Text style={{ color }} className="font-semibold capitalize text-xs">
          {label}
        </Text>
      </View>
    </Pressable>
  );
};
export default React.memo(TabButton);
