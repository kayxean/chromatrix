import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { clampColor } from '../../../utils/gamut';

const WIDE_COLOR = createColor('oklch', [0.9, 0.4, 120]);

describe('clampColor', () => {
  bench('clampColor', () => {
    clampColor(WIDE_COLOR);
  });
});

dropColor(WIDE_COLOR);
