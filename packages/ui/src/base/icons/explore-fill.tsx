import * as React from "react";
import Svg, { Defs, ClipPath, G, Path, Rect } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
}

export const ExploreFill = ({ size = 24, color = "#000000" }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Defs>
        <ClipPath id="clip0_3186_7807">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0_3186_7807)">
        <Path
          d="M22.38 20.12C22.38 21.36 21.37 22.37 20.13 22.37C18.89 22.37 17.88 21.36 17.88 20.12C17.88 18.88 18.89 17.87 20.13 17.87C21.37 17.87 22.38 18.88 22.38 20.12Z"
          fill="white"
        />
        <Path
          d="M10.63 1.62C5.66 1.62 1.62 5.66 1.62 10.63C1.62 15.6 5.66 19.64 10.63 19.64C15.6 19.64 19.64 15.6 19.64 10.63C19.64 5.66 15.6 1.62 10.63 1.62ZM10.63 12.88H7.63C7.22 12.88 6.88 12.54 6.88 12.13C6.88 11.72 7.22 11.38 7.63 11.38H10.63C11.04 11.38 11.38 11.72 11.38 12.13C11.38 12.54 11.04 12.88 10.63 12.88ZM13.63 9.88H7.63C7.22 9.88 6.88 9.54 6.88 9.13C6.88 8.72 7.22 8.38 7.63 8.38H13.63C14.04 8.38 14.38 8.72 14.38 9.13C14.38 9.54 14.04 9.88 13.63 9.88Z"
          fill="white"
        />
      </G>
    </Svg>
  );
};

export default React.memo(ExploreFill);
