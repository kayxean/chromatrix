import type { Color, ColorSpace } from '../types';
import { convertColor } from '../convert';
import { createMatrix, dropMatrix } from '../matrix';

export type DeficiencyType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export function simulateDeficiency<S extends ColorSpace>(
  color: Color<S>,
  type: DeficiencyType | 'none',
): Color<S> {
  const { space, alpha = 1 } = color;

  if (!type || type === 'none') {
    const copy = createMatrix(space);
    copy.set(color.value);
    return { space, value: copy, alpha };
  }

  const lrgbMat = createMatrix('lrgb');
  const resValue = createMatrix(space);

  try {
    convertColor(color.value, lrgbMat, space, 'lrgb');

    const r = lrgbMat[0];
    const g = lrgbMat[1];
    const b = lrgbMat[2];

    switch (type) {
      case 'protanopia':
        lrgbMat[0] = 0.56667 * r + 0.43333 * g;
        lrgbMat[1] = 0.55833 * r + 0.44167 * g;
        lrgbMat[2] = 0.24167 * g + 0.75833 * b;
        break;
      case 'deuteranopia':
        lrgbMat[0] = 0.625 * r + 0.375 * g;
        lrgbMat[1] = 0.7 * r + 0.3 * g;
        lrgbMat[2] = 0.3 * g + 0.7 * b;
        break;
      case 'tritanopia':
        lrgbMat[0] = 0.95 * r + 0.05 * g;
        lrgbMat[1] = 0.43333 * g + 0.56667 * b;
        lrgbMat[2] = 0.475 * g + 0.525 * b;
        break;
      case 'achromatopsia': {
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        lrgbMat[0] = lum;
        lrgbMat[1] = lum;
        lrgbMat[2] = lum;
        break;
      }
    }

    convertColor(lrgbMat, resValue, 'lrgb', space);
  } finally {
    dropMatrix(lrgbMat);
  }

  return { space, value: resValue, alpha };
}

export function simulateAnomaly<S extends ColorSpace>(
  color: Color<S>,
  type: Exclude<DeficiencyType, 'achromatopsia'>,
  severity: number = 0.5,
): Color<S> {
  const { space, alpha = 1 } = color;
  const original = createMatrix(space);
  original.set(color.value);

  const deficiency = simulateDeficiency(color, type);
  const resValue = createMatrix(space);

  try {
    for (let i = 0; i < 3; i++) {
      resValue[i] = original[i] * (1 - severity) + deficiency.value[i] * severity;
    }
  } finally {
    dropMatrix(original);
    dropMatrix(deficiency.value);
  }

  return { space, value: resValue, alpha };
}

export function simulateAmbient<S extends ColorSpace>(
  color: Color<S>,
  glareIntensity: number = 0.4,
): Color<S> {
  const { space, alpha = 1 } = color;
  const lrgbMat = createMatrix('lrgb');
  const resValue = createMatrix(space);

  try {
    convertColor(color.value, lrgbMat, space, 'lrgb');

    const r = lrgbMat[0];
    const g = lrgbMat[1];
    const b = lrgbMat[2];

    lrgbMat[0] = r * (1 - glareIntensity) + glareIntensity;
    lrgbMat[1] = g * (1 - glareIntensity) + glareIntensity;
    lrgbMat[2] = b * (1 - glareIntensity) + glareIntensity;

    convertColor(lrgbMat, resValue, 'lrgb', space);
  } finally {
    dropMatrix(lrgbMat);
  }
  return { space, value: resValue, alpha };
}
