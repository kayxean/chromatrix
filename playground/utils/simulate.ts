import type { Color, ColorSpace, DeficiencyType } from '../types';
import { convertColor } from '../convert';
import { createColor, dropColor, getSharedBuffer } from '../shared';
import { clampColor } from './gamut';

export function simulateDeficiency<S extends ColorSpace>(
  color: Color<S>,
  type: DeficiencyType,
): Color<S> {
  const { space, alpha, index } = color;
  const buf = getSharedBuffer();

  const temp = createColor('lrgb', [buf[index], buf[index + 1], buf[index + 2]]);
  convertColor(temp, 'lrgb');

  const idx = temp.index;

  const r = buf[idx];
  const g = buf[idx + 1];
  const b = buf[idx + 2];

  switch (type) {
    case 'protanopia':
      buf[idx] = 0.56667 * r + 0.43333 * g;
      buf[idx + 1] = 0.55833 * r + 0.44167 * g;
      buf[idx + 2] = 0.24167 * g + 0.75833 * b;
      break;
    case 'deuteranopia':
      buf[idx] = 0.625 * r + 0.375 * g;
      buf[idx + 1] = 0.7 * r + 0.3 * g;
      buf[idx + 2] = 0.3 * g + 0.7 * b;
      break;
    case 'tritanopia':
      buf[idx] = 0.95 * r + 0.05 * g;
      buf[idx + 1] = 0.43333 * g + 0.56667 * b;
      buf[idx + 2] = 0.475 * g + 0.525 * b;
      break;
    case 'achromatopsia': {
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      buf[idx] = lum;
      buf[idx + 1] = lum;
      buf[idx + 2] = lum;
      break;
    }
  }

  convertColor(temp, space);

  const result = createColor(space, [buf[idx], buf[idx + 1], buf[idx + 2]], alpha);
  clampColor(result);

  dropColor(temp);
  return result;
}
