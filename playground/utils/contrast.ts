import type { Color, ColorSpace } from '../types';
import { convertColor } from '../convert';
import { createColor, dropColor, getSharedBuffer } from '../shared';
import { createScales } from './palette';

const APCA_SCALE = 1.14;
const DARK_THRESH = 0.022;
const DARK_CLAMP = 1414 / 1000;
const DARK_CLAMP_POWER = DARK_CLAMP;
const APCA_EXP_DARK = 0.56;
const APCA_EXP_LIGHT = 0.57;
const APCA_EXP_DARK_B = 0.65;
const APCA_EXP_LIGHT_B = 0.62;

function getLuminanceD65(color: Color): number {
  const buf = getSharedBuffer();
  const idx = color.index;

  const temp = createColor(color.space, [buf[idx], buf[idx + 1], buf[idx + 2]]);
  convertColor(temp, 'xyz65');

  const y = buf[temp.index + 1];
  dropColor(temp);

  return y;
}

function getSapcV(y: number): number {
  return y > DARK_THRESH ? y : y + (DARK_THRESH - y) ** DARK_CLAMP_POWER;
}

function calculateLc(v_t: number, v_b: number): number {
  return v_b > v_t
    ? (v_b ** APCA_EXP_DARK - v_t ** APCA_EXP_LIGHT) * APCA_SCALE
    : (v_b ** APCA_EXP_DARK_B - v_t ** APCA_EXP_LIGHT_B) * APCA_SCALE;
}

export function checkContrast(text: Color, background: Color): number {
  const vt = getSapcV(getLuminanceD65(text));
  const vb = getSapcV(getLuminanceD65(background));
  const Lc = calculateLc(vt, vb);

  const res = Math.abs(Lc) < 0.001 ? 0 : Lc * 100;
  return Math.round(res * 100) / 100;
}

export function getContrastRating(contrast: number): string {
  const rate = Math.abs(contrast);
  if (rate >= 90) return 'platinum';
  if (rate >= 75) return 'gold';
  if (rate >= 60) return 'silver';
  if (rate >= 45) return 'bronze';
  if (rate >= 30) return 'ui';
  return 'fail';
}

export function matchContrast<S extends ColorSpace>(
  color: Color<S>,
  background: Color,
  targetContrast: number,
): Color<S> {
  const yb = getLuminanceD65(background);
  const vb = getSapcV(yb);
  const isDarkBg = yb < 0.5;

  const buf = getSharedBuffer();

  const cIdx = color.index;
  const temp = createColor(color.space, [buf[cIdx], buf[cIdx + 1], buf[cIdx + 2]]);
  convertColor(temp, 'oklch');

  const chroma = buf[temp.index + 1];
  const hue = buf[temp.index + 2];

  let low = isDarkBg ? buf[temp.index] : 0;
  let high = isDarkBg ? 1 : buf[temp.index];
  let bestL = buf[temp.index];

  const testCol = createColor('oklch', [0, chroma, hue]);

  const tIdx = testCol.index;

  for (let i = 0; i < 24; i++) {
    buf[tIdx] = (low + high) * 0.5;
    const vt = getSapcV(getLuminanceD65(testCol));
    const Lc = calculateLc(vt, vb);

    if (Math.abs(Lc * 100) < targetContrast) {
      if (isDarkBg) low = buf[tIdx];
      else high = buf[tIdx];
    } else {
      bestL = buf[tIdx];
      if (isDarkBg) high = buf[tIdx];
      else low = buf[tIdx];
    }
  }

  buf[tIdx] = bestL;
  convertColor(testCol, color.space);

  const result = createColor(color.space, [buf[tIdx], buf[tIdx + 1], buf[tIdx + 2]], color.alpha);

  dropColor(temp);
  dropColor(testCol);

  return result;
}

export function checkContrastBulk(
  background: Color,
  colors: Color[],
): { color: Color; contrast: number; rating: string }[] {
  const vb = getSapcV(getLuminanceD65(background));

  return colors.map((color) => {
    const vt = getSapcV(getLuminanceD65(color));
    const Lc = calculateLc(vt, vb);
    const res = Math.abs(Lc) < 0.001 ? 0 : Lc * 100;
    const contrast = Math.round(res * 100) / 100;

    return {
      color,
      contrast,
      rating: getContrastRating(contrast),
    };
  });
}

export function matchScales<S extends ColorSpace>(
  stops: Color<S>[],
  background: Color,
  targetContrast: number,
  steps: number,
): Color<S>[] {
  const scale = createScales(stops, steps);
  const len = scale.length;
  const results: Color<S>[] = [];

  for (let i = 0; i < len; i++) {
    results[i] = matchContrast(scale[i], background, targetContrast);
  }

  return results;
}
