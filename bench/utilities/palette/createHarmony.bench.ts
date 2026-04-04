import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { createHarmony } from '~/utils/palette';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('createHarmony()', () => {
  bench('palette', () => {
    createHarmony(RED_COLOR, [
      { name: 'analogous', ratios: [-30, 30] },
      { name: 'complementary', ratios: [180] },
    ]);
  });
});
