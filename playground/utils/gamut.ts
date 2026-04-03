import type { Color, ColorSpace } from '../types';

const CLAMP_BOUNDS: Partial<Record<ColorSpace, number[]>> = {
  rgb: [0, 1, 0, 1, 0, 1],
  lrgb: [0, 1, 0, 1, 0, 1],
  hsl: [0, 360, 0, 1, 0, 1],
  hwb: [0, 360, 0, 1, 0, 1],
  hsv: [0, 360, 0, 1, 0, 1],
  lab: [0, 100, -128, 128, -128, 128],
  lch: [0, 100, 0, 150, 0, 360],
  oklab: [0, 1, -0.4, 0.4, -0.4, 0.4],
  oklch: [0, 1, 0, 0.4, 0, 360],
  xyz50: [0, 1, 0, 1, 0, 1],
  xyz65: [0, 1, 0, 1, 0, 1],
};

export function clampColor(color: Color): void {
  const value = color.value;
  const space = color.space;
  const bounds = CLAMP_BOUNDS[space];

  if (!bounds) return;

  for (let i = 0; i < 3; i++) {
    const min = bounds[i * 2];
    const max = bounds[i * 2 + 1];
    let val = value[i];

    if (max === 360) {
      val = val % 360;
      if (val < 0) val += 360;
    } else {
      if (val < min) val = min;
      else if (val > max) val = max;
    }
    value[i] = val;
  }
}

export function checkGamut(color: Color, tolerance = 0.0001): boolean {
  const value = color.value;
  const space = color.space;
  const bounds = CLAMP_BOUNDS[space];

  if (!bounds) return true;

  for (let i = 0; i < 3; i++) {
    const min = bounds[i * 2];
    const max = bounds[i * 2 + 1];

    if (max === 360) continue;

    const val = value[i];
    if (val < min - tolerance || val > max + tolerance) {
      return false;
    }
  }

  return true;
}
