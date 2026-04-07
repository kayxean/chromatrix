import { bench, describe } from 'vitest';
import { checkGamut } from '~/utils/gamut';
import { createMockColor } from '../../factory';

const RGB_GRAY = createMockColor('rgb', [0.5, 0.5, 0.5]);
const RGB_OUT_OF_GAMUT = createMockColor('rgb', [1.1, 0.5, 0.5]);
const OKLCH_OUT_OF_GAMUT = createMockColor('oklch', [0.5, 0.5, 120]);
const OKLCH_WIDE_HUE = createMockColor('oklch', [0.5, 0.2, 400]);

describe('checkGamut()', () => {
  bench('gamut (check-in-gamut-rgb)', () => {
    checkGamut(RGB_GRAY);
  });

  bench('gamut (check-out-gamut-rgb)', () => {
    checkGamut(RGB_OUT_OF_GAMUT);
  });

  bench('gamut (check-out-gamut-oklch)', () => {
    checkGamut(OKLCH_OUT_OF_GAMUT);
  });

  bench('gamut (check-high-tolerance)', () => {
    checkGamut(RGB_OUT_OF_GAMUT, 0.2);
  });

  bench('gamut (check-hue-rotation)', () => {
    checkGamut(OKLCH_WIDE_HUE);
  });
});
