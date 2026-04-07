import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { createHarmony } from '~/utils/palette';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const HSL_RED = createMockColor('hsl', [350, 100, 50]);

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
