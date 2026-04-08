import type { ColorArray } from '../types';

const INV_12_92 = 1 / 12.92;
const INV_1_055 = 1 / 1.055;
const GAMMA_EXP = 2.4;
const GAMMA_COMP = 1 / 2.4;

const RGB_TO_LINEAR_LUT = new Float32Array(1024);
const LINEAR_TO_RGB_LUT = new Float32Array(1024);

for (let i = 0; i < 1024; i++) {
  const c = i / 1023;
  RGB_TO_LINEAR_LUT[i] =
    c <= 0.04045 ? c * INV_12_92 : Math.pow((c + 0.055) * INV_1_055, GAMMA_EXP);

  LINEAR_TO_RGB_LUT[i] = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, GAMMA_COMP) - 0.055;
}

export function rgbToLrgb(input: ColorArray, output: ColorArray): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  output[0] =
    r >= 0 && r <= 1
      ? RGB_TO_LINEAR_LUT[(r * 1023 + 0.5) | 0]
      : r > 0.04045
        ? Math.pow((r + 0.055) * INV_1_055, GAMMA_EXP)
        : r * INV_12_92;

  output[1] =
    g >= 0 && g <= 1
      ? RGB_TO_LINEAR_LUT[(g * 1023 + 0.5) | 0]
      : g > 0.04045
        ? Math.pow((g + 0.055) * INV_1_055, GAMMA_EXP)
        : g * INV_12_92;

  output[2] =
    b >= 0 && b <= 1
      ? RGB_TO_LINEAR_LUT[(b * 1023 + 0.5) | 0]
      : b > 0.04045
        ? Math.pow((b + 0.055) * INV_1_055, GAMMA_EXP)
        : b * INV_12_92;
}

export function lrgbToRgb(input: ColorArray, output: ColorArray): void {
  const lr = input[0];
  const lg = input[1];
  const lb = input[2];

  output[0] =
    lr >= 0 && lr <= 1
      ? LINEAR_TO_RGB_LUT[(lr * 1023 + 0.5) | 0]
      : lr > 0.0031308
        ? 1.055 * Math.pow(Math.abs(lr), GAMMA_COMP) - 0.055
        : lr * 12.92;

  output[1] =
    lg >= 0 && lg <= 1
      ? LINEAR_TO_RGB_LUT[(lg * 1023 + 0.5) | 0]
      : lg > 0.0031308
        ? 1.055 * Math.pow(Math.abs(lg), GAMMA_COMP) - 0.055
        : lg * 12.92;

  output[2] =
    lb >= 0 && lb <= 1
      ? LINEAR_TO_RGB_LUT[(lb * 1023 + 0.5) | 0]
      : lb > 0.0031308
        ? 1.055 * Math.pow(Math.abs(lb), GAMMA_COMP) - 0.055
        : lb * 12.92;
}
