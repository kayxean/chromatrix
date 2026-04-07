import { bench, describe } from 'vitest';
import { cloneColor } from '~/matrix';
import { createMockColor } from '../factory';

const OKLAB_BLUE = createMockColor('oklab', [0.5, 0.1, 0.1]);
const RGB_RED_ALPHA = createMockColor('rgb', [1, 0, 0], 0.5);
const RGB_RED_OPAQUE = createMockColor('rgb', [1, 0, 0]);

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
