import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import type { TIconProps } from "../types";



const Twitch2 = ({ size = 24, color = "#000", strokeWidth = 1.5, id, ...props }: TIconProps) => {
  // Generate a stable-ish unique id per component instance to avoid clipPath collisions.
  const clipId = React.useMemo(() => {
    return id ?? `twitch2_clip_${Math.random().toString(36).slice(2, 9)}`;
  }, [id]);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath={`url(#${clipId})`}>
        {/* left vertical bar */}
        <Path
          d="M16.4307 6.4502V9.7802"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* duplicated line present in original SVG - preserved */}
        <Path
          d="M16.4307 6.4502V9.7802"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* center vertical bar */}
        <Path
          d="M11.9902 6.4502V9.7802"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* main outline with reduced opacity */}
        <Path
          d="M20.5504 13.4502L16.7604 17.2402C16.5504 17.4502 16.2704 17.5702 15.9704 17.5702H11.9904L7.55035 22.0102V17.5702H4.22035C3.61035 17.5702 3.11035 17.0702 3.11035 16.4602V6.90023C3.11035 6.61023 3.23035 6.32023 3.44035 6.11023L7.23035 2.32023C7.44035 2.11023 7.72035 1.99023 8.02035 1.99023H19.7804C20.3904 1.99023 20.8904 2.49023 20.8904 3.10023V12.6602C20.8904 12.9502 20.7704 13.2402 20.5604 13.4502H20.5504Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.4}
          fill="none"
        />
      </G>

      <Defs>
        <ClipPath id={clipId}>
          <Rect width="24" height="24" fill="none" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(Twitch2);
