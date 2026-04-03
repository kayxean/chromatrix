import { bench, describe } from 'vitest';
import { hwbToHsv } from '../../../adapters/srgb';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_IDX = RGB_COLOR.index;

describe('hwbToHsv', () => {
  bench('hwbToHsv', () => {
    hwbToHsv(SHARED_BUFFER, RGB_IDX);
  });
});

dropColor(RGB_COLOR);
