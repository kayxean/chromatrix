import { bench, describe } from 'vitest';
import { hsvToHwb } from '~/adapters/srgb';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([180, 0.5, 0.5]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-180, -0.5, -0.5]);
const OUTPUT = createMockOutput();

describe('hsvToHwb()', () => {
  bench('adapters (hsv-to-hwb)', () => {
    hsvToHwb(INPUT, OUTPUT);
  });

  bench('adapters (hsv-to-hwb-zeros)', () => {
    hsvToHwb(ZEROS, OUTPUT);
  });

  bench('adapters (hsv-to-hwb-negatives)', () => {
    hsvToHwb(NEGATIVES, OUTPUT);
  });
});
