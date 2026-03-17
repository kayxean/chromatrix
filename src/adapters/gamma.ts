import type { ColorArray } from '../types';

const INV_12_92 = 1 / 12.92;
const INV_1_055 = 1 / 1.055;
const GAMMA_EXP = 2.4;
const GAMMA_COMP = 1 / 2.4;

export function rgbToLrgb(input: ColorArray, output: ColorArray): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  output[0] = r <= 0.04045 ? r * INV_12_92 : ((r + 0.055) * INV_1_055) ** GAMMA_EXP;
  output[1] = g <= 0.04045 ? g * INV_12_92 : ((g + 0.055) * INV_1_055) ** GAMMA_EXP;
  output[2] = b <= 0.04045 ? b * INV_12_92 : ((b + 0.055) * INV_1_055) ** GAMMA_EXP;
}

export function lrgbToRgb(input: ColorArray, output: ColorArray): void {
  const lr = input[0];
  const lg = input[1];
  const lb = input[2];

  output[0] =
    lr <= 0.0031308 ? lr * 12.92 : Math.sign(lr) * (1.055 * Math.abs(lr) ** GAMMA_COMP - 0.055);
  output[1] =
    lg <= 0.0031308 ? lg * 12.92 : Math.sign(lg) * (1.055 * Math.abs(lg) ** GAMMA_COMP - 0.055);
  output[2] =
    lb <= 0.0031308 ? lb * 12.92 : Math.sign(lb) * (1.055 * Math.abs(lb) ** GAMMA_COMP - 0.055);
}
