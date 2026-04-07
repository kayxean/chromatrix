import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { simulateDeficiency } from '~/utils/simulate';
import { createMockColor } from '../../factory';

const LRGB_RED = createMockColor('lrgb', [1, 0, 0]);
const RGB_RED = createMockColor('rgb', [1, 0, 0]);

describe('simulateDeficiency()', () => {
  bench('simulate (deficiency-protanopia)', () => {
    const result = simulateDeficiency(LRGB_RED, 'protanopia');
    dropColor(result);
  });

  bench('simulate (deficiency-deuteranopia)', () => {
    const result = simulateDeficiency(LRGB_RED, 'deuteranopia');
    dropColor(result);
  });

  bench('simulate (deficiency-tritanopia)', () => {
    const result = simulateDeficiency(LRGB_RED, 'tritanopia');
    dropColor(result);
  });

  bench('simulate (deficiency-achromatopsia)', () => {
    const result = simulateDeficiency(LRGB_RED, 'achromatopsia');
    dropColor(result);
  });

  bench('simulate (deficiency-srgb)', () => {
    const result = simulateDeficiency(RGB_RED, 'protanopia');
    dropColor(result);
  });

  bench('simulate (deficiency-none)', () => {
    // @ts-ignore
    const result = simulateDeficiency(LRGB_RED, 'none');
    dropColor(result);
  });
});
