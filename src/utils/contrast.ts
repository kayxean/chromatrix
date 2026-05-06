import { createMatrix, dropMatrix, mutateColor } from '../api/color';
import { convertColor } from '../api/convert';
import type { Color, Space } from '../lib/types';

const APCA_SCALE = 1.14;
const DARK_THRESH = 0.022;
const DARK_CLAMP = 0.148324;

const getSapcV = (y: number): number => {
  if (y > DARK_THRESH) {
    return Math.pow(y, 0.56);
  }
  return y + Math.pow(DARK_THRESH - y, DARK_CLAMP) - 0.027;
};

const calculateLc = (v_t: number, v_b: number): number => {
  const diff = v_b - v_t;
  if (Math.abs(diff) < 0.0001) return 0;

  let result = 0;
  if (v_b > v_t) {
    result = (Math.pow(v_b, 0.56) - Math.pow(v_t, 0.57)) * APCA_SCALE;
  } else {
    result = (Math.pow(v_b, 0.65) - Math.pow(v_t, 0.62)) * APCA_SCALE;
  }

  return Math.abs(result) < 0.075 ? 0 : result;
};

export function getContrast(text: Color<Space>, background: Color<Space>): number {
  mutateColor(text, 'xyz65');
  mutateColor(background, 'xyz65');

  const vt = getSapcV(text.value[1]);
  const vb = getSapcV(background.value[1]);
  const Lc = calculateLc(vt, vb) * 100;

  return Math.abs(Lc) < 0.1 ? 0 : Math.round(Lc * 10) / 10;
}

export function getContrastRating(
  score: number,
): 'platinum' | 'gold' | 'silver' | 'bronze' | 'ui' | 'fail' {
  const s = Math.abs(score);

  if (s >= 90) return 'platinum';
  if (s >= 75) return 'gold';
  if (s >= 60) return 'silver';
  if (s >= 45) return 'bronze';
  if (s >= 30) return 'ui';

  return 'fail';
}

export function getContrastRatio(colorA: Color<Space>, colorB: Color<Space>): number {
  mutateColor(colorA, 'xyz65');
  mutateColor(colorB, 'xyz65');

  const l1 = colorA.value[1];
  const l2 = colorB.value[1];

  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
}

export function isAccessible(
  text: Color<Space>,
  background: Color<Space>,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false,
): boolean {
  const ratio = getContrastRatio(text, background);

  if (level === 'AAA') return isLargeText ? ratio >= 4.5 : ratio >= 7;

  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

export function matchContrast(
  color: Color<Space>,
  background: Color<Space>,
  targetContrast: number,
): void {
  mutateColor(color, 'oklch');
  mutateColor(background, 'xyz65');

  const v = color.value;
  const vb = getSapcV(background.value[1]);
  const isDark = background.value[1] < 0.5;

  let low = 0;
  let high = 1;

  const current = createMatrix();
  const target = createMatrix();
  current[1] = v[1];
  current[2] = v[2];

  for (let i = 0; i < 24; i++) {
    const mid = (low + high) * 0.5;
    current[0] = mid;

    convertColor(current, target, 'oklch', 'xyz65');
    const currentLc = calculateLc(getSapcV(target[1]), vb) * 100;

    if (Math.abs(currentLc) < targetContrast) {
      if (isDark) {
        low = mid;
      } else {
        high = mid;
      }
    } else if (isDark) {
      high = mid;
    } else {
      low = mid;
    }
  }

  v[0] = (low + high) * 0.5;
  dropMatrix(current);
  dropMatrix(target);
}

export function pickContrast(
  background: Color<Space>,
  options: Readonly<Color<Space>[]>,
): Color<Space> {
  mutateColor(background, 'xyz65');
  const vb = getSapcV(background.value[1]);

  let ref = -1;
  let res = options[0];

  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    mutateColor(opt, 'xyz65');
    const vt = getSapcV(opt.value[1]);
    const score = Math.abs(calculateLc(vt, vb));
    if (score > ref) {
      ref = score;
      res = opt;
    }
  }

  return res;
}
