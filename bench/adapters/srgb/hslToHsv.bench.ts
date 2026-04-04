import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { hslToHsv } from '~/adapters/srgb';

const INPUT = new Float32Array([180, 0.5, 0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('hslToHsv()', () => {
  bench('adapters', () => {
    hslToHsv(INPUT, OUTPUT);
  });
});
