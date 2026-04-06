import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { createHarmony } from '~/utils/palette';

const RGB_RED = {
  space: 'rgb',
  value: new Float32Array([1, 0, 0]),
  alpha: 1,
} as Color<'rgb'>;

const HSL_RED = {
  space: 'hsl',
  value: new Float32Array([350, 100, 50]),
  alpha: 1,
} as Color<'hsl'>;

const VARIANTS = [
  { name: 'analogous', ratios: [-30, 30] },
  { name: 'triadic', ratios: [120, 240] },
  { name: 'complementary', ratios: [180] },
];

describe('createHarmony()', () => {
  bench('palette (harmony-rgb)', () => {
    const results = createHarmony(RGB_RED, VARIANTS);
    for (const variant of results) {
      for (const color of variant.colors) dropColor(color);
    }
  });

  bench('palette (harmony-hsl-hue-wrapping)', () => {
    const results = createHarmony(HSL_RED, [{ name: 'wrap', ratios: [20, 40, 60] }]);
    for (const variant of results) {
      for (const color of variant.colors) dropColor(color);
    }
  });

  bench('palette (harmony-high-density)', () => {
    const manyRatios = Array.from({ length: 12 }, (_, i) => i * 30);
    const results = createHarmony(RGB_RED, [{ name: 'wheel', ratios: manyRatios }]);
    for (const variant of results) {
      for (const color of variant.colors) dropColor(color);
    }
  });
});
