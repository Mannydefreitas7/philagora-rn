import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export interface IconProps extends SvgProps {
  size?: number;
  color?: string;
}

/**
 * Linkedin icon as a React Native SVG component.
 *
 * Usage:
 * <Linkedin size={24} color="#000" />
 */
const Linkedin = ({ size = 24, color = "#000", ...props }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_linkedin)">
        <Path
          d="M2 7.88V7C2 4.24 4.24 2 7 2H17C19.76 2 22 4.24 22 7V17.01C22 19.77 19.76 22 17 22H7C4.24 22 2 19.76 2 17V12"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M7.69043 11V17" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <Path
          d="M11.6904 17V13.5C11.6904 12.12 12.8104 11 14.1904 11C15.5704 11 16.6904 12.12 16.6904 13.5V17"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.94043 7.64896C7.94043 7.78301 7.82505 7.89791 7.69043 7.87876C7.55582 7.87876 7.44043 7.76386 7.44043 7.62981C7.44043 7.49576 7.55582 7.38086 7.69043 7.38086C7.74812 7.38086 7.82505 7.40001 7.86351 7.45746C7.90197 7.49576 7.94043 7.57236 7.94043 7.62981"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_linkedin">
          <Rect width="24" height="24" fill="none" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(Linkedin);
