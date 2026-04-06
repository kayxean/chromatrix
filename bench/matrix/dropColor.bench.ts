import { bench, describe } from 'vitest';
import { createColor, dropColor, createMatrix } from '~/matrix';

const RGB_PURPLE = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_RED_ALPHA = createColor('rgb', [1, 0, 0], 0.5);

describe('dropColor()', () => {
  bench('matrix (drop-to-pool)', () => {
    dropColor(RGB_PURPLE);
    createMatrix('rgb');
  });

  bench('matrix (drop-no-mutation)', () => {
    dropColor(RGB_RED_ALPHA);
  });
});
