import { beforeEach, describe, expect, test } from 'vite-plus/test';
import { createColor, mountMatrix } from '~/api/color';
import {
  createHarmony,
  createScales,
  createShades,
  createTints,
  createTonal,
  mixColor,
  mixSubtractive,
} from '~/utils/palette';
import { expectColorCloseTo } from '../factory';

describe('mix-color', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('palette (mix-color-shortest-hue)', () => {
    const colorA = createColor('oklch', new Float32Array([0.5, 0.1, 30]));
    const colorB = createColor('oklch', new Float32Array([0.5, 0.1, 330]));
    mixColor(colorA, colorB, 0.5);
    expect(colorA.value[2]).toBeCloseTo(0, 0);
  });
  test('palette (mix-color-alpha)', () => {
    const colorA = createColor('rgb', new Float32Array([1, 1, 1]), 1);
    const colorB = createColor('rgb', new Float32Array([0, 0, 0]), 0);
    mixColor(colorA, colorB, 0.5);
    expect(colorA.alpha).toBe(0.5);
  });
});

describe('mix-subtractive', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('palette (mix-subtractive-math)', () => {
    const cyan = createColor('rgb', new Float32Array([0, 1, 1]));
    const yellow = createColor('rgb', new Float32Array([1, 1, 0]));
    mixSubtractive(cyan, yellow, 0.5);
    expect(cyan.value[1]).toBeGreaterThan(cyan.value[0]);
    expect(cyan.value[1]).toBeGreaterThan(cyan.value[2]);
  });
});

describe('create-harmony', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('palette (create-harmony-complementary)', () => {
    const color = createColor('oklch', new Float32Array([0.5, 0.1, 0]));
    const harmony = createHarmony(color, [180]);
    expect(harmony.length).toBe(1);
    expect(harmony[0].value[2]).toBe(180);
  });
});

describe('create-scales', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('palette (create-scales-interpolation)', () => {
    const start = createColor('oklch', new Float32Array([0, 0, 0]));
    const end = createColor('oklch', new Float32Array([1, 0, 0]));
    const steps = createScales([start, end], 3);
    expect(steps.length).toBe(3);
    expect(steps[1].value[0]).toBeCloseTo(0.5, 2);
  });
});

describe('create-tints', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('palette (create-tints-logic)', () => {
    const color = createColor('oklch', new Float32Array([0.5, 0.1, 180]));
    const tints = createTints(color, 5);
    expect(tints.at(-1)?.value[0]).toBe(1);
  });
});

describe('create-shades', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('palette (create-shades-logic)', () => {
    const color = createColor('oklch', new Float32Array([0.5, 0.1, 180]));
    const shades = createShades(color, 5);
    expect(shades.at(-1)?.value[0]).toBe(0);
  });
});

describe('create-tonal', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('palette (create-tonal-logic)', () => {
    const color = createColor('oklch', new Float32Array([0.5, 0.1, 180]));
    const tonal = createTonal(color, 3);
    expect(tonal[0].value[0]).toBe(0);
    expectColorCloseTo(tonal[1].value, [0.5, 0.1, 180]);
    expect(tonal[2].value[0]).toBe(1);
  });
});
