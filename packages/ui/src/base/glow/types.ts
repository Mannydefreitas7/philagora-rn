import type { ReactNode } from "react";

/**
 * Animation styles supported by the Glow component.
 */
export type AnimationStyle =
  | "linear"
  | "pulse"
  | "wave"
  | "breathe"
  | "snap"
  | "spinner"
  | "withoutEasing";

/**
 * A single gradient stop used by the glow gradient.
 */
export interface GradientStop {
  readonly offset: string;
  readonly color: string;
  readonly opacity: number;
}

/**
 * Props for the `Glow` component.
 */
export interface GlowProps {
  readonly children: ReactNode;
  readonly size?: number;
  readonly color?: string;
  readonly animated?: boolean;
  readonly secondaryColor?: string;
  readonly duration?: number;
  readonly style?: AnimationStyle;
  readonly radius?: number;
  readonly intensity?: number;
  readonly speed?: number;
  readonly enabled?: boolean;
  readonly gradient?: ReadonlyArray<GradientStop>;
  readonly width?: number;
}

/**
 * Layout information returned from `onLayout`.
 */
export interface Layout {
  readonly width: number;
  readonly height: number;
}
