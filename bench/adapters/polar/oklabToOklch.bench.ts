import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { oklabToOklch } from '~/adapters/polar';

const INPUT = new Float32Array([0.5, 0.15, 0.1]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('oklabToOklch()', () => {
  bench('adapters', () => {
    oklabToOklch(INPUT, OUTPUT);
  });
});
