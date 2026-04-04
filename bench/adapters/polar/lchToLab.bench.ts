import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { lchToLab } from '~/adapters/polar';

const INPUT = new Float32Array([50, 30, 120]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('lchToLab()', () => {
  bench('adapters', () => {
    lchToLab(INPUT, OUTPUT);
  });
});
