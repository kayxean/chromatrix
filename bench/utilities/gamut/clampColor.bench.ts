import { bench, describe } from 'vitest';
import { clampColor } from '~/utils/gamut';
import { createMockColor } from '../../factory';

const RGB_IN_GAMUT = createMockColor('rgb', [0.5, 0.2, 0.8]);
const RGB_OUT_OF_GAMUT = createMockColor('rgb', [1.5, -0.2, 0.5]);
const OKLCH_HUE_OVERFLOW = createMockColor('oklch', [0.5, 0.2, 400]);
const OKLCH_HUE_UNDERFLOW = createMockColor('oklch', [0.5, 0.2, -10]);

describe('clampColor()', () => {
  bench('gamut (clamp-in-gamut)', () => {
    clampColor(RGB_IN_GAMUT);
  });

  bench('gamut (clamp-out-gamut-rgb)', () => {
    clampColor(RGB_OUT_OF_GAMUT);
  });

  bench('gamut (clamp-hue-wrapping)', () => {
    clampColor(OKLCH_HUE_OVERFLOW);
    clampColor(OKLCH_HUE_UNDERFLOW);
  });

  bench('gamut (clamp-mutate-true)', () => {
    clampColor(RGB_OUT_OF_GAMUT, true);
  });

  bench('gamut (clamp-mutate-false)', () => {
    clampColor(RGB_OUT_OF_GAMUT, false);
  });
});
