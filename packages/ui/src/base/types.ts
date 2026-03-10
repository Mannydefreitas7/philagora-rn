import type { SvgProps } from "react-native-svg";
import type { TBaseIconName, TIconVariant } from "../molecules/types";

export type TIconProps = SvgProps & {
  size?: number;
  color?: string;
  variant?: TIconVariant;
  name: TBaseIconName;
};
