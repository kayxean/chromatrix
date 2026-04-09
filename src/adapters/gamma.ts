import type { ColorArray } from '../types';

const INV_12 = 1 / 12.92;
const INV_055 = 1 / 1.055;
const EXP = 2.4;
const INV_EXP = 1 / 2.4;

const TO_LIN = new Float32Array(1024);
const TO_RGB = new Float32Array(1024);

for (let i = 0; i < 1024; i++) {
  const n = i / 1023;
  TO_LIN[i] = n <= 0.04045 ? n * INV_12 : Math.pow((n + 0.055) * INV_055, EXP);
  TO_RGB[i] = n <= 0.0031308 ? n * 12.92 : 1.055 * Math.pow(n, INV_EXP) - 0.055;
}

export function rgbToLrgb(input: ColorArray, output: ColorArray): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  output[0] =
    r >= 0 && r <= 1
      ? TO_LIN[(r * 1023 + 0.5) | 0]
      : r > 0.04045
        ? Math.pow((r + 0.055) * INV_055, EXP)
        : r * INV_12;

  output[1] =
    g >= 0 && g <= 1
      ? TO_LIN[(g * 1023 + 0.5) | 0]
      : g > 0.04045
        ? Math.pow((g + 0.055) * INV_055, EXP)
        : g * INV_12;

  output[2] =
    b >= 0 && b <= 1
      ? TO_LIN[(b * 1023 + 0.5) | 0]
      : b > 0.04045
        ? Math.pow((b + 0.055) * INV_055, EXP)
        : b * INV_12;
}

export function lrgbToRgb(input: ColorArray, output: ColorArray): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  output[0] =
    r >= 0 && r <= 1
      ? TO_RGB[(r * 1023 + 0.5) | 0]
      : r > 0.0031308
        ? 1.055 * Math.pow(Math.abs(r), INV_EXP) - 0.055
        : r * 12.92;

  output[1] =
    g >= 0 && g <= 1
      ? TO_RGB[(g * 1023 + 0.5) | 0]
      : g > 0.0031308
        ? 1.055 * Math.pow(Math.abs(g), INV_EXP) - 0.055
        : g * 12.92;

  output[2] =
    b >= 0 && b <= 1
      ? TO_RGB[(b * 1023 + 0.5) | 0]
      : b > 0.0031308
        ? 1.055 * Math.pow(Math.abs(b), INV_EXP) - 0.055
        : b * 12.92;
}
