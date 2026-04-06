import { bench, describe } from 'vitest';
import { parseColor } from '~/parse';

describe('parseColor()', () => {
  bench('parse (hex)', () => {
    parseColor('#ff8000');
  });

  bench('parse (rgb)', () => {
    parseColor('rgb(255 128 0)');
  });

  bench('parse (hsl)', () => {
    parseColor('hsl(180deg 50% 50%)');
  });

  bench('parse (hwb)', () => {
    parseColor('hwb(180deg 50% 50%)');
  });

  bench('parse (lab)', () => {
    parseColor('lab(50% 20 30)');
  });

  bench('parse (lch)', () => {
    parseColor('lch(50% 30 120deg)');
  });

  bench('parse (oklab)', () => {
    parseColor('oklab(50% 0.15 0.1)');
  });

  bench('parse (oklch)', () => {
    parseColor('oklch(60% 0.2 120deg)');
  });
});
