import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { rgbToLrgb } from '~/adapters/gamma';

const INPUT = new Float32Array([0.7, 0.1, 0.9]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('rgbToLrgb()', () => {
  bench('adapters', () => {
    rgbToLrgb(INPUT, OUTPUT);
  });
});
