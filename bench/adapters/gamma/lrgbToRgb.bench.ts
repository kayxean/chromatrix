import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { lrgbToRgb } from '~/adapters/gamma';

const INPUT = new Float32Array([0.5, 0.5, 0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('lrgbToRgb()', () => {
  bench('adapters', () => {
    lrgbToRgb(INPUT, OUTPUT);
  });
});
