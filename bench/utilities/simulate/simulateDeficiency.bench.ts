import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { simulateDeficiency } from '~/utils/simulate';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('simulateDeficiency()', () => {
  bench('simulate (protanopia)', () => {
    simulateDeficiency(RED_COLOR, 'protanopia');
  });

  bench('simulate (deuteranopia)', () => {
    simulateDeficiency(RED_COLOR, 'deuteranopia');
  });

  bench('simulate (tritanopia)', () => {
    simulateDeficiency(RED_COLOR, 'tritanopia');
  });

  bench('simulate (achromatopsia)', () => {
    simulateDeficiency(RED_COLOR, 'achromatopsia');
  });
});
