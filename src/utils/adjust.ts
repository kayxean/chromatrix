import type { Color, Space } from '../lib/types';
import { mutateColor } from '../api/color';

export function lighten(color: Color<Space>, ratio: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[0] += (1 - v[0]) * ratio;
}

export function darken(color: Color<Space>, ratio: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[0] *= 1 - ratio;
}

export function saturate(color: Color<Space>, ratio: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[1] += (0.4 - v[1]) * ratio;
}

export function desaturate(color: Color<Space>, ratio: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[1] *= 1 - ratio;
}

export function whiten(color: Color<Space>, ratio: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[0] += (1 - v[0]) * ratio;
  v[1] *= 1 - ratio;
}

export function blacken(color: Color<Space>, ratio: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  v[0] *= 1 - ratio;
  v[1] *= 1 - ratio;
}

export function rotate(color: Color<Space>, angle: number): void {
  mutateColor(color, 'oklch');
  const v = color.value;
  const h = (v[2] + angle) % 360;
  v[2] = h < 0 ? h + 360 : h;
}

export function invert(color: Color<Space>): void {
  mutateColor(color, 'rgb');
  const v = color.value;
  v[0] = 1 - v[0];
  v[1] = 1 - v[1];
  v[2] = 1 - v[2];
}

export function matchLuminance(source: Color<Space>, target: Color<Space>): void {
  mutateColor(source, 'oklch');
  const l = source.value[0];
  mutateColor(target, 'oklch');
  target.value[0] = l;
}
