import { beforeEach, describe, expect, test } from 'vitest';
import { createColor, mountMatrix } from '~/api/color';
import {
  getContrast,
  getContrastRating,
  getContrastRatio,
  isAccessible,
  matchContrast,
  pickContrast,
} from '~/utils/contrast';

describe('get-contrast', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('contrast (get-contrast-apca)', () => {
    const white = createColor('rgb', new Float32Array([1, 1, 1]));
    const black = createColor('rgb', new Float32Array([0, 0, 0]));
    const score = getContrast(black, white);
    expect(Math.abs(score)).toBeCloseTo(33.7, 1);
  });
  test('contrast (get-contrast-same)', () => {
    const white = createColor('rgb', new Float32Array([1, 1, 1]));
    expect(getContrast(white, white)).toBe(0);
  });
});

describe('get-contrast-ratio', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('contrast (get-contrast-ratio-wcag)', () => {
    const white = createColor('rgb', new Float32Array([1, 1, 1]));
    const black = createColor('rgb', new Float32Array([0, 0, 0]));
    expect(getContrastRatio(white, black)).toBeCloseTo(21, 1);
  });
});

describe('get-contrast-rating', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('contrast (get-contrast-rating-levels)', () => {
    expect(getContrastRating(95)).toBe('platinum');
    expect(getContrastRating(80)).toBe('gold');
    expect(getContrastRating(65)).toBe('silver');
    expect(getContrastRating(50)).toBe('bronze');
    expect(getContrastRating(35)).toBe('ui');
    expect(getContrastRating(10)).toBe('fail');
  });
});

describe('is-accessible', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('contrast (is-accessible-standard)', () => {
    const white = createColor('rgb', new Float32Array([1, 1, 1]));
    const gray = createColor('rgb', new Float32Array([0.45, 0.45, 0.45]));
    expect(isAccessible(gray, white, 'AA')).toBe(true);
  });
  test('contrast (is-accessible-large-text)', () => {
    const white = createColor('rgb', new Float32Array([1, 1, 1]));
    const gray = createColor('rgb', new Float32Array([0.45, 0.45, 0.45]));
    expect(isAccessible(gray, white, 'AAA', true)).toBe(true);
  });
});

describe('match-contrast', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('contrast (match-contrast-search)', () => {
    const color = createColor('oklch', new Float32Array([0.2, 0.1, 180]));
    const background = createColor('rgb', new Float32Array([1, 1, 1]));
    matchContrast(color, background, 30);
    const newContrast = Math.abs(getContrast(color, background));
    expect(newContrast).toBeCloseTo(30, 0);
    expect(color.value[0]).toBeGreaterThan(0.2);
  });
});

describe('pick-contrast', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('contrast (pick-contrast-best)', () => {
    const bg = createColor('rgb', new Float32Array([0, 0, 0]));
    const bad = createColor('rgb', new Float32Array([0.1, 0.1, 0.1]));
    const good = createColor('rgb', new Float32Array([0.9, 0.9, 0.9]));
    const result = pickContrast(bg, [bad, good]);
    expect(result).toBe(good);
  });
});
