import type { TIconProps } from "../../molecules/icon";

export type THeaderProps = {
  title: string;
  icon: TIconProps;
  index?: number;
  height?: number;
  textColor: "white" | "black";
};
