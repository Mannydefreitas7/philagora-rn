import useCurrentTab from "@/hooks/use-current-tab";
import { View, Text } from "react-native";
import { cn, useThemeColor } from "heroui-native";
import useSpacing from "@/hooks/use-spacing";
import { SPACING } from "@/constants/size";
import useHeaderTitle from "@/hooks/use-header-title";
import { useCallback, useMemo } from "react";
import { tabIcons } from "@/constants/icons";
import { IconProps } from "iconsax-react-nativejs";
import { HEADER } from "@/constants/navigation";

const Header = ({ title }: { title: string }) => {
  const { isHomeTab } = useCurrentTab();
  const { icon } = useHeaderTitle();
  const { headerHeight } = useSpacing();
  const TabIcon = tabIcons[icon];

  return (
    <View
      className="bg-transparent absolute px-safe-offset-5 w-full flex-row items-end"
      style={{ height: headerHeight, paddingBottom: HEADER.spacing.paddingVertical / 2 }}
    >
      <View className="flex-row items-center">
        <TabIcon size={SPACING.xl} color={isHomeTab ? "white" : "black"} variant="Bold" />
        <Text className={cn("font-medium text-3xl capitalize ml-2", isHomeTab ? "text-white" : "text-black")}>
          {title}
        </Text>
      </View>
    </View>
  );
};
export default Header;
