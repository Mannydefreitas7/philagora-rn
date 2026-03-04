/**
 * Design spacing scale used across the application.
 *
 * Each property is a numeric value representing pixels (px). These values
 * provide a consistent set of spacing tokens for margins, paddings, gaps,
 * and other layout-related measurements.
 *
 * Usage examples:
 * - CSS-in-JS (styled-components / emotion): padding: `${SPACING.md}px`;
 * - Inline React style where unitless px is accepted: { margin: SPACING.sm }
 * - Layout math: const total = SPACING.md + SPACING.sm;
 *
 * Keys:
 * - xs: 4   — extra small
 * - sm: 8   — small
 * - md: 16  — medium (base)
 * - lg: 24  — large
 * - xl: 32  — extra large
 * - xxl: 48 — double extra large
 *
 * Note: Values are numbers (not strings). Append "px" when a CSS string value
 * is required.
 */
export const SPACING = {
	xs: 4 /* 4px */,
	sm: 8 /* 8px */,
	base: 12 /* 12px */,
	md: 16 /* 16px */,
	lg: 24 /* 24px */,
	xl: 32 /* 32px */,
	xxl: 48 /* 48px */,
};

export const FONT_SIZE = {
	xs: 12 /* 12px */,
	sm: 14 /* 14px */,
	base: 16 /* 16px */,
	md: 18 /* 18px */,
	lg: 20 /* 20px */,
	xl: 24 /* 24px */,
	xxl: 32 /* 32px */,
};
