import { bench, describe } from 'vitest';
import { createColor } from '~/matrix';

describe('createColor()', () => {
  bench('matrix (create-color)', () => {
    createColor('rgb', [1, 0.5, 0]);
  });
});
