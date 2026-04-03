import { bench, describe } from 'vitest';
import { xyz50ToXyz65 } from '../../../adapters/cat';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_IDX = RGB_COLOR.index;

describe('xyz50ToXyz65', () => {
  bench('xyz50ToXyz65', () => {
    xyz50ToXyz65(SHARED_BUFFER, RGB_IDX);
  });
});

dropColor(RGB_COLOR);
