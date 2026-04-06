import { bench, describe } from 'vitest';
import { formatCss } from '~/format';
import { createColor, dropColor } from '~/matrix';

const RGB_ORANGE = createColor('rgb', [1, 0.5, 0]);
const HSL_TEAL = createColor('hsl', [180, 0.5, 0.5]);
const HWB_TEAL = createColor('hwb', [180, 0.5, 0.5]);
const LAB_BLUE = createColor('lab', [50, 20, 30]);
const LCH_BLUE = createColor('lch', [50, 30, 120]);
const OKLAB_BLUE = createColor('oklab', [0.5, 0.15, 0.1]);
const OKLCH_BLUE = createColor('oklch', [0.6, 0.2, 120]);

describe('formatCss()', () => {
  bench('format (hex)', () => {
    formatCss(RGB_ORANGE, true);
  });

  bench('format (rgb)', () => {
    formatCss(RGB_ORANGE);
  });

  bench('format (hsl)', () => {
    formatCss(HSL_TEAL);
  });

  bench('format (hwb)', () => {
    formatCss(HWB_TEAL);
  });

  bench('format (lab)', () => {
    formatCss(LAB_BLUE);
  });

  bench('format (lch)', () => {
    formatCss(LCH_BLUE);
  });

  bench('format (oklab)', () => {
    formatCss(OKLAB_BLUE);
  });

  bench('format (oklch)', () => {
    formatCss(OKLCH_BLUE);
  });
});

dropColor(RGB_ORANGE);
dropColor(HSL_TEAL);
dropColor(HWB_TEAL);
dropColor(LAB_BLUE);
dropColor(LCH_BLUE);
dropColor(OKLAB_BLUE);
dropColor(OKLCH_BLUE);
