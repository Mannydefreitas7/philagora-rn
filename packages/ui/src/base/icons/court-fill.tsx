import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
}

const CourtFill = ({ size = 24, color = "#000000" }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Defs>
        <ClipPath id="clip0_4482_13092">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0_4482_13092)">
        {/* Top filled shape in the original SVG used an explicit white fill; preserve that */}
        <Path
          d="M22 9.78039H2V7.09039C2 6.69039 2.24 6.33039 2.6 6.17039L11.77 2.17039C12.03 2.06039 12.31 2.06039 12.57 2.17039L21.4 6.02039C21.76 6.18039 22 6.54039 22 6.94039V9.77039V9.78039Z"
          fill="white"
        />

        {/* Vertical stroke lines */}
        <Path
          d="M14.9404 9.78027V18.6703"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19.7803 18.6703V9.78027"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.21973 9.78027V18.6703"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.05957 18.6703V9.78027"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom filled slab (preserve original white fill style) */}
        <Path d="M2 21.9999H22V20.8899L20.89 18.6699H3.11L2 20.8899V21.9999Z" fill="white" />
      </G>
    </Svg>
  );
};

export default React.memo(CourtFill);
