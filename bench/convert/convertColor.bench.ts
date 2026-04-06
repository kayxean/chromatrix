import type { ColorArray, ColorSpace } from '~/types';
import { bench, describe } from 'vitest';
import { convertColor } from '~/convert';

const SPACES = ['rgb', 'hsl', 'hsv', 'hwb', 'lrgb', 'lab', 'lch', 'oklab', 'oklch'] as const;

const INPUTS: Record<string, ColorArray> = {
  rgb: new Float32Array([1, 0, 0]) as ColorArray,
  hsl: new Float32Array([0, 1, 0.5]) as ColorArray,
  hsv: new Float32Array([0, 1, 1]) as ColorArray,
  hwb: new Float32Array([0, 0, 0]) as ColorArray,
  lrgb: new Float32Array([0.214, 0.214, 0.214]) as ColorArray,
  lab: new Float32Array([54.2917, 80.8125, 69.8851]) as ColorArray,
  lch: new Float32Array([54.2917, 106.839, 40.8526]) as ColorArray,
  oklab: new Float32Array([0.6279, 0.2248, 0.1258]) as ColorArray,
  oklch: new Float32Array([0.6279, 0.2576, 29.227]) as ColorArray,
};

const OUTPUTS = SPACES.reduce(
  (acc, space) => {
    acc[space] = new Float32Array(3) as ColorArray;
    return acc;
  },
  {} as Record<string, ColorArray>,
);

describe('convertColor()', () => {
  for (const from of SPACES) {
    for (const to of SPACES) {
      bench(`convert (${from}-to-${to})`, () => {
        convertColor(INPUTS[from], OUTPUTS[to], from as ColorSpace, to as ColorSpace);
      });
    }
  }
});
