import type { iconList } from "./data";

export type TKey = keyof typeof iconList;

export type TIconVariant = "fill" | "outline";
export type TBaseIcon = typeof iconList[TKey];
export type TBaseIconName = Exclude<TKey, `${string}Fill`>;

export type TIconProps = {
  name: TBaseIconName;
  size?: number;
  color?: string;
  variant: TIconVariant;
};
