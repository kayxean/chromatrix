import { bench, describe } from 'vitest';
import { checkContrastBulk } from '~/utils/contrast';
import { createMockColor } from '../../factory';

const RGB_BLACK = createMockColor('rgb', [0, 0, 0]);
const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);
const RGB_GRAY = createMockColor('rgb', [0.5, 0.5, 0.5]);
const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_BLUE = createMockColor('rgb', [0, 0, 1]);

describe('checkContrastBulk()', () => {
  bench('contrast (bulk)', () => {
    checkContrastBulk(RGB_BLACK, [RGB_WHITE, RGB_GRAY]);
  });

  bench('contrast (bulk-larger-set)', () => {
    checkContrastBulk(RGB_BLACK, [RGB_WHITE, RGB_GRAY, RGB_RED, RGB_BLUE]);
  });

  bench('contrast (bulk-empty)', () => {
    checkContrastBulk(RGB_BLACK, []);
  });
});
