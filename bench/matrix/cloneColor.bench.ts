import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { cloneColor } from '~/matrix';

const OKLAB_BLUE = {
  space: 'oklab',
  value: new Float32Array([0.5, 0.1, 0.1]),
  alpha: 1,
} as Color<'oklab'>;
const RGB_RED_ALPHA = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 0.5 } as Color<'rgb'>;
const RGB_RED_OPAQUE = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('cloneColor()', () => {
  bench('matrix (clone-color-oklab)', () => {
    cloneColor(OKLAB_BLUE);
  });

  bench('matrix (clone-color-preserve-alpha)', () => {
    cloneColor(RGB_RED_ALPHA);
  });

  bench('matrix (clone-color-buffer-copy)', () => {
    cloneColor(RGB_RED_OPAQUE);
  });
});
