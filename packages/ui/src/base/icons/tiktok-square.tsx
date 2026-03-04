import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export interface IconProps extends SvgProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * TikTok square icon (converted from SVG to react-native-svg)
 *
 * Props:
 *  - size: width & height in pixels (default: 24)
 *  - color: stroke color (default: '#000')
 *  - strokeWidth: stroke width (default: 1.5)
 *
 * The component forwards other SvgProps to the root <Svg /> element.
 */
export const TiktokSquareIcon: React.FC<IconProps> = ({ size = 24, color = "#000", strokeWidth = 1.5, ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Defs>
        <ClipPath id="clip0_tiktok_square">
          <Rect width="24" height="24" fill="none" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0_tiktok_square)">
        <Path
          d="M2 12V16.44C2 19.51 4.49 22 7.56 22H16.44C19.51 22 22 19.51 22 16.44V7.56C22 4.49 19.51 2 16.44 2H7.56C4.49 2 2 4.49 2 7.56V8.39"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.3298 11.44H10.0598C8.6798 11.44 7.5598 12.56 7.5498 13.94C7.5498 15.63 8.9198 17 10.6098 17C12.2998 17 13.6698 15.63 13.6698 13.94V7"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.6699 7C13.6699 8.53 14.9099 9.78 16.4499 9.78"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default React.memo(TiktokSquareIcon);
