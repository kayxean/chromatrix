import type { Color, Space } from '../lib/types';
import { cloneColor, dropColor, mutateColor } from '../api/color';

export function clampRgb(color: Color<Space>): void {
  const v = color.value;
  v[0] = Math.max(0, Math.min(1, v[0]));
  v[1] = Math.max(0, Math.min(1, v[1]));
  v[2] = Math.max(0, Math.min(1, v[2]));
}

export function clampHsv(color: Color<Space>): void {
  const v = color.value;
  v[0] = ((v[0] % 360) + 360) % 360;
  v[1] = Math.max(0, Math.min(1, v[1]));
  v[2] = Math.max(0, Math.min(1, v[2]));
}

export function clampCartesian(color: Color<Space>): void {
  const v = color.value;
  const isLab = color.space === 'lab';
  const maxL = isLab ? 100 : 1;
  v[0] = Math.max(0, Math.min(maxL, v[0]));
}

export function clampPolar(color: Color<Space>): void {
  const v = color.value;
  const isLch = color.space === 'lch';
  const maxL = isLch ? 100 : 1;
  v[0] = Math.max(0, Math.min(maxL, v[0]));
  v[1] = Math.max(0, v[1]);
  v[2] = ((v[2] % 360) + 360) % 360;
}

const checkRgb = (v: Float32Array, epsilon: number): boolean => {
  return (
    v[0] >= -epsilon &&
    v[0] <= 1 + epsilon &&
    v[1] >= -epsilon &&
    v[1] <= 1 + epsilon &&
    v[2] >= -epsilon &&
    v[2] <= 1 + epsilon
  );
};

export function inGamut(color: Color<Space>, epsilon = 0.0001): boolean {
  const temp = cloneColor(color);
  mutateColor(temp, 'rgb');

  const safe = checkRgb(temp.value, epsilon);

  dropColor(temp);
  return safe;
}

export function toGamut(color: Color<Space>): void {
  if (inGamut(color)) return;

  mutateColor(color, 'oklch');
  const v = color.value;
  const L = v[0];
  const H = v[2];

  let lo = 0;
  let hi = v[1];

  const tester = cloneColor(color);

  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) * 0.5;

    tester.space = 'oklch';
    tester.value[0] = L;
    tester.value[1] = mid;
    tester.value[2] = H;

    mutateColor(tester, 'rgb');

    if (checkRgb(tester.value, 0.0001)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  v[1] = lo;
  dropColor(tester);
}
