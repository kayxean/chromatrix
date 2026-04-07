import { bench, describe } from 'vitest';
import { hslToHsv } from '~/adapters/srgb';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([180, 0.5, 0.5]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-180, -0.5, -0.5]);
const OUTPUT = createMockOutput();

describe('hslToHsv()', () => {
  bench('adapters (hsl-to-hsv)', () => {
    hslToHsv(INPUT, OUTPUT);
  });

  bench('adapters (hsl-to-hsv-zeros)', () => {
    hslToHsv(ZEROS, OUTPUT);
  });

  bench('adapters (hsl-to-hsv-negatives)', () => {
    hslToHsv(NEGATIVES, OUTPUT);
  });
});
