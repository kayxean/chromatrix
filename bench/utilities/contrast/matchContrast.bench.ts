import { bench, describe } from 'vitest';
import { matchContrast } from '~/utils/contrast';
import { createMockColor } from '../../factory';

const RGB_DARK_RED = createMockColor('rgb', [0.5, 0, 0]);
const RGB_LIGHT_BLUE = createMockColor('rgb', [0.8, 0.8, 1]);
const RGB_BLACK = createMockColor('rgb', [0, 0, 0]);
const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);
const RGB_RED_ALPHA = createMockColor('rgb', [1, 0, 0], 0.5);

describe('matchContrast()', () => {
  bench('contrast (match-lighten-on-black)', () => {
    matchContrast(RGB_DARK_RED, RGB_BLACK, 60);
  });

  bench('contrast (match-darken-on-white)', () => {
    matchContrast(RGB_LIGHT_BLUE, RGB_WHITE, 75);
  });

  bench('contrast (match-with-alpha)', () => {
    matchContrast(RGB_RED_ALPHA, RGB_BLACK, 60);
  });
});
