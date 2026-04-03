import { bench, describe } from 'vitest';
import { lchToLab } from '../../../adapters/polar';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const OKLCH_COLOR = createColor('oklch', [0.6, 0.2, 120]);
const OKLCH_IDX = OKLCH_COLOR.index;

describe('lchToLab', () => {
  bench('lchToLab', () => {
    lchToLab(SHARED_BUFFER, OKLCH_IDX);
  });
});

dropColor(OKLCH_COLOR);
