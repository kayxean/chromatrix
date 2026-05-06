import { beforeEach, describe, expect, test } from 'vite-plus/test';
import { createColor, mountMatrix } from '~/api/color';
import { clampCartesian, clampHsv, clampPolar, clampRgb, inGamut, toGamut } from '~/utils/gamut';
import { expectColorCloseTo } from '../factory';

describe('clamp-rgb', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gamut (clamp-rgb-boundaries)', () => {
    const color = createColor('rgb', new Float32Array([1.5, -0.2, 0.5]));
    clampRgb(color);
    expectColorCloseTo(color.value, [1, 0, 0.5]);
  });
});

describe('clamp-hsv', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gamut (clamp-hsv-boundaries)', () => {
    const color = createColor('hsv', new Float32Array([400, 1.2, -0.5]));
    clampHsv(color);
    expectColorCloseTo(color.value, [40, 1, 0]);
  });
});

describe('clamp-cartesian', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gamut (clamp-cartesian-boundaries)', () => {
    const color = createColor('lab', new Float32Array([110, 50, 50]));
    clampCartesian(color);
    expectColorCloseTo(color.value, [1, 50, 50]);
  });
});

describe('clamp-polar', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gamut (clamp-polar-boundaries)', () => {
    const color = createColor('oklch', new Float32Array([-0.1, -0.2, -10]));
    clampPolar(color);
    expectColorCloseTo(color.value, [0, 0, 350]);
  });
});

describe('in-gamut', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gamut (in-gamut-check)', () => {
    const inside = createColor('rgb', new Float32Array([0.5, 0.5, 0.5]));
    const outside = createColor('rgb', new Float32Array([1.1, 0, 0]));
    expect(inGamut(inside)).toBe(true);
    expect(inGamut(outside)).toBe(false);
  });
  test('gamut (in-gamut-epsilon)', () => {
    const barelyOutside = createColor('rgb', new Float32Array([1.00001, 0, 0]));
    expect(inGamut(barelyOutside, 0.0001)).toBe(true);
    expect(inGamut(barelyOutside, 0.000001)).toBe(false);
  });
});

describe('to-gamut', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gamut (to-gamut-mapping)', () => {
    const color = createColor('oklch', new Float32Array([0.7, 0.4, 30]));
    expect(inGamut(color)).toBe(false);
    toGamut(color);
    expect(inGamut(color)).toBe(true);
    expect(color.value[0]).toBeCloseTo(0.7, 2);
    expect(color.value[2]).toBeCloseTo(30, 1);
    expect(color.value[1]).toBeLessThan(0.4);
  });
  test('gamut (to-gamut-noop)', () => {
    const color = createColor('rgb', new Float32Array([0.5, 0.5, 0.5]));
    const originalChroma = color.value[1];
    toGamut(color);
    expect(color.value[1]).toBe(originalChroma);
  });
});
