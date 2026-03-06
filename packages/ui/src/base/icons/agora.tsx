import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
}

export const Agora = ({ size = 24, color = "#000000" }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <ClipPath id="clip0_4418_3668">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0_4418_3668)">
        <Path
          d="M16.42 7.94923C18.86 10.3892 18.86 14.3492 16.42 16.7892C13.98 19.2292 10.02 19.2292 7.58 16.7892C5.14 14.3492 5.14 10.3892 7.58 7.94923C8.95 6.57923 10.81 5.97924 12.6 6.14924"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.24999 21.6409C6.24999 20.8409 4.49999 19.3909 3.33999 17.3809C2.19999 15.4109 1.81999 13.2209 2.08999 11.1309"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5.8501 4.47937C7.5501 3.14937 9.68009 2.35938 12.0001 2.35938C14.2701 2.35938 16.3601 3.12936 18.0401 4.40936"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.75 21.6409C17.75 20.8409 19.5 19.3909 20.66 17.3809C21.8 15.4109 22.18 13.2209 21.91 11.1309"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default React.memo(Agora);
