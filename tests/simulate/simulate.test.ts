import { beforeEach, describe, expect, test } from 'vite-plus/test';
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
  test('simulate (deficiency-protanopia)', () => {
    const color = createColor('rgb', new Float32Array([1, 0, 0]));
    simulateDeficiency(color, 'protanopia');
    expect(color.value[0]).toBeLessThan(1);
    expect(color.value[1]).toBeGreaterThan(0);
  });
  test('simulate (deficiency-deuteranopia)', () => {
    const color = createColor('rgb', new Float32Array([1, 0, 0]));
    simulateDeficiency(color, 'deuteranopia');
    expect(color.value[0]).toBeCloseTo(0.625, 3);
    expect(color.value[1]).toBeCloseTo(0.7, 3);
  });
  test('simulate (deficiency-tritanopia)', () => {
    const color = createColor('rgb', new Float32Array([0, 0, 1]));
    simulateDeficiency(color, 'tritanopia');
    expect(color.value[2]).toBeLessThan(1);
    expect(color.value[1]).toBeGreaterThan(0);
  });
  test('simulate (deficiency-achromatopsia)', () => {
    const color = createColor('rgb', new Float32Array([1, 0.5, 0.2]));
    simulateDeficiency(color, 'achromatopsia');
    expect(color.value[0]).toBeCloseTo(color.value[1], 5);
    expect(color.value[1]).toBeCloseTo(color.value[2], 5);
  });
  test('simulate (deficiency-none-or-zero-severity)', () => {
    const color = createColor('rgb', new Float32Array([1, 1, 1]));
    simulateDeficiency(color, 'none');
    expect(color.value[0]).toBe(1);
    simulateDeficiency(color, 'protanopia', 0);
    expect(color.value[0]).toBe(1);
  });
});

describe('simulate-environmental', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('simulate (ambient)', () => {
    const color = createColor('rgb', new Float32Array([0, 0, 0]));
    simulateAmbient(color, 0.5);
    expect(color.value[0]).toBeCloseTo(0.5, 5);
  });
  test('simulate (sunlight)', () => {
    const color = createColor('rgb', new Float32Array([0.1, 0.1, 0.1]));
    simulateSunlight(color, 0.7);
    expect(color.value[0]).toBeGreaterThan(0.7);
  });
});

describe('simulate-display-modes', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('simulate (night-mode)', () => {
    const color = createColor('rgb', new Float32Array([1, 1, 1]));
    simulateNightMode(color, 1.0);
    expect(color.value[2]).toBeCloseTo(0.2, 5);
  });
  test('simulate (low-light)', () => {
    const color = createColor('rgb', new Float32Array([0.5, 0.5, 0.5]));
    simulateLowLight(color, 0.5);
    expect(color.value[2]).toBeGreaterThan(color.value[0]);
    expect(color.value[0]).toBeLessThan(0.5);
  });
});

describe('simulate-vision-loss', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('simulate (cataract)', () => {
    const color = createColor('rgb', new Float32Array([0, 0, 1]));
    simulateCataract(color, 1.0);
    expect(color.value[2]).toBeLessThan(1);
    expect(color.value[0]).toBeGreaterThan(0);
  });
});
