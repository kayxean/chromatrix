import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { simulateAmbient } from '~/utils/simulate';
import { createMockColor } from '../../factory';

const LRGB_RED = createMockColor('lrgb', [1, 0, 0]);
const RGB_RED = createMockColor('rgb', [1, 0, 0]);

describe('simulateAmbient()', () => {
  bench('simulate (ambient-default)', () => {
    const result = simulateAmbient(LRGB_RED);
    dropColor(result);
  });

  bench('simulate (ambient-high)', () => {
    const result = simulateAmbient(LRGB_RED, 0.8);
    dropColor(result);
  });

  bench('simulate (ambient-srgb)', () => {
    const result = simulateAmbient(RGB_RED, 0.4);
    dropColor(result);
  });

  bench('simulate (ambient-none)', () => {
    const result = simulateAmbient(LRGB_RED, 0);
    dropColor(result);
  });

  bench('simulate (ambient-washout)', () => {
    const result = simulateAmbient(LRGB_RED, 1);
    dropColor(result);
  });
});
