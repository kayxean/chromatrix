import { bench, describe } from 'vitest';
import { rgbToHsv } from '~/adapters/srgb';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([0.25, 0.5, 0.5]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-0.25, -0.5, -0.5]);
const OUTPUT = createMockOutput();

describe('rgbToHsv()', () => {
  bench('adapters (rgb-to-hsv)', () => {
    rgbToHsv(INPUT, OUTPUT);
  });

  bench('adapters (rgb-to-hsv-zeros)', () => {
    rgbToHsv(ZEROS, OUTPUT);
  });

  bench('adapters (rgb-to-hsv-negatives)', () => {
    rgbToHsv(NEGATIVES, OUTPUT);
  });
});
