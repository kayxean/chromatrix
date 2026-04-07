import { bench, describe } from 'vitest';
import { hsvToHsl } from '~/adapters/srgb';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([180, 0.66667, 0.75]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-180, -0.66667, -0.75]);
const OUTPUT = createMockOutput();

describe('hsvToHsl()', () => {
  bench('adapters (hsv-to-hsl)', () => {
    hsvToHsl(INPUT, OUTPUT);
  });

  bench('adapters (hsv-to-hsl-zeros)', () => {
    hsvToHsl(ZEROS, OUTPUT);
  });

  bench('adapters (hsv-to-hsl-negatives)', () => {
    hsvToHsl(NEGATIVES, OUTPUT);
  });
});
