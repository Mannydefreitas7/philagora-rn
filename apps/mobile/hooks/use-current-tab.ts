import { usePathname } from "expo-router";
import { useMemo } from "react";
import colors from "tailwindcss/colors";
import { useUniwind } from "uniwind";
import { tabs } from "@/constants/navigation";

const useCurrentTab = () => {
	const route = usePathname();
	const { theme } = useUniwind();
	const lastSegment = useMemo(() => route.split("/").pop(), [route]);
	const isHomeTab = useMemo(() => {
		const lastSegment = route.split("/").pop();
		return !lastSegment && lastSegment?.length === 0;
	}, [route, lastSegment]);
	const isDark = useMemo(() => theme === "dark", [theme]);
	const activeColor = useMemo(() => (isDark || isHomeTab ? colors.white : colors.black), [isDark, isHomeTab]);
	const color = useMemo(() => (isDark || isHomeTab ? colors.neutral[300] : colors.neutral[600]), [isDark, isHomeTab]);
	const current = useMemo(() => tabs.find((tab) => tab.route === route), [route, tabs]);
	return {
		isHomeTab,
		activeColor,
		lastSegment,
		color,
		current,
	};
};
export default useCurrentTab;
