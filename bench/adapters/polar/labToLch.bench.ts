import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { labToLch } from '~/adapters/polar';

const INPUT = new Float32Array([50, 20, 30]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('labToLch()', () => {
  bench('adapters', () => {
    labToLch(INPUT, OUTPUT);
  });
});
