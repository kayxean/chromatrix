import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { checkContrast } from '../../../utils/contrast';

const TEXT_COLOR = createColor('rgb', [1, 1, 1]);
const BG_COLOR = createColor('rgb', [0.13, 0.13, 0.13]);

describe('checkContrast', () => {
  bench('checkContrast', () => {
    checkContrast(TEXT_COLOR, BG_COLOR);
  });
});

dropColor(TEXT_COLOR);
dropColor(BG_COLOR);
