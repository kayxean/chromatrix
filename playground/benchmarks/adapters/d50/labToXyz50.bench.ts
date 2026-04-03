import { bench, describe } from 'vitest';
import { labToXyz50 } from '../../../adapters/d50';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_IDX = RGB_COLOR.index;

describe('labToXyz50', () => {
  bench('labToXyz50', () => {
    labToXyz50(SHARED_BUFFER, RGB_IDX);
  });
});

dropColor(RGB_COLOR);
