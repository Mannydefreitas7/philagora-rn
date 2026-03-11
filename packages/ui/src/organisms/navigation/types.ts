import type { TIconProps } from "../../base/types";

export type THeaderProps = {
  title: string;
  icon: TIconProps;
  index?: number;
  height?: number;
  textColor: "white" | "black";
};
