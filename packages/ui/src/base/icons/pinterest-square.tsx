import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from "react-native-svg";
import type { TIconProps } from "../types";

/**
 * PinterestSquareIcon
 *
 * Converted from the original SVG to a react-native-svg component.
 *
 * Props:
 * - size: width & height of the icon (default: 24)
 * - color: stroke color (default: '#000')
 * - strokeWidth: stroke width (default: 1.5)
 * - any other SvgProps are forwarded to the root <Svg>
 */
const PinterestSquare = ({
  size = 24,
  color = "#000",
  strokeWidth = 1.5,
  ...props
}: TIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0)">
        <Path
          d="M1.99023 7.72V7C1.99023 4.24 4.23023 2 6.99023 2H17.0002C19.7602 2 22.0002 4.24 22.0002 7V17.01C22.0002 19.77 19.7602 22 17.0002 22H6.99023C4.23023 22 1.99023 19.76 1.99023 17V12"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.65988 11.9799C7.48988 11.5499 7.37988 11.0899 7.37988 10.6099C7.37988 8.30994 9.44988 6.43994 12.0099 6.43994C14.5699 6.43994 16.6399 8.30994 16.6399 10.6099C16.6399 12.9099 14.7699 14.7799 12.4699 14.7799C11.5499 14.7799 10.7099 14.4799 10.0299 13.9699"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.8802 10.1201L9.24023 17.5501"
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

export default React.memo(PinterestSquare);
