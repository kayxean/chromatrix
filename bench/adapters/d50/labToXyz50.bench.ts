import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { labToXyz50 } from '~/adapters/d50';

const INPUT = new Float32Array([50, 20, 30]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('labToXyz50()', () => {
  bench('adapters', () => {
    labToXyz50(INPUT, OUTPUT);
  });
});
