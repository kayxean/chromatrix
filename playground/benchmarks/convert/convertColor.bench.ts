import { bench, describe } from 'vitest';
import { convertColor } from '../../convert';
import { createColor, dropColor } from '../../shared';

const COLOR_OBJ = createColor('rgb', [1, 0.5, 0]);
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);

describe('convertColor', () => {
  bench('convertColor', () => {
    convertColor(RGB_COLOR, 'oklch');
    convertColor(RGB_COLOR, 'rgb');
  });
});

dropColor(COLOR_OBJ);
dropColor(RGB_COLOR);
