import type { ColorArray, ColorSpace } from '~/types';
import { bench, describe } from 'vitest';
import { convertHue } from '~/convert';
import { createMockArray, createMockOutput } from '../factory';

const SPACES = ['rgb', 'hsl', 'hsv', 'hwb', 'lrgb', 'lab', 'lch', 'oklab', 'oklch'] as const;

const INPUTS: Record<string, ColorArray> = {
  rgb: createMockArray([1, 0, 0]),
  hsl: createMockArray([0, 1, 0.5]),
  hsv: createMockArray([0, 1, 1]),
  hwb: createMockArray([0, 0, 0]),
  lrgb: createMockArray([0.214, 0.214, 0.214]),
  lab: createMockArray([54.2917, 80.8125, 69.8851]),
  lch: createMockArray([50, 30, 120]),
  oklab: createMockArray([0.6279, 0.2248, 0.1258]),
  oklch: createMockArray([0.6, 0.2, 120]),
};

const OUTPUTS = SPACES.reduce(
  (acc, space) => {
    acc[space] = createMockOutput();
    return acc;
  },
  {} as Record<string, ColorArray>,
);

describe('convertHue()', () => {
  for (const space of SPACES) {
    bench(`convert (hue-${space})`, () => {
      convertHue(INPUTS[space], OUTPUTS[space], space as ColorSpace);
    });
  }
});
