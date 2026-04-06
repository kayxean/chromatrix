import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { simulateDeficiency } from '~/utils/simulate';

const LRGB_RED = {
  space: 'lrgb',
  value: new Float32Array([1, 0, 0]),
  alpha: 1,
} as Color<'lrgb'>;

const RGB_RED = {
  space: 'rgb',
  value: new Float32Array([1, 0, 0]),
  alpha: 1,
} as Color<'rgb'>;

describe('simulateDeficiency()', () => {
  bench('simulate (protanopia-lrgb)', () => {
    const result = simulateDeficiency(LRGB_RED, 'protanopia');
    dropColor(result);
  });

  bench('simulate (deuteranopia-lrgb)', () => {
    const result = simulateDeficiency(LRGB_RED, 'deuteranopia');
    dropColor(result);
  });

  bench('simulate (tritanopia-lrgb)', () => {
    const result = simulateDeficiency(LRGB_RED, 'tritanopia');
    dropColor(result);
  });

  bench('simulate (achromatopsia-lrgb)', () => {
    const result = simulateDeficiency(LRGB_RED, 'achromatopsia');
    dropColor(result);
  });

  bench('simulate (conversion-overhead-srgb)', () => {
    const result = simulateDeficiency(RGB_RED, 'protanopia');
    dropColor(result);
  });

  bench('simulate (none-passthrough)', () => {
    // @ts-ignore
    const result = simulateDeficiency(LRGB_RED, 'none');
    dropColor(result);
  });
});
