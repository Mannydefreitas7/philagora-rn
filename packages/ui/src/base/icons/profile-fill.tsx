import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
}

const ProfileFill = ({ size = 24, color = "#000000" }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <ClipPath id="clip0_4482_1339">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0_4482_1339)">
        <Path
          d="M19.06 4.94C17.25 3.12 14.75 2 12 2C9.25 2 6.75 3.12 4.94 4.94C3.12 6.75 2 9.25 2 12C2 17.5 6.5 22 12 22C14.75 22 17.25 20.88 19.06 19.06C20.88 17.25 22 14.75 22 12C22 9.25 20.88 6.75 19.06 4.94ZM12 6.5C13.46 6.5 14.64 7.69 14.64 9.14C14.64 10.6 13.46 11.79 12 11.79C10.54 11.79 9.36 10.6 9.36 9.14C9.36 7.69 10.54 6.5 12 6.5ZM16.29 17.75C15.88 17.75 15.54 17.41 15.54 17C15.54 15.48 13.95 14.25 12 14.25C10.05 14.25 8.46001 15.48 8.46001 17C8.46001 17.41 8.12001 17.75 7.71001 17.75C7.29001 17.75 6.96001 17.41 6.96001 17C6.96001 14.66 9.22 12.75 12 12.75C14.78 12.75 17.04 14.66 17.04 17C17.04 17.41 16.71 17.75 16.29 17.75Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default React.memo(ProfileFill);
