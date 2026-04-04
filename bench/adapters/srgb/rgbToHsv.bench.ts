import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { rgbToHsv } from '~/adapters/srgb';

const INPUT = new Float32Array([0.7, 0.1, 0.9]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('rgbToHsv()', () => {
  bench('adapters', () => {
    rgbToHsv(INPUT, OUTPUT);
  });
});
