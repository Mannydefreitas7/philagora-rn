import useCurrentTab from "@/hooks/use-current-tab";
import { View, Text, useColorScheme } from "react-native";
import { cn, useThemeColor } from "heroui-native";
import useSpacing from "@/hooks/use-spacing";
import { FONT_SIZE, SPACING } from "@/constants/size";
import useHeaderTitle from "@/hooks/use-header-title";
import { tabIcons } from "@/constants/icons";
import { HEADER } from "@/constants/navigation";
import { useMemo } from "react";
import AnimatedText from "../ui/organisms/animated-text";

const Header = ({ title }: { title: string }) => {
  const { isHomeTab } = useCurrentTab();
  const { icon, index } = useHeaderTitle();
  const { headerHeight } = useSpacing();
  const scheme = useColorScheme();
  const isDark = useMemo(() => scheme === "dark", [scheme]);
  const TabIcon = tabIcons[icon];

  const renderTitle = () => {
    return (
      <AnimatedText
        key={index}
        text={title}
        style={{
          fontWeight: "600",
          fontSize: FONT_SIZE.xxl,
          color: isDark ? "white" : "black",
        }}
      />
    );
  };

  return (
    <View
      className="bg-transparent absolute px-safe-offset-5 w-full flex-row items-end"
      style={{ height: headerHeight, paddingBottom: HEADER.spacing.paddingVertical / 2 }}
    >
      <View className="flex-row items-center gap-x-2">
        <TabIcon size={SPACING.xl} color={isHomeTab || isDark ? "white" : "black"} variant="Bold" />
        {renderTitle()}
      </View>
    </View>
  );
};
export default Header;
