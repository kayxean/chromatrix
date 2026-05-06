import { beforeEach, bench, describe } from 'vite-plus/test';
import { createColor, mountMatrix } from '~/api/color';
import {
  simulateAmbient,
  simulateCataract,
  simulateDeficiency,
  simulateLowLight,
  simulateNightMode,
  simulateSunlight,
} from '~/utils/simulate';

describe('simulate-deficiency', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('rgb', new Float32Array([1, 0.5, 0.2]));
  bench('simulate (deficiency-protanopia)', () => {
    simulateDeficiency(color, 'protanopia');
  });
  bench('simulate (deficiency-deuteranopia)', () => {
    simulateDeficiency(color, 'deuteranopia');
  });
  bench('simulate (deficiency-tritanopia)', () => {
    simulateDeficiency(color, 'tritanopia');
  });
  bench('simulate (deficiency-achromatopsia)', () => {
    simulateDeficiency(color, 'achromatopsia');
  });
  bench('simulate (deficiency-none)', () => {
    simulateDeficiency(color, 'none');
  });
});

describe('simulate-environmental', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('rgb', new Float32Array([0.1, 0.1, 0.1]));
  bench('simulate (ambient)', () => {
    simulateAmbient(color, 0.5);
  });
  bench('simulate (sunlight)', () => {
    simulateSunlight(color, 0.7);
  });
});

describe('simulate-display-modes', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('rgb', new Float32Array([1, 1, 1]));
  bench('simulate (night-mode)', () => {
    simulateNightMode(color, 1.0);
  });
  bench('simulate (low-light)', () => {
    simulateLowLight(color, 0.5);
  });
});

describe('simulate-vision-loss', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('rgb', new Float32Array([0, 0, 1]));
  bench('simulate (cataract)', () => {
    simulateCataract(color, 1.0);
  });
});
