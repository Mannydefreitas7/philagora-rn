import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from "react-native-svg";
import type { TIconVariant } from "../../molecules";

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
  variant?: TIconVariant;
};

const Profile = ({ color = "#000", size = 24, variant, ...props }: IconProps) => {
  // Use a unique clipPath id to avoid collisions when multiple icons are rendered.
  const clipId = "clip0_profile1";
  const strokeWidth = 2; // Default stroke width for outline variant
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <ClipPath id="clip0_4482_1339">
          <Rect width="24" height="24" fill={color} />
        </ClipPath>
      </Defs>
      {variant === "fill" ? (
        <G clipPath="url(#clip0_4482_1339)">
          <Path
            d="M19.06 4.94C17.25 3.12 14.75 2 12 2C9.25 2 6.75 3.12 4.94 4.94C3.12 6.75 2 9.25 2 12C2 17.5 6.5 22 12 22C14.75 22 17.25 20.88 19.06 19.06C20.88 17.25 22 14.75 22 12C22 9.25 20.88 6.75 19.06 4.94ZM12 6.5C13.46 6.5 14.64 7.69 14.64 9.14C14.64 10.6 13.46 11.79 12 11.79C10.54 11.79 9.36 10.6 9.36 9.14C9.36 7.69 10.54 6.5 12 6.5ZM16.29 17.75C15.88 17.75 15.54 17.41 15.54 17C15.54 15.48 13.95 14.25 12 14.25C10.05 14.25 8.46001 15.48 8.46001 17C8.46001 17.41 8.12001 17.75 7.71001 17.75C7.29001 17.75 6.96001 17.41 6.96001 17C6.96001 14.66 9.22 12.75 12 12.75C14.78 12.75 17.04 14.66 17.04 17C17.04 17.41 16.71 17.75 16.29 17.75Z"
            fill={color}
          />
        </G>
      ) : (
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
      )}
    </Svg>
  );
};

export default React.memo(Profile);
