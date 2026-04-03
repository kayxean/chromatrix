import { bench, describe } from 'vitest';
import { labToLch } from '../../../adapters/polar';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const LAB_COLOR = createColor('lab', [50, 20, 30]);
const LAB_IDX = LAB_COLOR.index;

describe('labToLch', () => {
  bench('labToLch', () => {
    labToLch(SHARED_BUFFER, LAB_IDX);
  });
});

dropColor(LAB_COLOR);
