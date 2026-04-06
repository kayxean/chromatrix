import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { rgbToHsv } from '~/adapters/srgb';

const INPUT = new Float32Array([0.25, 0.5, 0.5]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-0.25, -0.5, -0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('rgbToHsv()', () => {
  bench('adapters (rgb-to-hsv)', () => {
    rgbToHsv(INPUT, OUTPUT);
  });

  bench('adapters (rgb-to-hsv-zeros)', () => {
    rgbToHsv(ZEROS, OUTPUT);
  });

  bench('adapters (rgb-to-hsv-negatives)', () => {
    rgbToHsv(NEGATIVES, OUTPUT);
  });
});
