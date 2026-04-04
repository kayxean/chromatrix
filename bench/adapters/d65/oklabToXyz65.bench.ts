import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { oklabToXyz65 } from '~/adapters/d65';

const INPUT = new Float32Array([0.5, 0.15, 0.1]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('oklabToXyz65()', () => {
  bench('adapters', () => {
    oklabToXyz65(INPUT, OUTPUT);
  });
});
