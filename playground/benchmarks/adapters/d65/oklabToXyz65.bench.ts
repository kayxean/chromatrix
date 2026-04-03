import { bench, describe } from 'vitest';
import { oklabToXyz65 } from '../../../adapters/d65';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_IDX = RGB_COLOR.index;

describe('oklabToXyz65', () => {
  bench('oklabToXyz65', () => {
    oklabToXyz65(SHARED_BUFFER, RGB_IDX);
  });
});

dropColor(RGB_COLOR);
