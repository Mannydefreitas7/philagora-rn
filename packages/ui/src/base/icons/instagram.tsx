import type { FC } from "react";
import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface IconProps extends SvgProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
}

/**
 * Instagram icon converted from SVG to react-native-svg
 *
 * Props:
 * - `color` (default: '#000') — stroke color
 * - `size` (default: 24) — width & height of the icon
 * - `strokeWidth` (default: 1.5) — stroke width applied to stroked paths
 *
 * Any other SvgProps are forwarded to the root <Svg /> element.
 */
const InstagramIcon: FC<IconProps> = ({ color = "#000", size = 24, strokeWidth = 1.5, ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_instagram)">
        <Path
          opacity={0.4}
          d="M7.01023 2H17.0202C19.7802 2 22.0102 4.24 22.0102 7V17.01C22.0102 19.77 19.7702 22 17.0102 22H6.99023C4.23023 22 1.99023 19.76 1.99023 17V7C1.99023 4.23 4.23023 2 6.99023 2H7.00023H7.01023Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.8906 6.54278C17.8906 6.74386 17.7176 6.91621 17.5156 6.88748C17.3137 6.88748 17.1406 6.71513 17.1406 6.51406C17.1406 6.31298 17.3137 6.14062 17.5156 6.14062C17.6022 6.14062 17.7176 6.16935 17.7752 6.25553C17.8329 6.31298 17.8906 6.42788 17.8906 6.51406"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.8398 9.17C16.3998 10.73 16.3998 13.26 14.8398 14.83C13.2798 16.39 10.7398 16.39 9.17977 14.83C7.61977 13.27 7.61977 10.74 9.17977 9.17C10.7398 7.61 13.2798 7.61 14.8398 9.17Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_instagram">
          <Rect width="24" height="24" fill="none" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(InstagramIcon);
