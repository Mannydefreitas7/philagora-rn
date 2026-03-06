import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from "react-native-svg";

type IconProps = SvgProps & {
  color?: string;
  size?: number;
};

/**
 * Notion icon as a React Native SVG component.
 *
 * Props:
 * - `color` (optional) — stroke color (defaults to `#000`)
 * - `size` (optional) — width & height in pixels (defaults to 24)
 * - All other `SvgProps` are forwarded to the root <Svg />
 */
const NotionIcon = ({ color = "#000", size = 24, ...props }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0)">
        <Path
          d="M6.43945 7.46973V21.7097"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.22949 4.02979L6.42949 7.46978"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21.9395 6.56006L6.43945 7.47006"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.8496 10.8496V17.9296"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.1397 10.54V17.46C17.1397 17.54 17.0797 17.62 16.9997 17.64C16.9197 17.66 16.8297 17.64 16.7897 17.56L12.4297 10.81"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.4302 10.8101L11.1602 10.8801"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.00977 8.38982V16.1998C2.00977 16.6898 2.16977 17.1598 2.46977 17.5498L4.56977 20.2598C5.46977 21.4298 6.89977 22.0798 8.37977 21.9798L19.9398 21.2198H19.9198C21.0898 21.1498 21.9998 20.1798 21.9998 19.0098V6.96982C21.9998 6.24982 21.6498 5.56982 21.0598 5.14982L17.7498 2.81982C16.9098 2.22982 15.8898 1.94982 14.8698 2.01982L4.06977 2.80982C2.90977 2.89982 2.00977 3.85982 2.00977 5.02982"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.4697 10.58L17.8397 10.5"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.1699 17.9696L12.4299 17.8896"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="24" height="24" fill="none" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(NotionIcon);
