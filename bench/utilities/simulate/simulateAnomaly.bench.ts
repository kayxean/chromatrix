import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { simulateAnomaly } from '~/utils/simulate';
import { createMockColor } from '../../factory';

const LRGB_RED = createMockColor('lrgb', [1, 0, 0]);

describe('simulateAnomaly()', () => {
  bench('simulate (anomaly-protanopia)', () => {
    const result = simulateAnomaly(LRGB_RED, 'protanopia', 0.5);
    dropColor(result);
  });

  bench('simulate (anomaly-deuteranopia)', () => {
    const result = simulateAnomaly(LRGB_RED, 'deuteranopia', 0.5);
    dropColor(result);
  });

  bench('simulate (anomaly-tritanopia)', () => {
    const result = simulateAnomaly(LRGB_RED, 'tritanopia', 0.5);
    dropColor(result);
  });

  bench('simulate (anomaly-none)', () => {
    const result = simulateAnomaly(LRGB_RED, 'protanopia', 0);
    dropColor(result);
  });

  bench('simulate (anomaly-full)', () => {
    const result = simulateAnomaly(LRGB_RED, 'protanopia', 1);
    dropColor(result);
  });
});
