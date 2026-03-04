import type { AnimatedProp, SkFont } from "@shopify/react-native-skia";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

type FontWeight = TextStyle["fontWeight"];

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
  readonly fontWeight?: FontWeight;
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
