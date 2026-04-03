import { bench, describe } from 'vitest';
import { xyz65ToXyz50 } from '../../../adapters/cat';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_IDX = RGB_COLOR.index;

describe('xyz65ToXyz50', () => {
  bench('xyz65ToXyz50', () => {
    xyz65ToXyz50(SHARED_BUFFER, RGB_IDX);
  });
});

dropColor(RGB_COLOR);
