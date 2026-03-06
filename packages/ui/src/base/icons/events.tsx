import * as React from "react";
import Svg, { Defs, ClipPath, G, Path, Rect } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
}

export const Events = ({ size = 24, color = "#000000" }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <ClipPath id="clip0_4418_3808">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0_4418_3808)">
        <Path
          d="M7 13H12"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7 17H16"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19 2C17.34 2 16 3.34 16 5C16 6.66 17.34 8 19 8C20.66 8 22 6.66 22 5C22 4.64 21.94 4.3 21.82 3.99"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2 14.97V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14 2H9C4 2 2 4 2 9V11"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default React.memo(Events);
