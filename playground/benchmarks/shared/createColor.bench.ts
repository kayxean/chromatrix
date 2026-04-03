import { bench, describe } from 'vitest';
import { createColor, dropColor, getSharedBuffer } from '../../shared';

const buf = getSharedBuffer();
const COLOR_OBJ = createColor('rgb', [1, 0.5, 0]);
const COLOR_VALUES = [buf[COLOR_OBJ.index], buf[COLOR_OBJ.index + 1], buf[COLOR_OBJ.index + 2]];
const COLOR_ALPHA = COLOR_OBJ.alpha;

describe('createColor', () => {
  bench('createColor', () => {
    const c = createColor('rgb', COLOR_VALUES, COLOR_ALPHA);
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
