import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { hslToHsv } from '~/adapters/srgb';

const INPUT = new Float32Array([180, 0.5, 0.5]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-180, -0.5, -0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('hslToHsv()', () => {
  bench('adapters (hsl-to-hsv)', () => {
    hslToHsv(INPUT, OUTPUT);
  });

  bench('adapters (hsl-to-hsv-zeros)', () => {
    hslToHsv(ZEROS, OUTPUT);
  });

  bench('adapters (hsl-to-hsv-negatives)', () => {
    hslToHsv(NEGATIVES, OUTPUT);
  });
});
