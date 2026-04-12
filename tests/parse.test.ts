import { describe, expect, it } from 'vitest';
import { parseColor } from '~/parse';
import { expectColorCloseTo } from './factory';

describe('parseColor(HEX)', () => {
  it('should parse HEX', () => {
    const { space, value } = parseColor('#ff0080');
    expect(space).toBe('rgb');
    expectColorCloseTo(value, [1, 0, 0.502]);
  });
  it('should parse HEX with min', () => {
    const { value } = parseColor('#000000');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  it('should parse HEX with max', () => {
    const { value } = parseColor('#ffffff');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  it('should parse HEX with alpha', () => {
    const { alpha } = parseColor('#ff000080');
    expect(alpha).toBeCloseTo(0.5);
  });
});

describe('parseColor(RGB)', () => {
  it('should parse RGB', () => {
    const { space, value } = parseColor('rgb(255 0 128)');
    expect(space).toBe('rgb');
    expectColorCloseTo(value, [1, 0, 0.502]);
  });
  it('should parse RGB with min', () => {
    const { value } = parseColor('rgb(0 0 0)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  it('should parse RGB with max', () => {
    const { value } = parseColor('rgb(255 255 255)');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  it('should parse RGB with alpha', () => {
    const { alpha } = parseColor('rgb(0 255 0 / 0.4)');
    expect(alpha).toBeCloseTo(0.4);
  });
  it('should parse RGB with none', () => {
    const { value, alpha } = parseColor('rgb(255 none 0 / none)');
    expect(value[0]).toBeCloseTo(1);
    expect(value[1]).toBeNaN();
    expect(alpha).toBeNaN();
  });
});

describe('parseColor(HSL)', () => {
  it('should parse HSL', () => {
    const { space, value } = parseColor('hsl(200deg 100% 50%)');
    expect(space).toBe('hsl');
    expectColorCloseTo(value, [200, 1, 0.5]);
  });
  it('should parse HSL with min', () => {
    const { value } = parseColor('hsl(0deg 0% 0%)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  it('should parse HSL with max', () => {
    const { value } = parseColor('hsl(360deg 100% 100%)');
    expectColorCloseTo(value, [0, 1, 1]);
  });
  it('should parse HSL with alpha', () => {
    const { alpha } = parseColor('hsl(200deg 50% 50% / 0.1)');
    expect(alpha).toBeCloseTo(0.1);
  });
  it('should parse HSL with none', () => {
    const { value } = parseColor('hsl(none 100% 50%)');
    expect(value[0]).toBeNaN();
  });
});

describe('parseColor(HWB)', () => {
  it('should parse HWB', () => {
    const { space, value } = parseColor('hwb(120deg 10% 10%)');
    expect(space).toBe('hwb');
    expectColorCloseTo(value, [120, 0.1, 0.1]);
  });
  it('should parse HWB with min', () => {
    const { value } = parseColor('hwb(0deg 0% 0%)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  it('should parse HWB with max', () => {
    const { value } = parseColor('hwb(360deg 100% 100%)');
    expectColorCloseTo(value, [0, 1, 1]);
  });
  it('should parse HWB with alpha', () => {
    const { alpha } = parseColor('hwb(120deg 0% 0% / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  it('should parse HWB with none', () => {
    const { value } = parseColor('hwb(120deg none 0%)');
    expect(value[1]).toBeNaN();
  });
});

describe('parseColor(LAB)', () => {
  it('should parse LAB', () => {
    const { space, value } = parseColor('lab(50% 40 20)');
    expect(space).toBe('lab');
    expectColorCloseTo(value, [50, 40, 20]);
  });
  it('should parse LAB with min', () => {
    const { value } = parseColor('lab(0% -125 -125)');
    expectColorCloseTo(value, [0, -125, -125]);
  });
  it('should parse LAB with max', () => {
    const { value } = parseColor('lab(100% 125 125)');
    expectColorCloseTo(value, [100, 125, 125]);
  });
  it('should parse LAB with alpha', () => {
    const { alpha } = parseColor('lab(50% 0 0 / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  it('should parse LAB with none', () => {
    const { value } = parseColor('lab(none 0 0)');
    expect(value[0]).toBeNaN();
  });
});

describe('parseColor(LCH)', () => {
  it('should parse LCH', () => {
    const { space, value } = parseColor('lch(50% 100 30deg)');
    expect(space).toBe('lch');
    expectColorCloseTo(value, [50, 100, 30]);
  });
  it('should parse LCH with min', () => {
    const { value } = parseColor('lch(0% 0 0deg)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  it('should parse LCH with max', () => {
    const { value } = parseColor('lch(100% 150 360deg)');
    expectColorCloseTo(value, [100, 150, 360]);
  });
  it('should parse LCH with alpha', () => {
    const { alpha } = parseColor('lch(50% 50 10deg / 0.1)');
    expect(alpha).toBeCloseTo(0.1);
  });
  it('should parse LCH with none', () => {
    const { value } = parseColor('lch(none 50 10deg)');
    expect(value[0]).toBeNaN();
  });
});

describe('parseColor(OKLAB)', () => {
  it('should parse OKLAB', () => {
    const { space, value } = parseColor('oklab(50% 0.1 -0.1)');
    expect(space).toBe('oklab');
    expectColorCloseTo(value, [0.5, 0.1, -0.1]);
  });
  it('should parse OKLAB with min', () => {
    const { value } = parseColor('oklab(0% -0.4 -0.4)');
    expectColorCloseTo(value, [0, -0.4, -0.4]);
  });
  it('should parse OKLAB with max', () => {
    const { value } = parseColor('oklab(100% 0.4 0.4)');
    expectColorCloseTo(value, [1, 0.4, 0.4]);
  });
  it('should parse OKLAB with alpha', () => {
    const { alpha } = parseColor('oklab(50% 0 0 / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  it('should parse OKLAB with none', () => {
    const { value } = parseColor('oklab(50% none none)');
    expect(value[1]).toBeNaN();
    expect(value[2]).toBeNaN();
  });
});

describe('parseColor(OKLCH)', () => {
  it('should parse OKLCH', () => {
    const { space, value } = parseColor('oklch(70% 0.1 120deg)');
    expect(space).toBe('oklch');
    expectColorCloseTo(value, [0.7, 0.1, 120]);
  });
  it('should parse OKLCH with min', () => {
    const { value } = parseColor('oklch(0% 0 0deg)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  it('should parse OKLCH with max', () => {
    const { value } = parseColor('oklch(100% 0.4 360deg)');
    expectColorCloseTo(value, [1, 0.4, 360]);
  });
  it('should parse OKLCH with alpha', () => {
    const { alpha } = parseColor('oklch(50% 0.1 0deg / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  it('should parse OKLCH with none', () => {
    const { value, alpha } = parseColor('oklch(50% 0 none / none)');
    expect(value[2]).toBeNaN();
    expect(alpha).toBeNaN();
  });
});

describe('parseColor(LRGB)', () => {
  it('should parse LRGB', () => {
    const { space, value } = parseColor('color(srgb-linear 1 0 0.5)');
    expect(space).toBe('lrgb');
    expectColorCloseTo(value, [1, 0, 0.5]);
  });
  it('should parse LRGB with min', () => {
    const { value } = parseColor('color(srgb-linear 0 0 0)');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  it('should parse LRGB with max', () => {
    const { value } = parseColor('color(srgb-linear 1 1 1)');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  it('should parse LRGB with alpha', () => {
    const { alpha } = parseColor('color(srgb-linear 0 0 0 / 0)');
    expect(alpha).toBe(0);
  });
  it('should parse LRGB with none', () => {
    const { value } = parseColor('color(srgb-linear 0.5 none 0.5)');
    expect(value[1]).toBeNaN();
  });
});

describe('parseColor(XYZ50)', () => {
  it('should parse XYZ50', () => {
    const { space, value } = parseColor('color(xyz-d50 0.96 1 0.82)');
    expect(space).toBe('xyz50');
    expectColorCloseTo(value, [0.96, 1, 0.82]);
  });
  it('should parse XYZ50 with min', () => {
    const { space, value } = parseColor('color(xyz-d50 0 0 0)');
    expect(space).toBe('xyz50');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  it('should parse XYZ50 with max', () => {
    const { value } = parseColor('color(xyz-d50 1 1 1)');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  it('should parse XYZ50 with alpha', () => {
    const { alpha } = parseColor('color(xyz-d50 0.5 0.5 0.5 / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  it('should parse XYZ50 with none', () => {
    const { value } = parseColor('color(xyz-d50 none 1 1 / 0.5)');
    expect(value[0]).toBeNaN();
  });
});

describe('parseColor(XYZ65)', () => {
  it('should parse XYZ65', () => {
    const { space, value } = parseColor('color(xyz-d65 0.95 1 1.08)');
    expect(space).toBe('xyz65');
    expectColorCloseTo(value, [0.95, 1, 1.08]);
  });
  it('should parse XYZ65 with min', () => {
    const { space, value } = parseColor('color(xyz-d65 0 0 0)');
    expect(space).toBe('xyz65');
    expectColorCloseTo(value, [0, 0, 0]);
  });
  it('should parse XYZ65 with max', () => {
    const { value } = parseColor('color(xyz-d65 1 1 1)');
    expectColorCloseTo(value, [1, 1, 1]);
  });
  it('should parse XYZ65 with alpha', () => {
    const { alpha } = parseColor('color(xyz-d65 0.5 0.5 0.5 / 0.5)');
    expect(alpha).toBeCloseTo(0.5);
  });
  it('should parse XYZ65 with none', () => {
    const { value } = parseColor('color(xyz-d65 none 1 1 / 0.5)');
    expect(value[0]).toBeNaN();
  });
});
