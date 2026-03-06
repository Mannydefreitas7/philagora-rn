import type { iconList } from "./data";

export type TIconVariant = "fill" | "outline";
export type TBaseIcon = typeof iconList[keyof typeof iconList];
export type TBaseIconName = keyof typeof iconList;
export type TIconName<V extends TIconVariant> = TBaseIconName extends `${infer First}${Capitalize<V>}` ? Lowercase<First> : Lowercase<TBaseIconName>;
export type TIconProps<T extends TIconVariant> = {
  name: TIconName<T>;
  size?: number;
  color?: string;
  variant: T;
};
