import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from "react-native-svg";

export interface IconProps extends SvgProps {
  size?: number;
  color?: string;
}

/**
 * TikTok square icon (outlined)
 *
 * This component is a TypeScript React Native SVG component generated from
 * the original SVG. It accepts all `SvgProps` as well as `size` and `color`.
 *
 * Usage:
 * <TikTokSquare2 size={24} color="#000" />
 */
export const TikTokSquare2: React.FC<IconProps> = ({ size, color = "#000000", width, height, ...props }) => {
  const w = size ?? width ?? 24;
  const h = size ?? height ?? 24;

  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_4482_11537)">
        <Path
          d="M16.44 2H7.56C4.49 2 2 4.49 2 7.56V16.44C2 19.51 4.49 22 7.56 22H16.44C19.51 22 22 19.51 22 16.44V7.56C22 4.49 19.51 2 16.44 2Z"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.3298 11.44H10.0598C8.6798 11.44 7.5598 12.56 7.5498 13.94C7.5498 15.63 8.9198 17 10.6098 17C12.2998 17 13.6698 15.63 13.6698 13.94V7"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.6699 7C13.6699 8.53 14.9099 9.78 16.4499 9.78"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4482_11537">
          <Rect width="24" height="24" fill="none" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(TikTokSquare2);
