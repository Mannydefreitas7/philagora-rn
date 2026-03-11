import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from "react-native-svg";
import type { TIconProps } from "../types";

/**
 * TikTok square icon (outlined)
 *
 * This component is a TypeScript React Native SVG component generated from
 * the original SVG. It accepts all `SvgProps` as well as `size` and `color`.
 *
 * Usage:
 * <TikTokSquare2 size={24} color="#000" />
 */
const TikTokSquare2 = ({ size, color = "#000000", width, height, variant, ...props }: TIconProps) => {
  const w = size ?? width ?? 24;
  const h = size ?? height ?? 24;

  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none" {...props}>
      <G>
        {variant === "fill" ? <Path
          d="M16.44 2H7.56C4.49 2 2 4.49 2 7.56V16.44C2 19.51 4.49 22 7.56 22H16.44C19.51 22 22 19.51 22 16.44V7.56C22 4.49 19.51 2 16.44 2ZM16.44 10.53C15.68 10.53 14.99 10.29 14.41 9.88V13.94C14.41 16.04 12.7 17.75 10.6 17.75C8.5 17.75 6.79 16.04 6.79 13.94C6.8 12.15 8.27 10.69 10.05 10.69H10.32C10.73 10.69 11.07 11.03 11.07 11.44C11.07 11.85 10.73 12.19 10.32 12.19H10.05C9.09 12.19 8.3 12.98 8.29 13.95C8.29 15.22 9.33 16.25 10.6 16.25C11.87 16.25 12.91 15.21 12.91 13.94V7.01C12.91 6.59 13.25 6.25 13.66 6.25C14.07 6.25 14.41 6.59 14.41 7C14.41 8.12 15.32 9.03 16.44 9.03C16.85 9.03 17.19 9.37 17.19 9.78C17.19 10.19 16.85 10.53 16.44 10.53Z"
          fill={color}
        /> : <><Path
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
          /></>}
      </G>
    </Svg>
  );
};

export default React.memo(TikTokSquare2);
