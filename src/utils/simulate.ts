import { mutateColor } from '../api/color';
import type { Color, Space } from '../lib/types';

export type DeficiencyType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export function simulateDeficiency(
  color: Color<Space>,
  type: DeficiencyType | 'none',
  severity: number = 1,
): void {
  if (type === 'none' || severity <= 0) return;
  mutateColor(color, 'lrgb');

  const v = color.value;
  const r = v[0];
  const g = v[1];
  const b = v[2];
  let nr = r;
  let ng = g;
  let nb = b;

  switch (type) {
    case 'protanopia': {
      nr = 0.56667 * r + 0.43333 * g;
      ng = 0.55833 * r + 0.44167 * g;
      nb = 0.24167 * g + 0.75833 * b;
      break;
    }
    case 'deuteranopia': {
      nr = 0.625 * r + 0.375 * g;
      ng = 0.7 * r + 0.3 * g;
      nb = 0.3 * g + 0.7 * b;
      break;
    }
    case 'tritanopia': {
      nr = 0.95 * r + 0.05 * g;
      ng = 0.43333 * g + 0.56667 * b;
      nb = 0.475 * g + 0.525 * b;
      break;
    }
    case 'achromatopsia': {
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      nr = lum;
      ng = lum;
      nb = lum;
      break;
    }
  }

  v[0] = r + (nr - r) * severity;
  v[1] = g + (ng - g) * severity;
  v[2] = b + (nb - b) * severity;
}

export function simulateAmbient(color: Color<Space>, intensity: number = 0.4): void {
  mutateColor(color, 'lrgb');
  const v = color.value;
  const factor = 1 - intensity;
  v[0] = v[0] * factor + intensity;
  v[1] = v[1] * factor + intensity;
  v[2] = v[2] * factor + intensity;
}

export function simulateNightMode(color: Color<Space>, intensity: number = 0.5): void {
  mutateColor(color, 'lrgb');
  const v = color.value;
  v[1] *= 1 - intensity * 0.2;
  v[2] *= 1 - intensity * 0.8;
}

export function simulateLowLight(color: Color<Space>, darkness: number = 0.5): void {
  mutateColor(color, 'lrgb');
  const v = color.value;
  const lum = 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  v[0] = v[0] * (1 - darkness * 0.8) + lum * (darkness * 0.8);
  v[1] = v[1] * (1 - darkness * 0.2) + lum * (darkness * 0.2);
  v[2] = v[2] * (1 + darkness * 0.3) + lum * (darkness * 0.3);
}

export function simulateCataract(color: Color<Space>, severity: number = 0.5): void {
  mutateColor(color, 'lrgb');
  const v = color.value;
  v[2] *= 1 - severity * 0.6;
  const fog = severity * 0.3;
  v[0] = v[0] * (1 - fog) + fog;
  v[1] = v[1] * (1 - fog) + fog;
  v[2] = v[2] * (1 - fog) + fog;
}

export function simulateSunlight(color: Color<Space>, intensity: number = 0.7): void {
  mutateColor(color, 'lrgb');
  const v = color.value;
  v[0] = v[0] * (1 - intensity) + intensity;
  v[1] = v[1] * (1 - intensity) + intensity;
  v[2] = v[2] * (1 - intensity) + intensity;
}
