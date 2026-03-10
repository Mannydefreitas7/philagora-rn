import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

import type { TIconProps } from "../types";

/**
 * Profile2 icon (converted from SVG)
 *
 * Usage:
 * <Profile2 size={24} color="#000" />
 */
const Profile2 = ({ size = 24, color = "#000", ...props }: TIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M11.9999 11.29C13.1799 11.29 14.1399 10.33 14.1399 9.15001C14.1399 7.97001 13.1799 7.01001 11.9999 7.01001C10.8199 7.01001 9.85986 7.97001 9.85986 9.15001C9.85986 10.33 10.8199 11.29 11.9999 11.29Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.2899 17C16.2899 15.07 14.36 13.5 12 13.5C9.63995 13.5 7.70996 15.07 7.70996 17"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.81981 8.03C4.35981 4.49 7.8998 2 11.9998 2C17.4998 2 21.9998 6.5 21.9998 12C21.9998 17.5 17.4998 22 11.9998 22C6.8398 22 2.5698 18.05 2.0498 13.02"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default React.memo(Profile2);
