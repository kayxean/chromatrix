import { bench, describe } from 'vitest';
import { lrgbToRgb } from '../../../adapters/gamma';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_IDX = RGB_COLOR.index;

describe('lrgbToRgb', () => {
  bench('lrgbToRgb', () => {
    lrgbToRgb(SHARED_BUFFER, RGB_IDX);
  });
});

dropColor(RGB_COLOR);
