import { bench, describe } from 'vitest';
import { xyz50ToLab } from '../../../adapters/d50';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_IDX = RGB_COLOR.index;

describe('xyz50ToLab', () => {
  bench('xyz50ToLab', () => {
    xyz50ToLab(SHARED_BUFFER, RGB_IDX);
  });
});

dropColor(RGB_COLOR);
