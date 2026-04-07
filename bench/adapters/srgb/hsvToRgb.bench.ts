import { bench, describe } from 'vitest';
import { hsvToRgb } from '~/adapters/srgb';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([180, 0.5, 0.5]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-180, -0.5, -0.5]);
const OUTPUT = createMockOutput();

describe('hsvToRgb()', () => {
  bench('adapters (hsv-to-rgb)', () => {
    hsvToRgb(INPUT, OUTPUT);
  });

  bench('adapters (hsv-to-rgb-zeros)', () => {
    hsvToRgb(ZEROS, OUTPUT);
  });

  bench('adapters (hsv-to-rgb-negatives)', () => {
    hsvToRgb(NEGATIVES, OUTPUT);
  });
});
