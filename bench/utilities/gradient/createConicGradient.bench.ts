import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { createConicGradient } from '~/utils/gradient';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;

describe('createConicGradient()', () => {
  bench('gradient (conic-default-params)', () => {
    createConicGradient({
      stops: [{ color: RGB_RED }, { color: RGB_BLUE }],
    });
  });

  bench('gradient (conic-custom-params)', () => {
    createConicGradient({
      angle: 45,
      position: '50% 50%',
      stops: [
        { color: RGB_RED, position: 0 },
        { color: RGB_BLUE, position: 100 },
      ],
    });
  });

  bench('gradient (conic-multi-stop)', () => {
    createConicGradient({
      stops: [{ color: RGB_RED }, { color: RGB_WHITE }, { color: RGB_BLUE }, { color: RGB_RED }],
    });
  });
});
