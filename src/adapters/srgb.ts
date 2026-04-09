import type { ColorArray } from '../types';

export function rgbToHsv(input: ColorArray, output: ColorArray): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  const v = r > g ? (r > b ? r : b) : g > b ? g : b;
  const m = r < g ? (r < b ? r : b) : g < b ? g : b;
  const c = v - m;

  let h = 0;
  let s = 0;
  if (v !== 0) s = c / v;

  if (c !== 0) {
    const ic = 1 / c;
    if (v === r) h = (g - b) * ic;
    else if (v === g) h = (b - r) * ic + 2;
    else h = (r - g) * ic + 4;

    h *= 60;
    if (h < 0) h += 360;
  }

  output[0] = h;
  output[1] = s;
  output[2] = v;
}

export function hsvToRgb(input: ColorArray, output: ColorArray): void {
  const h = input[0];
  const s = input[1];
  const v = input[2];

  if (s === 0) {
    output[0] = v;
    output[1] = v;
    output[2] = v;
    return;
  }

  const h60 = h / 60;
  const c = v * s;
  const m = v - c;
  const x = c * (1 - Math.abs((h60 % 2) - 1));
  const f = (((h60 | 0) % 6) + 6) % 6;

  let r = 0,
    g = 0,
    b = 0;

  if (f === 0) {
    r = c;
    g = x;
  } else if (f === 1) {
    r = x;
    g = c;
  } else if (f === 2) {
    g = c;
    b = x;
  } else if (f === 3) {
    g = x;
    b = c;
  } else if (f === 4) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  output[0] = r + m;
  output[1] = g + m;
  output[2] = b + m;
}

export function hsvToHsl(input: ColorArray, output: ColorArray): void {
  const h = input[0];
  const s = input[1];
  const v = input[2];

  const l = v * (1 - s * 0.5);
  const sl = l > 0 && l < 1 ? (v - l) / (l < 0.5 ? l : 1 - l) : 0;

  output[0] = h;
  output[1] = sl;
  output[2] = l;
}

export function hslToHsv(input: ColorArray, output: ColorArray): void {
  const h = input[0];
  const s = input[1];
  const l = input[2];

  const v = l + s * (l < 0.5 ? l : 1 - l);
  const sv = v === 0 ? 0 : 2 * (1 - l / v);

  output[0] = h;
  output[1] = sv;
  output[2] = v;
}

export function hsvToHwb(input: ColorArray, output: ColorArray): void {
  const v = input[2];
  output[0] = input[0];
  output[1] = v * (1 - input[1]);
  output[2] = 1 - v;
}

export function hwbToHsv(input: ColorArray, output: ColorArray): void {
  const v = 1 - input[2];
  const s = v <= 0 ? 0 : (v - input[1]) / v;
  output[0] = input[0];
  output[1] = s < 0 ? 0 : s;
  output[2] = v;
}
