import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { xyz50ToLab } from '~/adapters/d50';

const INPUT = new Float32Array([0.5, 0.5, 0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('xyz50ToLab()', () => {
  bench('adapters', () => {
    xyz50ToLab(INPUT, OUTPUT);
  });
});
