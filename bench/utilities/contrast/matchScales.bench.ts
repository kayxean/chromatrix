import { bench, describe } from 'vitest';
import { matchScales } from '~/utils/contrast';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_BLUE = createMockColor('rgb', [0, 0, 1]);
const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);
const RGB_DARK_GRAY = createMockColor('rgb', [0.13, 0.13, 0.13]);

describe('matchScales()', () => {
  bench('contrast (scales-small-step)', () => {
    matchScales([RGB_RED, RGB_WHITE], RGB_DARK_GRAY, 60, 5);
  });

  bench('contrast (scales-multi-stop)', () => {
    matchScales([RGB_BLUE, RGB_RED, RGB_WHITE], RGB_DARK_GRAY, 45, 10);
  });

  bench('contrast (scales-high-resolution)', () => {
    matchScales([RGB_RED, RGB_BLUE], RGB_WHITE, 75, 50);
  });
});
