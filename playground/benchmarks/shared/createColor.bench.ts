import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../shared';

const COLOR_OBJ = createColor('rgb', [1, 0.5, 0]);

describe('createColor', () => {
  bench('createColor', () => {
    const c = createColor('rgb', COLOR_OBJ.value, COLOR_OBJ.alpha);
    dropColor(c);
  });
});

describe('createColor with alpha', () => {
  bench('createColor with alpha', () => {
    const c = createColor('rgb', [1, 0, 0], 0.5);
    dropColor(c);
  });
});

dropColor(COLOR_OBJ);
