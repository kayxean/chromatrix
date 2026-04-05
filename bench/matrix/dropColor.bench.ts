import { bench, describe } from 'vitest';
import { createColor, dropColor } from '~/matrix';

const COLOR = createColor('rgb', [0.7, 0.1, 0.9]);

describe('dropColor()', () => {
  bench('matrix (drop-color)', () => {
    dropColor(COLOR);
  });
});
