import type { ColorArray } from '../types';

const EPSILON = 216 / 24389;
const KAPPA = 24389 / 27;

const WHITE_D50_X = 0.96422;
const WHITE_D50_Z = 0.82521;

const INV_D50_X = 1 / WHITE_D50_X;
const INV_D50_Z = 1 / WHITE_D50_Z;

const KAPPA_INV = 1 / KAPPA;
const KAPPA_INV_116 = 1 / 116;
const KAPPA_DIV_116 = KAPPA / 116;
const ADD_16_DIV_116 = 16 / 116;

export function xyz50ToLab(input: ColorArray, output: ColorArray): void {
  const x = input[0] * INV_D50_X;
  const y = input[1];
  const z = input[2] * INV_D50_Z;

  const fx = x > EPSILON ? Math.cbrt(x) : KAPPA_DIV_116 * x + ADD_16_DIV_116;
  const fy = y > EPSILON ? Math.cbrt(y) : KAPPA_DIV_116 * y + ADD_16_DIV_116;
  const fz = z > EPSILON ? Math.cbrt(z) : KAPPA_DIV_116 * z + ADD_16_DIV_116;

  output[0] = 116 * fy - 16;
  output[1] = 500 * (fx - fy);
  output[2] = 200 * (fy - fz);
}

export function labToXyz50(input: ColorArray, output: ColorArray): void {
  const l = input[0];
  const a = input[1];
  const b = input[2];

  const fy = (l + 16) * KAPPA_INV_116;
  const fx = a * 0.002 + fy;
  const fz = fy - b * 0.005;

  const fx3 = fx * fx * fx;
  const fz3 = fz * fz * fz;

  output[0] = (fx3 > EPSILON ? fx3 : (116 * fx - 16) * KAPPA_INV) * WHITE_D50_X;
  output[1] = l > 8 ? fy * fy * fy : l * KAPPA_INV;
  output[2] = (fz3 > EPSILON ? fz3 : (116 * fz - 16) * KAPPA_INV) * WHITE_D50_Z;
}
