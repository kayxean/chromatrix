import { beforeEach, describe, expect, test } from 'vitest';
import { DEAD_CELL, createColor, mountMatrix } from '~/api/color';
import { adaptColor, averageColor, getDistance, isEqual, sortColors } from '~/utils/analyze';
import { expectColorCloseTo } from '../factory';

describe('get-distance', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('analyze (get-distance-oklab)', () => {
    const a = createColor('oklab', new Float32Array([1, 0, 0]));
    const b = createColor('oklab', new Float32Array([0.5, 0, 0]));
    expect(getDistance(a, b, 'oklab')).toBeCloseTo(0.5);
  });
  test('analyze (get-distance-itp)', () => {
    const a = createColor('rgb', new Float32Array([1, 0, 0]));
    const b = createColor('rgb', new Float32Array([0, 1, 0]));
    expect(getDistance(a, b, 'itp')).toBeGreaterThan(0);
  });
  test('analyze (get-distance-deltaE2000)', () => {
    const a = createColor('rgb', new Float32Array([1, 0, 0]));
    const b = createColor('rgb', new Float32Array([0, 0, 1]));
    expect(getDistance(a, b, 'deltaE2000')).toBeGreaterThan(0);
  });
});

describe('sort-colors', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('analyze (sort-colors-luminance)', () => {
    const c1 = createColor('oklch', new Float32Array([0.2, 0.1, 10]));
    const c2 = createColor('oklch', new Float32Array([0.8, 0.1, 10]));
    const c3 = createColor('oklch', new Float32Array([0.5, 0.1, 10]));
    const res = sortColors([c1, c2, c3], 'luminance');
    expectColorCloseTo(res[0].value, [0.2, 0.1, 10]);
    expectColorCloseTo(res[1].value, [0.5, 0.1, 10]);
    expectColorCloseTo(res[2].value, [0.8, 0.1, 10]);
  });
  test('analyze (sort-colors-chroma)', () => {
    const c1 = createColor('oklch', new Float32Array([0.5, 0.4, 10]));
    const c2 = createColor('oklch', new Float32Array([0.5, 0.1, 10]));
    const res = sortColors([c1, c2], 'chroma');
    expectColorCloseTo(res[0].value, [0.5, 0.1, 10]);
    expectColorCloseTo(res[1].value, [0.5, 0.4, 10]);
  });
  test('analyze (sort-colors-hue)', () => {
    const c1 = createColor('oklch', new Float32Array([0.5, 0.1, 200]));
    const c2 = createColor('oklch', new Float32Array([0.5, 0.1, 50]));
    const res = sortColors([c1, c2], 'hue');
    expectColorCloseTo(res[0].value, [0.5, 0.1, 50]);
    expectColorCloseTo(res[1].value, [0.5, 0.1, 200]);
  });
  test('analyze (sort-colors-distance)', () => {
    const target = createColor('oklab', new Float32Array([1, 0, 0]));
    const far = createColor('oklab', new Float32Array([0, 0, 0]));
    const near = createColor('oklab', new Float32Array([0.9, 0, 0]));
    const res = sortColors([far, near], 'distance', target);
    expect(res[0]).toBe(near);
    expect(res[1]).toBe(far);
  });
  test('analyze (sort-colors-distance-noop)', () => {
    const c1 = createColor('rgb', new Float32Array([1, 1, 1]));
    const res = sortColors([c1], 'distance');
    expect(res[0]).toBe(c1);
  });
});

describe('average-color', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('analyze (average-color)', () => {
    const c1 = createColor('oklab', new Float32Array([1, 0.2, -0.2]));
    const c2 = createColor('oklab', new Float32Array([0, 0.4, 0.2]));
    const avg = averageColor([c1, c2]);
    expect(avg.space).toBe('oklab');
    expectColorCloseTo(avg.value, [0.5, 0.3, 0]);
  });
  test('analyze (average-color-empty)', () => {
    const avg = averageColor([]);
    expect(avg.space).toBe('oklab');
    expect(avg.value).not.toBe(DEAD_CELL);
    avg.value.fill(0);
    expectColorCloseTo(avg.value, [0, 0, 0]);
  });
  test('analyze (average-color-alpha)', () => {
    const c1 = createColor('oklab', new Float32Array([1, 0, 0]), 1);
    const c2 = createColor('oklab', new Float32Array([0, 0, 0]), 0.4);
    const avg = averageColor([c1, c2]);
    expect(avg.alpha).toBeCloseTo(0.7);
  });
});

describe('adapt-color', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('analyze (adapt-color)', () => {
    const color = createColor('rgb', new Float32Array([1, 0.5, 0]));
    const adapted = adaptColor(color, 'd65', 'd50');
    expect(adapted.space).toBe('rgb');
    expect(adapted.value[0]).not.toBe(1);
  });
  test('analyze (adapt-color-noop)', () => {
    const color = createColor('rgb', new Float32Array([1, 0.5, 0]));
    const adapted = adaptColor(color, 'd65', 'd65');
    expectColorCloseTo(adapted.value, [1, 0.5, 0]);
    expect(adapted.value).not.toBe(color.value);
  });
});

describe('is-equal', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('analyze (is-equal-identity)', () => {
    const a = createColor('rgb', new Float32Array([1, 1, 1]));
    expect(isEqual(a, a)).toBe(true);
  });
  test('analyze (is-equal-mismatch)', () => {
    const a = createColor('rgb', new Float32Array([1, 1, 1]), 1);
    const b = createColor('rgb', new Float32Array([1, 1, 1]), 0.5);
    expect(isEqual(a, b)).toBe(false);
  });
  test('analyze (is-equal-polar-oklch)', () => {
    const a = createColor('oklch', new Float32Array([0.5, 0.1, 359.95]));
    const b = createColor('oklch', new Float32Array([0.5, 0.1, 0.01]));
    expect(isEqual(a, b)).toBe(true);
  });
  test('analyze (is-equal-polar-hwb)', () => {
    const a = createColor('hwb', new Float32Array([359.95, 0.1, 0.1]));
    const b = createColor('hwb', new Float32Array([0.01, 0.1, 0.1]));
    expect(isEqual(a, b)).toBe(true);
  });
  test('analyze (is-equal-cross-space)', () => {
    const a = createColor('rgb', new Float32Array([1, 1, 1]));
    const b = createColor('oklab', new Float32Array([1, 0, 0]));
    expect(isEqual(a, b)).toBe(true);
  });
  test('analyze (is-equal-tolerance)', () => {
    const a = createColor('rgb', new Float32Array([0.5, 0.5, 0.5]));
    const b = createColor('rgb', new Float32Array([0.505, 0.5, 0.5]));
    expect(isEqual(a, b, 0.1)).toBe(true);
    expect(isEqual(a, b, 0.001)).toBe(false);
  });
});
