const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const linearToSrgb = (channel: number): number => {
  if (channel <= 0.0031308) {
    return 12.92 * channel;
  }
  return 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
};

const channelToHex = (channel: number): string =>
  Math.round(clamp01(channel) * 255)
    .toString(16)
    .padStart(2, "0");

// Converts an Oklab color to an sRGB color (0-1 per channel)
export const oklabToRgb = (oklab: [number, number, number]): [number, number, number] => {
  const [l, a, b] = oklab;

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const rLinear = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const gLinear = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bLinear = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  return [clamp01(linearToSrgb(rLinear)), clamp01(linearToSrgb(gLinear)), clamp01(linearToSrgb(bLinear))];
};

// Converts an sRGB color (0-1 per channel) to a hex color
export const rgbToHex = (rgb: [number, number, number]): string => {
  const [r, g, b] = rgb;
  return `#${channelToHex(r)}${channelToHex(g)}${channelToHex(b)}`;
};

// Converts an Oklab color to a hex color
export const oklabToHex = (oklab: [number, number, number] | string): string => {
  if (typeof oklab === "string") {
    const match = oklab
      .trim()
      .match(/^oklch\(\s*([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)(?:\s*\/\s*[^\)]+)?\s*\)$/i);

    if (!match) {
      return oklab;
    }

    const lo = Number.parseFloat(match[1]) / 100;
    const chroma = Number.parseFloat(match[2]);
    const hueRad = (Number.parseFloat(match[3]) * Math.PI) / 180;
    const ao = chroma * Math.cos(hueRad);
    const bo = chroma * Math.sin(hueRad);
    const [r, g, b] = oklabToRgb([lo, ao, bo]);
    return rgbToHex([r, g, b]);
  }

  return rgbToHex(oklab);
};
