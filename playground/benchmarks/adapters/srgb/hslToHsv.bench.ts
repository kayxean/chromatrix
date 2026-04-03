import { bench, describe } from 'vitest';
import { hslToHsv } from '../../../adapters/srgb';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_IDX = RGB_COLOR.index;

describe('hslToHsv', () => {
  bench('hslToHsv', () => {
    hslToHsv(SHARED_BUFFER, RGB_IDX);
  });
});

dropColor(RGB_COLOR);
