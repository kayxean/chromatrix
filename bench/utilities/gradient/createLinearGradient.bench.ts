import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { createLinearGradient } from '~/utils/gradient';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_BLACK = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('createLinearGradient()', () => {
  bench('gradient (linear-default-angle)', () => {
    createLinearGradient({
      stops: [
        { color: RGB_RED, position: 0 },
        { color: RGB_BLUE, position: 100 },
      ],
    });
  });

  bench('gradient (linear-custom-angle)', () => {
    createLinearGradient({
      angle: 90,
      stops: [{ color: RGB_BLACK }],
    });
  });

  bench('gradient (linear-multi-stop-no-pos)', () => {
    createLinearGradient({
      stops: [{ color: RGB_WHITE }, { color: RGB_BLACK }, { color: RGB_RED }, { color: RGB_BLUE }],
    });
  });
});
