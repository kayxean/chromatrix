import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { checkContrastBulk } from '../../../utils/contrast';

const TEXT_COLOR = createColor('rgb', [1, 1, 1]);
const BG_COLOR = createColor('rgb', [0.13, 0.13, 0.13]);
const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);

describe('checkContrastBulk', () => {
  bench('checkContrastBulk', () => {
    checkContrastBulk(BG_COLOR, [TEXT_COLOR, RED_COLOR, BLUE_COLOR]);
  });
});

dropColor(TEXT_COLOR);
dropColor(BG_COLOR);
dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
