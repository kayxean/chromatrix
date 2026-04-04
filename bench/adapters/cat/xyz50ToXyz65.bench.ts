import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { xyz50ToXyz65 } from '~/adapters/cat';

const INPUT = new Float32Array([0.5, 0.5, 0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('xyz50ToXyz65()', () => {
  bench('adapters', () => {
    xyz50ToXyz65(INPUT, OUTPUT);
  });
});
