import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { lrgbToXyz65 } from '~/adapters/d65';

const INPUT = new Float32Array([0.5, 0.5, 0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('lrgbToXyz65()', () => {
  bench('adapters', () => {
    lrgbToXyz65(INPUT, OUTPUT);
  });
});
