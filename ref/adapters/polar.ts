import type { ColorArray } from '../types';

// Pre-calculate constants
const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

/**
 * Shared logic for Cartesian (L, a, b) to Polar (L, C, H)
 */
function toPolar(input: ColorArray, output: ColorArray): void {
  const a = input[1];
  const b = input[2];

  const chroma = Math.sqrt(a * a + b * b);
  let hue = Math.atan2(b, a) * RAD_TO_DEG;

  if (hue < 0) hue += 360;

  output[0] = input[0]; // Lightness remains unchanged
  output[1] = chroma;
  output[2] = hue;
}

/**
 * Shared logic for Polar (L, C, H) to Cartesian (L, a, b)
 */
function toCartesian(input: ColorArray, output: ColorArray): void {
  const L = input[0];
  const C = input[1];
  const hRad = input[2] * DEG_TO_RAD;

  output[0] = L;
  output[1] = C * Math.cos(hRad);
  output[2] = C * Math.sin(hRad);
}

// Named exports for API clarity
export const labToLch = toPolar;
export const oklabToOklch = toPolar;
export const lchToLab = toCartesian;
export const oklchToOklab = toCartesian;
