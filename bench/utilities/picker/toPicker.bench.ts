import { bench, describe } from 'vitest';
import { toPicker } from '~/utils/picker';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_GREEN_ALPHA = createMockColor('rgb', [0, 1, 0], 0.5);
const OKLCH_BLACK = createMockColor('oklch', [0, 0, 0]);
const HSL_WHITE = createMockColor('hsl', [0, 0, 100]);

describe('toPicker()', () => {
  bench('picker (to-rgb)', () => {
    toPicker(RGB_RED);
  });

  bench('picker (to-rgb-transparent)', () => {
    toPicker(RGB_GREEN_ALPHA);
  });

  bench('picker (to-from-oklch)', () => {
    toPicker(OKLCH_BLACK);
  });

  bench('picker (to-from-hsl)', () => {
    toPicker(HSL_WHITE);
  });
});
