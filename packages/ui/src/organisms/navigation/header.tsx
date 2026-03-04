import { useMemo } from "react";
import { useColorScheme, View } from "react-native";
import AnimatedText from "@/components/ui/organisms/animated-text";
import { tabIcons } from "@/constants/icons";
import { HEADER } from "@/constants/navigation";
import { FONT_SIZE, SPACING } from "@/constants/size";
import useCurrentTab from "@/hooks/use-current-tab";
import useHeaderTitle from "@/hooks/use-header-title";
import useSpacing from "@/hooks/use-spacing";

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
					color: isHomeTab || isDark ? "white" : "black",
				}}
			/>
		);
	};

	return (
		<View
			className="bg-transparent absolute px-safe-offset-5 w-full flex-row items-end"
			style={{
				height: headerHeight,
				paddingBottom: HEADER.spacing.paddingVertical / 2,
			}}>
			<View className="flex-row items-center gap-x-2">
				<TabIcon size={SPACING.xl} color={isHomeTab || isDark ? "white" : "black"} variant="Bold" />
				{renderTitle()}
			</View>
		</View>
	);
};
export default Header;
