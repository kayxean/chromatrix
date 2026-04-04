import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { oklchToOklab } from '~/adapters/polar';

const INPUT = new Float32Array([0.6, 0.2, 120]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('oklchToOklab()', () => {
  bench('adapters', () => {
    oklchToOklab(INPUT, OUTPUT);
  });
});
