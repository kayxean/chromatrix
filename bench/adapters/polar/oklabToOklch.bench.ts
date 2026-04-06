import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { oklabToOklch } from '~/adapters/polar';

const INPUT = new Float32Array([0.5, 0.15, 0.1]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-0.5, -0.15, -0.1]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('oklabToOklch()', () => {
  bench('adapters (oklab-to-oklch)', () => {
    oklabToOklch(INPUT, OUTPUT);
  });

  bench('adapters (oklab-to-oklch-zeros)', () => {
    oklabToOklch(ZEROS, OUTPUT);
  });

  bench('adapters (oklab-to-oklch-negatives)', () => {
    oklabToOklch(NEGATIVES, OUTPUT);
  });
});
