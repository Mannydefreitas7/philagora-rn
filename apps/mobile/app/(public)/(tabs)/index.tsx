import { View } from "react-native";
import useSpacing from "@/hooks/use-spacing";
import { LinearGradient } from "expo-linear-gradient";
import { PhCarousel } from "@/components/organisms/carousel";
import { ScrollShadow } from "heroui-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
        LinearGradientComponent={LinearGradient}
      >
        <PhCarousel initialIndex={initialIndex} data={[]} />
      </ScrollShadow>
    </View>
  );
}
