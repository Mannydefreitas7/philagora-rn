import useCurrentTab from "@/hooks/use-current-tab";
import { View, Text } from "react-native";
import { cn } from "heroui-native";
import useSpacing from "@/hooks/use-spacing";
import { SPACING } from "@/constants/size";

const Header = ({ title }: { title: string }) => {
  const { isHomeTab } = useCurrentTab();
  const { headerHeight } = useSpacing();

  return (
    <View className="top-safe bg-transparent absolute px-safe-offset-6 w-full" style={{ height: headerHeight, paddingTop: SPACING.lg }}>
      <Text className={cn("font-bold text-3xl capitalize ml-2", isHomeTab ? "text-white" : "text-black")}>{title}</Text>
    </View>
  );
};
export default Header;
