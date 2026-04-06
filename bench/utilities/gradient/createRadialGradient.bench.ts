import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { createRadialGradient } from '~/utils/gradient';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_BLACK = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('createRadialGradient()', () => {
  bench('gradient (radial-default-params)', () => {
    createRadialGradient({
      stops: [{ color: RGB_BLACK }],
    });
  });

  bench('gradient (radial-custom-shape-pos)', () => {
    createRadialGradient({
      shape: 'circle',
      position: 'top right',
      stops: [
        { color: RGB_RED, position: 0 },
        { color: RGB_BLUE, position: 100 },
      ],
    });
  });

  bench('gradient (radial-multi-stop-no-pos)', () => {
    createRadialGradient({
      stops: [{ color: RGB_RED }, { color: RGB_BLUE }, { color: RGB_BLACK }],
    });
  });
});
