import { bench, describe } from 'vitest';
import { hwbToHsv } from '~/adapters/srgb';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([180, 0.25, 0.5]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-180, -0.25, -0.5]);
const OUTPUT = createMockOutput();

describe('hwbToHsv()', () => {
  bench('adapters (hwb-to-hsv)', () => {
    hwbToHsv(INPUT, OUTPUT);
  });

  bench('adapters (hwb-to-hsv-zeros)', () => {
    hwbToHsv(ZEROS, OUTPUT);
  });

  bench('adapters (hwb-to-hsv-negatives)', () => {
    hwbToHsv(NEGATIVES, OUTPUT);
  });
});
