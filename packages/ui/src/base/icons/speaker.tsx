import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from "react-native-svg";

export type IconProps = SvgProps & {
  /**
   * Icon size in pixels (both width and height)
   * Defaults to 24 to match the viewBox scale of 24.
   */
  size?: number;
  /**
   * Stroke / fill color for the icon paths
   */
  color?: string;
  /**
   * Stroke width used for stroked paths
   */
  strokeWidth?: number;
};

/**
 * Speaker icon as a React Native SVG component.
 *
 * Usage:
 * <Speaker size={20} color="#111" />
 */
const Speaker: React.FC<IconProps> = ({ size = 24, color = "#000", strokeWidth = 1.5, ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0)">
        <Path
          d="M12 21.9999V18.6699"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.44043 22H17.5504"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.9999 14.2201C13.839 14.2201 15.3299 12.7292 15.3299 10.8901C15.3299 9.05095 13.839 7.56006 11.9999 7.56006C10.1608 7.56006 8.66992 9.05095 8.66992 10.8901C8.66992 12.7292 10.1608 14.2201 11.9999 14.2201Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.21973 5.33C4.21973 3.49 5.70973 2 7.54973 2H16.4397C18.2797 2 19.7697 3.49 19.7697 5.33V15.33C19.7697 17.17 18.2797 18.66 16.4397 18.66H7.55973C5.71973 18.66 4.22973 17.17 4.22973 15.33V9.05"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      <Defs>
        <ClipPath id="clip0">
          <Rect width="24" height="24" fill="none" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(Speaker);
