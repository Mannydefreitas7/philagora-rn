import { useMemo } from "react";
import colors from "tailwindcss/colors";
import { oklabToHex } from "@/utils/convert";

export const useColor = (isDark: boolean) => {
	const activeColorToken = useMemo(() => (isDark ? colors.cyan[300] : colors.cyan[800]), [isDark]);
	const colorToken = useMemo(() => (isDark ? colors.neutral[600] : colors.neutral[400]), [isDark]);
	const activeColor = useMemo(() => oklabToHex(activeColorToken), [activeColorToken]);
	const color = useMemo(() => oklabToHex(colorToken), [colorToken]);

	return { activeColor, color };
};
