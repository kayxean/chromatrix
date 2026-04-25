import type { Color, Space } from '../lib/types';
import { mutateColor } from '../api/color';

export function lighten(color: Color<Space>, amount: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[0] += (1 - v[0]) * amount;
}

export function darken(color: Color<Space>, amount: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[0] *= 1 - amount;
}

export function saturate(color: Color<Space>, amount: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[1] += (0.4 - v[1]) * amount;
}

export function desaturate(color: Color<Space>, amount: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[1] *= 1 - amount;
}

export function whiten(color: Color<Space>, amount: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[0] += (1 - v[0]) * amount;
  v[1] *= 1 - amount;
}

export function blacken(color: Color<Space>, amount: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[0] *= 1 - amount;
  v[1] *= 1 - amount;
}

export function spin(color: Color<Space>, degrees: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  const h = (v[2] + degrees) % 360;
  v[2] = h < 0 ? h + 360 : h;
}

export function invert(color: Color<Space>): void {
  mutateColor(color, 'rgb');
  const v = color.value;
  v[0] = 1 - v[0];
  v[1] = 1 - v[1];
  v[2] = 1 - v[2];
}
