import { beforeEach, describe, expect, test } from 'vitest';
import { createColor, mountMatrix } from '~/api/color';
import {
  blacken,
  darken,
  desaturate,
  invert,
  lighten,
  matchLuminance,
  rotate,
  saturate,
  whiten,
} from '~/utils/adjust';
import { expectColorCloseTo, expectColorToBe } from '../factory';

describe('adjust-color', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const values = new Float32Array([0.5, 0.2, 180]);
  test('adjust (lighten)', () => {
    const color = createColor('oklch', values);
    lighten(color, 0.5);
    expect(color.space).toBe('oklch');
    expectColorCloseTo(color.value, [0.75, 0.2, 180]);
  });
  test('adjust (darken)', () => {
    const color = createColor('oklch', values);
    darken(color, 0.5);
    expect(color.space).toBe('oklch');
    expectColorCloseTo(color.value, [0.25, 0.2, 180]);
  });
  test('adjust (saturate)', () => {
    const color = createColor('oklch', values);
    saturate(color, 0.5);
    expect(color.space).toBe('oklch');
    expectColorCloseTo(color.value, [0.5, 0.3, 180]);
  });
  test('adjust (desaturate)', () => {
    const color = createColor('oklch', values);
    desaturate(color, 0.5);
    expect(color.space).toBe('oklch');
    expectColorCloseTo(color.value, [0.5, 0.1, 180]);
  });
  test('adjust (whiten)', () => {
    const color = createColor('oklch', values);
    whiten(color, 0.5);
    expectColorCloseTo(color.value, [0.75, 0.1, 180]);
  });
  test('adjust (blacken)', () => {
    const color = createColor('oklch', values);
    blacken(color, 0.5);
    expectColorCloseTo(color.value, [0.25, 0.1, 180]);
  });
  test('adjust (rotate)', () => {
    const color = createColor('oklch', values);
    rotate(color, 90);
    expectColorCloseTo(color.value, [0.5, 0.2, 270]);
    rotate(color, 100);
    expectColorCloseTo(color.value, [0.5, 0.2, 10]);
    rotate(color, -20);
    expectColorCloseTo(color.value, [0.5, 0.2, 350]);
  });
  test('adjust (invert)', () => {
    const color = createColor('rgb', new Float32Array([1, 0.5, 0]));
    invert(color);
    expect(color.space).toBe('rgb');
    expectColorToBe(color.value, [0, 0.5, 1]);
  });
  test('adjust (match-luminance)', () => {
    const source = createColor('oklch', new Float32Array([0.8, 0.1, 10]));
    const target = createColor('oklch', new Float32Array([0.2, 0.2, 200]));
    matchLuminance(source, target);
    expectColorCloseTo(target.value, [0.8, 0.2, 200]);
  });
});
