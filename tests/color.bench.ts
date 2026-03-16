import { bench, describe } from 'vitest';
import { convertColor } from '~/convert';
import { formatCss } from '~/format';
import { parseColor } from '~/parse';
import { createColor, createMatrix, dropColor, dropMatrix, mutateColor } from '~/shared';
import { checkContrast } from '~/utils/contrast';
import { simulateDeficiency } from '~/utils/simulate';

describe('Chromatrix Performance', () => {
  // Setup persistent objects for high-frequency benchmarks
  const rgb = createMatrix('rgb');
  const oklch = createMatrix('oklch');
  const colorObj = createColor('rgb', [1, 0.5, 0]);
  const text = parseColor('#ffffff');
  const bg = parseColor('#222222');

  bench('Matrix Management (create/drop)', () => {
    // Tests the speed of the Float32Array pool
    const m = createMatrix('rgb');
    dropMatrix(m);
  });

  bench('Direct Conversion (RGB -> OKLCH)', () => {
    // Tests the Hub & Bridge architecture (RGB -> LRGB -> XYZ65 -> Oklab -> Oklch)
    convertColor(rgb, oklch, 'rgb', 'oklch');
  });

  bench('In-place Mutation (mutateColor)', () => {
    // Tests conversion without re-allocation
    mutateColor(colorObj, 'hsl');
    mutateColor(colorObj, 'rgb');
  });

  bench('CSS Parsing (parseColor)', () => {
    // Tests regex and string processing speed
    parseColor('oklch(60% 0.15 30 / 0.5)');
  });

  bench('CSS Formatting (formatCss)', () => {
    // Tests string assembly and math rounding
    formatCss(colorObj);
  });

  bench('Accessibility (APCA Contrast)', () => {
    // Tests the complex signed Lc calculation
    checkContrast(text, bg);
  });

  bench('Vision Simulation (simulateDeficiency)', () => {
    // Tests projection into reduced color spaces
    simulateDeficiency(colorObj, 'deuteranopia');
  });

  // Cleanup
  dropMatrix(rgb);
  dropMatrix(oklch);
  dropColor(colorObj);
  dropColor(text);
  dropColor(bg);
});
