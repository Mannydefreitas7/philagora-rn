import type { ITab } from "@repo/typings";
import type { TIconProps, TIconVariant } from "~/molecules/icon";

export type TBottomBarProps = {
  children: React.ReactNode;
  color: string;
  activeColor: string;
};

export type TTab = ITab & { icon: TIconProps<TIconVariant> };
