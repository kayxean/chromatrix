import { bench, describe } from 'vitest';
import { createColor } from '~/shared';

describe('createColor()', () => {
  bench('matrix', () => {
    createColor('rgb', [1, 0.5, 0]);
  });
});
