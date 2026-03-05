import type { icons } from "./data";

export type IconName = keyof typeof icons;
export type IconProps = {
	name: IconName;
	size?: number;
	color?: string;
	animated?: boolean;
	variant: "outline";
};
