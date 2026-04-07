import { bench, describe } from 'vitest';
import { createLinearGradient } from '~/utils/gradient';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_BLUE = createMockColor('rgb', [0, 0, 1]);
const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);
const RGB_BLACK = createMockColor('rgb', [0, 0, 0]);

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
