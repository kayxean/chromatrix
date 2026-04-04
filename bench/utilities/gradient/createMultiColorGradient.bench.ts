import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { createMultiColorGradient } from '~/utils/gradient';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const BLUE_COLOR = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const GREEN_COLOR = { space: 'rgb', value: new Float32Array([0, 1, 0]), alpha: 1 } as Color<'rgb'>;

describe('createMultiColorGradient()', () => {
  bench('gradient', () => {
    createMultiColorGradient([RED_COLOR, BLUE_COLOR, GREEN_COLOR]);
  });
});
