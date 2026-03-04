import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from "react-native-svg";

type IconProps = SvgProps & {
  /**
   * Color used to fill the icon. Defaults to `#000`.
   */
  color?: string;
};

export const Agora = ({ width = 24, height, color = "#000000", ...props }: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox={`0 0 24 24`} fill="none" {...props}>
      <G clipPath="url(#clip0_2826_100674)">
        <Path d="M18.5299 4.44C21.6899 7.17 22.8199 11.58 21.3699 15.49C19.9099 19.4 16.1699 22 11.9999 21.99C9.09994 21.99 6.33994 20.73 4.43994 18.53" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
        <Path d="M7.50977 3.05001C9.67977 1.96001 12.2098 1.69002 14.6198 2.35002" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
        <Path d="M2.35998 14.61C1.64998 12.02 2.02 9.29002 3.32 7.02002" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
        <Path d="M18.0702 14.74C19.4002 11.8 18.4402 8.32999 15.7802 6.48999C13.1302 4.65999 9.54021 4.98001 7.26021 7.26001C4.98021 9.54001 4.65019 13.13 6.49019 15.78C8.33019 18.43 11.8002 19.4 14.7402 18.07" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_2826_100674">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
