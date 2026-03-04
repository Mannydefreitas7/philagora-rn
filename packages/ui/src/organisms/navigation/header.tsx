import { View } from "react-native";
import { FONT_SIZE, HEADER } from "@/atoms/spacing";
import AnimatedText from "@/organisms/animated-text";

type TProps = {
  title: string;
  icon: React.ReactNode;
  index?: number;
  height?: number;
  textColor: "white" | "black";
}

const Header = ({ title, icon, index, height, textColor }: TProps) => {

  const renderTitle = () => {
    return (
      <AnimatedText
        key={index}
        text={title}
        style={{
          fontWeight: "600",
          fontSize: FONT_SIZE.xxl,
          color: textColor,
        }}
      />
    );
  };

  return (
    <View
      className="bg-transparent absolute px-safe-offset-5 w-full flex-row items-end"
      style={{
        height,
        paddingBottom: HEADER.paddingVertical / 2,
      }}>
      <View className="flex-row items-center gap-x-2">
        {/*<TabIcon size={SPACING.xl} color={isHomeTab || isDark ? "white" : "black"} variant="Bold" />*/}
        {icon}
        {renderTitle()}
      </View>
    </View>
  );
};
export default Header;
