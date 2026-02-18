import type { Color, ColorSpace, DeficiencyType } from '../types';
import { convertColor } from '../convert';
import { createMatrix, dropMatrix } from '../shared';
import { clampColor } from './gamut';

/**
 * Simulates how a color appears to someone with a specific color vision deficiency.
 * Uses Linear RGB (lrgb) as the simulation space for mathematical accuracy.
 */
export function simulateDeficiency<S extends ColorSpace>(
  color: Color<S>,
  type: DeficiencyType,
): Color<S> {
  const { space, alpha = 1 } = color;

  // 1. Move to Linear RGB (the standard space for CVD simulation matrices)
  const lrgbMat = createMatrix('lrgb');
  convertColor(color.value, lrgbMat, space, 'lrgb');

  const r = lrgbMat[0];
  const g = lrgbMat[1];
  const b = lrgbMat[2];

  // 2. Apply Simulation Matrices (Brettel/Viénot approximation in Linear RGB)
  switch (type) {
    case 'protanopia':
      lrgbMat[0] = 0.56667 * r + 0.43333 * g;
      lrgbMat[1] = 0.55833 * r + 0.44167 * g;
      lrgbMat[2] = 0.0 * r + 0.24167 * g + 0.75833 * b;
      break;
    case 'deuteranopia':
      lrgbMat[0] = 0.625 * r + 0.375 * g;
      lrgbMat[1] = 0.7 * r + 0.3 * g;
      lrgbMat[2] = 0.0 * r + 0.3 * g + 0.7 * b;
      break;
    case 'tritanopia':
      lrgbMat[0] = 0.95 * r + 0.05 * g;
      lrgbMat[1] = 0.0 * r + 0.43333 * g + 0.56667 * b;
      lrgbMat[2] = 0.0 * r + 0.475 * g + 0.525 * b;
      break;
    case 'achromatopsia': {
      // Standard luminance weights for sRGB
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      lrgbMat[0] = lum;
      lrgbMat[1] = lum;
      lrgbMat[2] = lum;
      break;
    }
  }

  // 3. Convert back to original space
  const resValue = createMatrix(space);
  convertColor(lrgbMat, resValue, 'lrgb', space);

  dropMatrix(lrgbMat);

  // 4. Clamp and return (simulations often push colors slightly out of gamut)
  return clampColor({ space, value: resValue, alpha });
}
