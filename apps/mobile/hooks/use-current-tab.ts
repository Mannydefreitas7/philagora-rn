import { useSegments } from "expo-router";
import { useMemo } from "react";
import colors from "tailwindcss/colors";
import { useUniwind } from "uniwind";

const useCurrentTab = () => {
  const segments = useSegments<["(public)", "login"] | ["(public)", "(tabs)"]>();
  const currentRoute = useMemo(() => segments.pop() || 'login', [segments]);
  const { theme } = useUniwind();
  const isHomeTab = useMemo(() => {
    return !!currentRoute && currentRoute === "(tabs)";
  }, [currentRoute]);
  const isDark = useMemo(() => theme === "dark", [theme]);
  const activeColor = useMemo(() => (isDark || isHomeTab ? colors.white : colors.black), [isDark, isHomeTab]);
  const color = useMemo(() => (isDark || isHomeTab ? colors.neutral[300] : colors.neutral[600]), [isDark, isHomeTab]);

  return {
    isHomeTab,
    currentRoute,
    activeColor,
    color
  };
};
export default useCurrentTab;
