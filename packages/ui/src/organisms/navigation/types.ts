import type { TIconProps } from "../../molecules/types";

export type THeaderProps = {
  title: string;
  icon: TIconProps;
  index?: number;
  height?: number;
  textColor: "white" | "black";
};
