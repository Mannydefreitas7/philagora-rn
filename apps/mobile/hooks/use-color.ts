import { useMemo } from "react";
import { type ColorSchemeName, useColorScheme } from "react-native";
import colors from "tailwindcss/colors";
import { oklabToHex } from "@/utils/convert";

type TUseColorParams<
  C extends S extends "unspecified" ? false : boolean,
  S extends ColorSchemeName = ColorSchemeName,
> = {
  scheme: S;
  condition: C | undefined;
};

export const useColor = (params?: TUseColorParams<boolean>) => {
  const systemScheme = useColorScheme();
  const isDark = useMemo(
    () => (params && params.scheme === "dark" && params.condition) || systemScheme === "dark",
    [systemScheme, params],
  );
  // We determine the active color and the regular color based on the theme and the condition
  const activeColorToken = useMemo(() => (isDark ? colors.cyan[300] : colors.cyan[800]), [isDark]);
  const colorToken = useMemo(() => (isDark ? colors.neutral[600] : colors.neutral[400]), [isDark]);
  // If force is true, we ignore the condition and return the active color
  const activeColor = useMemo(() => oklabToHex(activeColorToken), [activeColorToken]);
  const color = useMemo(() => oklabToHex(colorToken), [colorToken]);
  const tabColor = useMemo<'white' | 'black'>(() => (isDark ? 'white' : 'black'), [isDark]);

  const backgroundColor = useMemo(() => (isDark ? colors.black : colors.white), [isDark]);

  const black = colors.black;
  const white = colors.white;

  return { activeColor, color, tabColor, backgroundColor, systemScheme, black, white };
};
