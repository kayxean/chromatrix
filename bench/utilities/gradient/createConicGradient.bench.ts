import { bench, describe } from 'vitest';
import { createConicGradient } from '~/utils/gradient';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_BLUE = createMockColor('rgb', [0, 0, 1]);
const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);

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
