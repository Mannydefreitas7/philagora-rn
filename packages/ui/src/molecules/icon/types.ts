import type { iconList } from "./data";

export type TIconVariant = "fill" | "outline";
export type TBaseIcon = typeof iconList[keyof typeof iconList];
export type TBaseIconName = keyof typeof iconList;
export type TIconName = TBaseIconName extends `${infer First}Fill` ? Lowercase<First> : Lowercase<TBaseIconName>;
export type TIconProps = {
  name: TBaseIconName;
  size?: number;
  color?: string;
  variant: TIconVariant;
};
