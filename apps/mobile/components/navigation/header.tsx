import useCurrentTab from "@/hooks/use-current-tab";
import { View, Text } from "react-native";
import { cn } from "heroui-native";

const Header = ({ title }: { title: string }) => {
  const { isHomeTab } = useCurrentTab();

  return (
    <View className="top-safe-offset-10 bg-transparent absolute px-safe-offset-6 w-full">
      <Text className={cn("font-black text-3xl capitalize", isHomeTab ? "text-white" : "text-black")}>{title}</Text>
    </View>
  );
};
export default Header;
