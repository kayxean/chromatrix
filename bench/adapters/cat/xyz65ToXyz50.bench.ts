import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { xyz65ToXyz50 } from '~/adapters/cat';

const INPUT = new Float32Array([0.5, 0.5, 0.5]) as ColorArray;
const OUTPUT = new Float32Array() as ColorArray;

describe('xyz65ToXyz50()', () => {
  bench('adapters', () => {
    xyz65ToXyz50(INPUT, OUTPUT);
  });
});
