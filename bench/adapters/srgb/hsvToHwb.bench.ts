import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { hsvToHwb } from '~/adapters/srgb';

const INPUT = new Float32Array([180, 0.5, 0.5]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-180, -0.5, -0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('hsvToHwb()', () => {
  bench('adapters (hsv-to-hwb)', () => {
    hsvToHwb(INPUT, OUTPUT);
  });

  bench('adapters (hsv-to-hwb-zeros)', () => {
    hsvToHwb(ZEROS, OUTPUT);
  });

  bench('adapters (hsv-to-hwb-negatives)', () => {
    hsvToHwb(NEGATIVES, OUTPUT);
  });
});
