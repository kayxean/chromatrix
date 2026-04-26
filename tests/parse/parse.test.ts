import { describe, expect, test } from 'vitest';
import { parseColor } from '~/api/parse';
import { expectColorCloseTo } from '../factory';

describe('parse-color-hex', () => {
  test('parse hex', () => {
    const { space, value } = parseColor('#ff0080');
    expect(space).toBe('rgb');
    expectColorCloseTo(value, [1, 0, 0.502]);
  });
  test('parse (hex-min)', () => {
    const { value } = parseColor('#000000');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  test('parse (hex-max)', () => {
    const { value } = parseColor('#ffffff');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  test('parse (hex-alpha)', () => {
    const { alpha } = parseColor('#ff000080');
    expect(alpha).toBeCloseTo(0.5);
  });
});

describe('parse-color-rgb', () => {
  test('parse rgb', () => {
    const { space, value } = parseColor('rgb(255 0 128)');
    expect(space).toBe('rgb');
    expectColorCloseTo(value, [1, 0, 0.502]);
  });
  test('parse (rgb-min)', () => {
    const { value } = parseColor('rgb(0 0 0)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  test('parse (rgb-max)', () => {
    const { value } = parseColor('rgb(255 255 255)');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  test('parse (rgb-alpha)', () => {
    const { alpha } = parseColor('rgb(0 255 0 / 0.4)');
    expect(alpha).toBeCloseTo(0.4);
  });
  test('parse (rgb-none)', () => {
    const { value, alpha } = parseColor('rgb(255 none 0 / none)');
    expect(value[0]).toBeCloseTo(1);
    expect(value[1]).toBeNaN();
    expect(alpha).toBeNaN();
  });
});

describe('parse-color-hsl', () => {
  test('parse hsl', () => {
    const { space, value } = parseColor('hsl(200deg 100% 50%)');
    expect(space).toBe('hsl');
    expectColorCloseTo(value, [200, 1, 0.5]);
  });
  test('parse (hsl-min)', () => {
    const { value } = parseColor('hsl(0deg 0% 0%)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  test('parse (hsl-max)', () => {
    const { value } = parseColor('hsl(360deg 100% 100%)');
    expectColorCloseTo(value, [360, 1, 1]);
  });
  test('parse (hsl-alpha)', () => {
    const { alpha } = parseColor('hsl(200deg 50% 50% / 0.1)');
    expect(alpha).toBeCloseTo(0.1);
  });
  test('parse (hsl-none)', () => {
    const { value } = parseColor('hsl(none 100% 50%)');
    expect(value[0]).toBeNaN();
  });
});

describe('parse-color-hwb', () => {
  test('parse hwb', () => {
    const { space, value } = parseColor('hwb(120deg 10% 10%)');
    expect(space).toBe('hwb');
    expectColorCloseTo(value, [120, 0.1, 0.1]);
  });
  test('parse (hwb-min)', () => {
    const { value } = parseColor('hwb(0deg 0% 0%)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  test('parse (hwb-max)', () => {
    const { value } = parseColor('hwb(360deg 100% 100%)');
    expectColorCloseTo(value, [360, 1, 1]);
  });
  test('parse (hwb-alpha)', () => {
    const { alpha } = parseColor('hwb(120deg 0% 0% / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  test('parse (hwb-none)', () => {
    const { value } = parseColor('hwb(120deg none 0%)');
    expect(value[1]).toBeNaN();
  });
});

describe('parse-color-lab', () => {
  test('parse lab', () => {
    const { space, value } = parseColor('lab(50% 40 20)');
    expect(space).toBe('lab');
    expectColorCloseTo(value, [0.5, 40, 20]);
  });
  test('parse (lab-min)', () => {
    const { value } = parseColor('lab(0% -125 -125)');
    expectColorCloseTo(value, [0, -125, -125]);
  });
  test('parse (lab-max)', () => {
    const { value } = parseColor('lab(100% 125 125)');
    expectColorCloseTo(value, [1, 125, 125]);
  });
  test('parse (lab-alpha)', () => {
    const { alpha } = parseColor('lab(50% 0 0 / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  test('parse (lab-none)', () => {
    const { value } = parseColor('lab(none 0 0)');
    expect(value[0]).toBeNaN();
  });
});

describe('parse-color-lch', () => {
  test('parse lch', () => {
    const { space, value } = parseColor('lch(50% 100 30deg)');
    expect(space).toBe('lch');
    expectColorCloseTo(value, [0.5, 100, 30]);
  });
  test('parse (lch-min)', () => {
    const { value } = parseColor('lch(0% 0 0deg)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  test('parse (lch-max)', () => {
    const { value } = parseColor('lch(100% 150 360deg)');
    expectColorCloseTo(value, [1, 150, 360]);
  });
  test('parse (lch-alpha)', () => {
    const { alpha } = parseColor('lch(50% 50 10deg / 0.1)');
    expect(alpha).toBeCloseTo(0.1);
  });
  test('parse (lch-none)', () => {
    const { value } = parseColor('lch(none 50 10deg)');
    expect(value[0]).toBeNaN();
  });
});

describe('parse-color-oklab', () => {
  test('parse oklab', () => {
    const { space, value } = parseColor('oklab(50% 0.1 -0.1)');
    expect(space).toBe('oklab');
    expectColorCloseTo(value, [0.5, 0.1, -0.1]);
  });
  test('parse (oklab-min)', () => {
    const { value } = parseColor('oklab(0% -0.4 -0.4)');
    expectColorCloseTo(value, [0, -0.4, -0.4]);
  });
  test('parse (oklab-max)', () => {
    const { value } = parseColor('oklab(100% 0.4 0.4)');
    expectColorCloseTo(value, [1, 0.4, 0.4]);
  });
  test('parse (oklab-alpha)', () => {
    const { alpha } = parseColor('oklab(50% 0 0 / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  test('parse (oklab-none)', () => {
    const { value } = parseColor('oklab(50% none none)');
    expect(value[1]).toBeNaN();
    expect(value[2]).toBeNaN();
  });
});

describe('parse-color-oklch', () => {
  test('parse oklch', () => {
    const { space, value } = parseColor('oklch(70% 0.1 120deg)');
    expect(space).toBe('oklch');
    expectColorCloseTo(value, [0.7, 0.1, 120]);
  });
  test('parse (oklch-min)', () => {
    const { value } = parseColor('oklch(0% 0 0deg)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  test('parse (oklch-max)', () => {
    const { value } = parseColor('oklch(100% 0.4 360deg)');
    expectColorCloseTo(value, [1, 0.4, 360]);
  });
  test('parse (oklch-alpha)', () => {
    const { alpha } = parseColor('oklch(50% 0.1 0deg / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  test('parse (oklch-none)', () => {
    const { value, alpha } = parseColor('oklch(50% 0 none / none)');
    expect(value[2]).toBeNaN();
    expect(alpha).toBeNaN();
  });
});

describe('parse-color-lrgb', () => {
  test('parse lrgb', () => {
    const { space, value } = parseColor('color(srgb-linear 1 0 0.5)');
    expect(space).toBe('lrgb');
    expectColorCloseTo(value, [1, 0, 0.5]);
  });
  test('parse (lrgb-min)', () => {
    const { value } = parseColor('color(srgb-linear 0 0 0)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  test('parse (lrgb-max)', () => {
    const { value } = parseColor('color(srgb-linear 1 1 1)');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  test('parse (lrgb-alpha)', () => {
    const { alpha } = parseColor('color(srgb-linear 0 0 0 / 0)');
    expect(alpha).toBe(0);
  });
  test('parse (lrgb-none)', () => {
    const { value } = parseColor('color(srgb-linear 0.5 none 0.5)');
    expect(value[1]).toBeNaN();
  });
});

describe('parse-color-xyz50', () => {
  test('parse xyz50', () => {
    const { space, value } = parseColor('color(xyz-d50 0.96 1 0.82)');
    expect(space).toBe('xyz50');
    expectColorCloseTo(value, [0.96, 1, 0.82]);
  });
  test('parse (xyz50-min)', () => {
    const { space, value } = parseColor('color(xyz-d50 0 0 0)');
    expect(space).toBe('xyz50');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  test('parse (xyz50-max)', () => {
    const { value } = parseColor('color(xyz-d50 1 1 1)');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  test('parse (xyz50-alpha)', () => {
    const { alpha } = parseColor('color(xyz-d50 0.5 0.5 0.5 / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  test('parse (xyz50-none)', () => {
    const { value } = parseColor('color(xyz-d50 none 1 1 / 0.5)');
    expect(value[0]).toBeNaN();
  });
});

describe('parse-color-xyz65', () => {
  test('parse xyz65', () => {
    const { space, value } = parseColor('color(xyz-d65 0.95 1 1.08)');
    expect(space).toBe('xyz65');
    expectColorCloseTo(value, [0.95, 1, 1.08]);
  });
  test('parse (xyz65-min)', () => {
    const { space, value } = parseColor('color(xyz-d65 0 0 0)');
    expect(space).toBe('xyz65');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  test('parse (xyz65-max)', () => {
    const { value } = parseColor('color(xyz-d65 1 1 1)');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  test('parse (xyz65-alpha)', () => {
    const { alpha } = parseColor('color(xyz-d65 0.5 0.5 0.5 / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  test('parse (xyz65-none)', () => {
    const { value } = parseColor('color(xyz-d65 none 1 1 / 0.5)');
    expect(value[0]).toBeNaN();
  });
});
