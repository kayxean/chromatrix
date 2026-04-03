import { bench, describe } from 'vitest';
import { oklchToOklab } from '../../../adapters/polar';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const OKLCH_COLOR = createColor('oklch', [0.6, 0.2, 120]);
const OKLCH_IDX = OKLCH_COLOR.index;

describe('oklchToOklab', () => {
  bench('oklchToOklab', () => {
    oklchToOklab(SHARED_BUFFER, OKLCH_IDX);
  });
});

dropColor(OKLCH_COLOR);
