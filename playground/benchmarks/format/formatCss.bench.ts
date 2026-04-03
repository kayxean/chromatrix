import { bench, describe } from 'vitest';
import { formatCss } from '../../format';
import { createColor, dropColor } from '../../shared';

const COLOR_OBJ = createColor('rgb', [1, 0.5, 0]);
const HSL_COLOR = createColor('hsl', [180, 0.5, 0.5]);
const HWB_COLOR = createColor('hwb', [180, 0.5, 0.5]);
const LAB_COLOR = createColor('lab', [50, 20, 30]);
const LCH_COLOR = createColor('lch', [50, 30, 120]);
const OKLAB_COLOR = createColor('oklab', [0.5, 0.15, 0.1]);
const OKLCH_COLOR = createColor('oklch', [0.6, 0.2, 120]);

describe('formatCss', () => {
  bench('formatCss rgb', () => {
    formatCss(COLOR_OBJ);
  });

  bench('formatCss hex', () => {
    formatCss(COLOR_OBJ, true);
  });

  bench('formatCss hsl', () => {
    formatCss(HSL_COLOR);
  });

  bench('formatCss hwb', () => {
    formatCss(HWB_COLOR);
  });

  bench('formatCss lab', () => {
    formatCss(LAB_COLOR);
  });

  bench('formatCss lch', () => {
    formatCss(LCH_COLOR);
  });

  bench('formatCss oklab', () => {
    formatCss(OKLAB_COLOR);
  });

  bench('formatCss oklch', () => {
    formatCss(OKLCH_COLOR);
  });
});

dropColor(COLOR_OBJ);
dropColor(HSL_COLOR);
dropColor(HWB_COLOR);
dropColor(LAB_COLOR);
dropColor(LCH_COLOR);
dropColor(OKLAB_COLOR);
dropColor(OKLCH_COLOR);
