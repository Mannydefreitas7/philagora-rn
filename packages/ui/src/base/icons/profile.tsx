import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from "react-native-svg";

export type IconProps = SvgProps & {
  /**
   * Icon color (applies to stroke)
   * default: black
   */
  color?: string;
  /**
   * Icon size in pixels (width and height)
   * default: 24
   */
  size?: number;
  /**
   * Stroke width
   * default: 1.5
   */
  strokeWidth?: number;
};

/**
 * Profile1 icon converted from SVG to react-native-svg.
 *
 * Usage:
 * <Profile1 color="#000" size={24} />
 */
const Profile = ({ color = "#000", size = 24, strokeWidth = 1.5, ...props }: IconProps) => {
  // Use a unique clipPath id to avoid collisions when multiple icons are rendered.
  const clipId = "clip0_profile1";

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath={`url(#${clipId})`}>
        <Path
          d="M12.0004 11.29C13.1804 11.29 14.1404 10.33 14.1404 9.15C14.1404 7.97 13.1804 7 12.0004 7C10.8204 7 9.86035 7.96 9.86035 9.14C9.86035 10.32 10.8204 11.29 12.0004 11.29Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.29 17C16.29 15.06 14.36 13.5 12 13.5C9.64002 13.5 7.71002 15.06 7.71002 17"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id={clipId}>
          <Rect width="24" height="24" fill="none" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(Profile);
