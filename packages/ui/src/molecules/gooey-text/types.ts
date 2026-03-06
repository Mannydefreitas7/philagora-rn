import type { AnimatedProp, SkFont, FontStyle } from "@shopify/react-native-skia";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import type { matchFont, SkTextFontStyle, FontWeight } from "@shopify/react-native-skia";

type TFontWeight = TextStyle["fontWeight"];
export type TWeight<
	Param extends Parameters<typeof matchFont>["0"] = Parameters<typeof matchFont>["0"],
	R extends Param extends Required<Param> ? Required<Param> : never = never,
> = Required<R>;

export type FtWeight = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "normal" | "bold";

interface IGooeyText {
	texts: string[];
	index: number;
	readonly morphTime?: number;
	readonly cooldownTime?: number;
	readonly style?: StyleProp<ViewStyle>;
	readonly fontSize?: number;
	readonly color?: string;
	readonly fontSource?: number | string;
	readonly fontFamily?: string;
	readonly fontWeight?: FtWeight;
	readonly width?: number;
	readonly height?: number;
}

interface IGooeyTextItem {
	text: string;
	index: number;
	totalTexts: number;
	masterClock: SharedValue<number>;
	cooldownFraction: number;
	font: AnimatedProp<SkFont>;
	color: string;
	x: number;
	y: number;
}

export type { IGooeyText, IGooeyTextItem };
