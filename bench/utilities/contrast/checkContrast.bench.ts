import { bench, describe } from 'vitest';
import { checkContrast } from '~/utils/contrast';
import { createMockColor } from '../../factory';

const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);
const RGB_BLACK = createMockColor('rgb', [0, 0, 0]);
const RGB_GRAY = createMockColor('rgb', [0.5, 0.5, 0.5]);
const RGB_DARK_GRAY = createMockColor('rgb', [0.13, 0.13, 0.13]);

describe('checkContrast()', () => {
  bench('contrast (white-on-black)', () => {
    checkContrast(RGB_WHITE, RGB_BLACK);
  });

  bench('contrast (black-on-white)', () => {
    checkContrast(RGB_BLACK, RGB_WHITE);
  });

  bench('contrast (identical-colors)', () => {
    checkContrast(RGB_GRAY, RGB_GRAY);
  });

  bench('contrast (text-on-dark-bg)', () => {
    checkContrast(RGB_WHITE, RGB_DARK_GRAY);
  });
});
