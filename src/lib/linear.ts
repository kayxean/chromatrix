import { D50_TO_SRGB, D65_TO_SRGB, SRGB_TO_D50, SRGB_TO_D65, multiplyVector } from './vector';

export function toLin(val: number): number {
  return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
}

export function toRgb(val: number): number {
  return val <= 0.0031308 ? 12.92 * val : 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
}

export function rgbToLrgb(input: Float32Array, output: Float32Array): void {
  output[0] = toLin(input[0]);
  output[1] = toLin(input[1]);
  output[2] = toLin(input[2]);
}

export function lrgbToRgb(input: Float32Array, output: Float32Array): void {
  output[0] = toRgb(input[0]);
  output[1] = toRgb(input[1]);
  output[2] = toRgb(input[2]);
}

export function lrgbToXyz65(input: Float32Array, output: Float32Array): void {
  multiplyVector(SRGB_TO_D65, input, output);
}

export function lrgbToXyz50(input: Float32Array, output: Float32Array): void {
  multiplyVector(SRGB_TO_D50, input, output);
}

export function xyz65ToLrgb(input: Float32Array, output: Float32Array): void {
  multiplyVector(D65_TO_SRGB, input, output);
}

export function xyz50ToLrgb(input: Float32Array, output: Float32Array): void {
  multiplyVector(D50_TO_SRGB, input, output);
}

export function lrgbToHsv(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  const v = Math.max(r, g, b);
  const m = Math.min(r, g, b);
  const c = v - m;

  let h = 0;
  const s = v === 0 ? 0 : c / v;

  if (c > 2e-5) {
    if (v === r) h = (g - b) / c + (g < b ? 6 : 0);
    else if (v === g) h = (b - r) / c + 2;
    else h = (r - g) / c + 4;
    h *= 60;
  }

  output[0] = h;
  output[1] = Math.max(0, Math.min(1, s));
  output[2] = Math.max(0, Math.min(1, v));
}

export function hsvToLrgb(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const s = input[1];
  const v = input[2];

  const h60 = h / 60;
  const c = v * s;
  const x = c * (1 - Math.abs((h60 % 2) - 1));
  const m = v - c;
  const f = ((Math.trunc(h60) % 6) + 6) % 6;

  let r = 0;
  let g = 0;
  let b = 0;

  if (f === 0) {
    r = c;
    g = x;
    b = 0;
  } else if (f === 1) {
    r = x;
    g = c;
    b = 0;
  } else if (f === 2) {
    r = 0;
    g = c;
    b = x;
  } else if (f === 3) {
    r = 0;
    g = x;
    b = c;
  } else if (f === 4) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  output[0] = r + m;
  output[1] = g + m;
  output[2] = b + m;
}
