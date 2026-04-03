import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { checkGamut } from '../../../utils/gamut';

const WIDE_COLOR = createColor('oklch', [0.9, 0.4, 120]);

describe('checkGamut', () => {
  bench('checkGamut', () => {
    checkGamut(WIDE_COLOR);
  });
});

dropColor(WIDE_COLOR);
