import { memo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { FONT_SIZE, SPACING } from "../../base/spacing";
import { Icon } from "../../molecules";
import { AnimatedText } from "../animated-text";
import type { THeaderProps } from "./types";

const Title = ({ title, textColor }: { title: string; textColor: "white" | "black" }) => {
  return (
    <AnimatedText
      text={title}
      style={{
        fontWeight: "600",
        fontSize: FONT_SIZE.xxl,
        mixBlendMode: 'exclusion',
        color: textColor,
      }}
    />
  );
};

const Header = ({ title, icon, textColor, height }: THeaderProps) => {
  return (
    <Animated.View
      style={{
        height,
      }}
      className="header">
      <View className="flex-row items-center gap-x-2 px-2">
        <Icon {...icon} size={SPACING.xl} color={textColor} variant="fill" />
        <Title title={title} textColor={textColor} />
      </View>
    </Animated.View>
  );
};
export default memo(Header);
