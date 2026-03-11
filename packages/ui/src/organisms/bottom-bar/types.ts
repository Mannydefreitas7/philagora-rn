import type { ITab } from "@repo/typings";
import type { TIconProps } from "../../types";

export type TBottomBarProps = {
  children: React.ReactNode;
  color: string;
  activeColor: string;
};

export type TTab = ITab & { icon: TIconProps };
