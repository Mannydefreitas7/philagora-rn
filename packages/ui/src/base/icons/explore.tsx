import * as React from "react";
import Svg, { Defs, ClipPath, G, Path, Rect } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
}

export const Explore = ({ size = 24, color = "#000000" }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <ClipPath id="clip0_3186_7688">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0_3186_7688)">
        <Path
          d="M11 2C15.97 2 20 6.03 20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 7.5 4 4.46 6.93 2.97"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20.5 19C21.33 19 22 19.67 22 20.5C22 21.33 21.33 22 20.5 22C19.67 22 19 21.33 19 20.5C19 19.67 19.67 19 20.5 19Z"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8 9.5H14"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8 12.5H11"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default React.memo(Explore);
