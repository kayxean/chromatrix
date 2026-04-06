import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { hsvToHsl } from '~/adapters/srgb';

const INPUT = new Float32Array([180, 0.66667, 0.75]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-180, -0.66667, -0.75]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('hsvToHsl()', () => {
  bench('adapters (hsv-to-hsl)', () => {
    hsvToHsl(INPUT, OUTPUT);
  });

  bench('adapters (hsv-to-hsl-zeros)', () => {
    hsvToHsl(ZEROS, OUTPUT);
  });

  bench('adapters (hsv-to-hsl-negatives)', () => {
    hsvToHsl(NEGATIVES, OUTPUT);
  });
});
