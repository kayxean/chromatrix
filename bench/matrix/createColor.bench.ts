import { bench, describe } from 'vitest';
import { createColor } from '~/matrix';

describe('createColor()', () => {
  bench('matrix (create-color-values)', () => {
    createColor('rgb', [1, 0.5, 0]);
  });

  bench('matrix (create-color-default-alpha)', () => {
    createColor('rgb', [1, 0, 0]);
  });

  bench('matrix (create-color-custom-alpha)', () => {
    createColor('rgb', [1, 0, 0], 0.5);
  });

  bench('matrix (create-color-pool-allocation)', () => {
    createColor('rgb', [1, 0, 0]);
    createColor('hsl', [180, 0.5, 0.5]);
  });
});
