import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { hwbToHsv } from '~/adapters/srgb';

const INPUT = new Float32Array([180, 0.25, 0.5]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-180, -0.25, -0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('hwbToHsv()', () => {
  bench('adapters (hwb-to-hsv)', () => {
    hwbToHsv(INPUT, OUTPUT);
  });

  bench('adapters (hwb-to-hsv-zeros)', () => {
    hwbToHsv(ZEROS, OUTPUT);
  });

  bench('adapters (hwb-to-hsv-negatives)', () => {
    hwbToHsv(NEGATIVES, OUTPUT);
  });
});
