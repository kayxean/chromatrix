import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { hsvToHsl } from '~/adapters/srgb';

const INPUT = new Float32Array([180, 0.5, 0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('hsvToHsl()', () => {
  bench('adapters', () => {
    hsvToHsl(INPUT, OUTPUT);
  });
});
