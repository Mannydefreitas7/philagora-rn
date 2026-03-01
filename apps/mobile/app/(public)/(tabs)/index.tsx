import { View } from "react-native";
import useSpacing from "@/hooks/use-spacing";
import { LinearGradient } from "expo-linear-gradient";
import { PhCarousel } from "@/components/organisms/carousel";
import { Provider } from "react-redux";
import { store } from "@/stores/redux";
import { useAppDispatch, useAppSelector } from "@/types/redux";
import { ScrollShadow } from "heroui-native";

export default function HomeScreen() {
  const { tabHeight, headerHeight } = useSpacing();
  const { currentIndex, data, ...rest } = useAppSelector((state) => state.carousel);

  return (
    <View className="relative flex-1">
      <ScrollShadow size={headerHeight * 2} className="flex-1" LinearGradientComponent={LinearGradient}>
        <PhCarousel {...rest} data={data} spacing={0} currentIndex={currentIndex} />
      </ScrollShadow>
    </View>
  );
}
