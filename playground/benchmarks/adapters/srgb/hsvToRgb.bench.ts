import { bench, describe } from 'vitest';
import { hsvToRgb } from '../../../adapters/srgb';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const HSV_COLOR = createColor('hsv', [180, 0.5, 0.8]);
const HSV_IDX = HSV_COLOR.index;

describe('hsvToRgb', () => {
  bench('hsvToRgb', () => {
    hsvToRgb(SHARED_BUFFER, HSV_IDX);
  });
});

dropColor(HSV_COLOR);
