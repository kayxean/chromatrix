import { bench, describe } from 'vitest';
import { createRadialGradient } from '~/utils/gradient';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_BLUE = createMockColor('rgb', [0, 0, 1]);
const RGB_BLACK = createMockColor('rgb', [0, 0, 0]);

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
