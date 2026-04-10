import type { Color, Space } from '../types';
import { convertColor } from '../convert';
import { createMatrix, dropMatrix } from '../matrix';
import { createScales } from './palette';

const APCA_SCALE = 1.14;
const DARK_THRESH = 0.022;
const DARK_CLAMP = Math.sqrt(DARK_THRESH);

export function getLuminanceD65(color: Color): number {
  const xyz = createMatrix();
  convertColor(color.value, xyz, color.space, 'xyz65');
  const y = xyz[1];
  dropMatrix(xyz);
  return y;
}

function getSapcV(y: number): number {
  const offset = Math.pow(DARK_THRESH, DARK_CLAMP);
  return y > DARK_THRESH ? Math.pow(y, 0.56) : y + Math.pow(DARK_THRESH - y, DARK_CLAMP) - offset;
}

function calculateLc(v_t: number, v_b: number): number {
  const diff = v_b - v_t;
  if (Math.abs(diff) < 0.0001) return 0;
  if (v_b > v_t) {
    return (Math.pow(v_t, 0.57) - Math.pow(v_b, 0.56)) * APCA_SCALE;
  }
  return (Math.pow(v_t, 0.62) - Math.pow(v_b, 0.65)) * APCA_SCALE;
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

export function matchContrast<S extends Space>(
  color: Color<S>,
  background: Color,
  targetContrast: number,
): Color<S> {
  const yb = getLuminanceD65(background);
  const vb = getSapcV(yb);
  const isDarkBg = yb < 0.5;

  const oklchMat = createMatrix();
  convertColor(color.value, oklchMat, color.space, 'oklch');

  const chroma = oklchMat[1];
  const hue = oklchMat[2];

  let low = isDarkBg ? oklchMat[0] : 0;
  let high = isDarkBg ? 1 : oklchMat[0];
  let bestL = oklchMat[0];

  const testMat = createMatrix();
  testMat[1] = chroma;
  testMat[2] = hue;

  const testCol: Color<'oklch'> = { space: 'oklch', value: testMat, alpha: color.alpha };

  for (let i = 0; i < 24; i++) {
    testMat[0] = (low + high) * 0.5;
    const vt = getSapcV(getLuminanceD65(testCol));
    const Lc = calculateLc(vt, vb);

    if (Math.abs(Lc * 100) < targetContrast) {
      if (isDarkBg) low = testMat[0];
      else high = testMat[0];
    } else {
      bestL = testMat[0];
      if (isDarkBg) high = testMat[0];
      else low = testMat[0];
    }
  }

  const resValue = createMatrix();
  testMat[0] = bestL;
  convertColor(testMat, resValue, 'oklch', color.space);

  dropMatrix(oklchMat);
  dropMatrix(testMat);

  return { space: color.space, value: resValue, alpha: color.alpha };
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

export function matchScales<S extends Space>(
  stops: Color<S>[],
  background: Color,
  targetContrast: number,
  steps: number,
): Color<S>[] {
  const scale = createScales(stops, steps);
  return scale.map((s) => matchContrast(s, background, targetContrast));
}
