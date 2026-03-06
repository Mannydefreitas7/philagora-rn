import { LinearGradient } from "expo-linear-gradient";
import { ScrollShadow } from "heroui-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PhCarousel } from "@repo/ui";
import useSpacing from "@/hooks/use-spacing";

export default function HomeScreen() {
  const { tabHeight, headerHeight } = useSpacing();
  const { top } = useSafeAreaInsets();
  const initialIndex = 0;
  return (
    <View className="relative flex-1">
      <ScrollShadow
        size={headerHeight + top}
        visibility="top"
        className="flex-1"
        LinearGradientComponent={LinearGradient}>
        <PhCarousel tabHeight={tabHeight} headerHeight={headerHeight} initialIndex={initialIndex} data={[]} />
      </ScrollShadow>
    </View>
  );
}
