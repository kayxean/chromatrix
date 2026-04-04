import type { ColorArray, ColorSpace } from '~/types';
import { bench, describe } from 'vitest';
import { convertColor } from '~/convert';

const INPUTS: Partial<Record<ColorSpace, ColorArray>> = {
  rgb: new Float32Array([0.7, 0.1, 0.9]) as ColorArray,
  hsl: new Float32Array([180, 0.5, 0.5]) as ColorArray,
  hwb: new Float32Array([180, 0.5, 0.5]) as ColorArray,
  lab: new Float32Array([50, 20, 30]) as ColorArray,
  lch: new Float32Array([50, 30, 120]) as ColorArray,
  oklab: new Float32Array([0.5, 0.15, 0.1]) as ColorArray,
  oklch: new Float32Array([0.6, 0.2, 120]) as ColorArray,
};

const OUTPUTS: Partial<Record<ColorSpace, ColorArray>> = {
  rgb: new Float32Array(3) as ColorArray,
  hsl: new Float32Array(3) as ColorArray,
  hwb: new Float32Array(3) as ColorArray,
  lab: new Float32Array(3) as ColorArray,
  lch: new Float32Array(3) as ColorArray,
  oklab: new Float32Array(3) as ColorArray,
  oklch: new Float32Array(3) as ColorArray,
};

const SPACES = ['rgb', 'hsl', 'hwb', 'lab', 'lch', 'oklab', 'oklch'] as const;

describe('convertColor()', () => {
  for (const from of SPACES) {
    for (const to of SPACES) {
      if (from === to) continue;
      bench(`convert (${from} -> ${to})`, () => {
        convertColor(INPUTS[from]!, OUTPUTS[to]!, from, to);
      });
    }
  }
});
