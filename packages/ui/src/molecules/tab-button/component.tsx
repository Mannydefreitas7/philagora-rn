import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { SPACING } from "../../base/spacing";
import type { TIconVariant } from "../icon";
import { Icon } from "../icon";
import type { TabButtonProps } from "./types";

const TabButton = ({ icon, label, isFocused, ...props }: TabButtonProps<TIconVariant>) => {
	const color = useMemo(() => {
		return isFocused ? props.activeColor : props.color;
	}, [isFocused, props.activeColor, props.color]);
	return (
		<Pressable {...props}>
			<View className="flex-col items-center gap-1">
				<Icon {...icon} size={SPACING.lg} color={color} />
				<Text style={{ color }} className="font-semibold capitalize text-xs">
					{label}
				</Text>
			</View>
		</Pressable>
	);
};
export default React.memo(TabButton);
