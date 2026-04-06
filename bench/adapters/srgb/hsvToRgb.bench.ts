import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { hsvToRgb } from '~/adapters/srgb';

const INPUT = new Float32Array([180, 0.5, 0.5]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-180, -0.5, -0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('hsvToRgb()', () => {
  bench('adapters (hsv-to-rgb)', () => {
    hsvToRgb(INPUT, OUTPUT);
  });

  bench('adapters (hsv-to-rgb-zeros)', () => {
    hsvToRgb(ZEROS, OUTPUT);
  });

  bench('adapters (hsv-to-rgb-negatives)', () => {
    hsvToRgb(NEGATIVES, OUTPUT);
  });
});
