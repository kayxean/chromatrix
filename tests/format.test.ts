import { describe, expect, it } from 'vitest';
import { formatCss } from '~/format';
import { createMockColor } from './factory';

describe('formatCss(HEX)', () => {
  it('should format HEX', () => {
    const color = createMockColor('rgb', [1, 0, 0.5]);
    expect(formatCss(color, true)).toBe('#ff0080');
  });
  it('should format HEX with min', () => {
    const color = createMockColor('rgb', [0, 0, 0]);
    expect(formatCss(color, true)).toBe('#000000');
  });
  it('should format HEX with max', () => {
    const color = createMockColor('rgb', [1, 1, 1]);
    expect(formatCss(color, true)).toBe('#ffffff');
  });
  it('should format HEX with alpha', () => {
    const color = createMockColor('rgb', [1, 0, 0], 0.5);
    expect(formatCss(color, true)).toBe('#ff000080');
  });
});

describe('formatCss(RGB)', () => {
  it('should format RGB', () => {
    const color = createMockColor('rgb', [1, 0, 0.5]);
    expect(formatCss(color)).toBe('rgb(255 0 128)');
  });
  it('should format RGB with min', () => {
    const color = createMockColor('rgb', [0, 0, 0]);
    expect(formatCss(color)).toBe('rgb(0 0 0)');
  });
  it('should format RGB with max', () => {
    const color = createMockColor('rgb', [1, 1, 1]);
    expect(formatCss(color)).toBe('rgb(255 255 255)');
  });
  it('should format RGB with alpha', () => {
    const color = createMockColor('rgb', [0, 1, 0], 0.4);
    expect(formatCss(color)).toBe('rgb(0 255 0 / 0.4)');
  });
  it('should format RGB with none', () => {
    const color = createMockColor('rgb', [1, NaN, 0], NaN);
    expect(formatCss(color)).toBe('rgb(255 none 0 / none)');
  });
});

describe('formatCss(HSL)', () => {
  it('should format HSL', () => {
    const color = createMockColor('hsl', [200, 1, 0.5]);
    expect(formatCss(color)).toBe('hsl(200deg 100% 50%)');
  });
  it('should format HSL with min', () => {
    const color = createMockColor('hsl', [0, 0, 0]);
    expect(formatCss(color)).toBe('hsl(0deg 0% 0%)');
  });
  it('should format HSL with max', () => {
    const color = createMockColor('hsl', [360, 1, 1]);
    expect(formatCss(color)).toBe('hsl(360deg 100% 100%)');
  });
  it('should format HSL with alpha', () => {
    const color = createMockColor('hsl', [200, 0.5, 0.5], 0.1);
    expect(formatCss(color)).toBe('hsl(200deg 50% 50% / 0.1)');
  });
  it('should format HSL with none', () => {
    const color = createMockColor('hsl', [NaN, 1, 0.5]);
    expect(formatCss(color)).toBe('hsl(none 100% 50%)');
  });
});

describe('formatCss(HWB)', () => {
  it('should format HWB', () => {
    const color = createMockColor('hwb', [120, 0.1, 0.1]);
    expect(formatCss(color)).toBe('hwb(120deg 10% 10%)');
  });
  it('should format HWB with min', () => {
    const color = createMockColor('hwb', [0, 0, 0]);
    expect(formatCss(color)).toBe('hwb(0deg 0% 0%)');
  });

  it('should format HWB with max', () => {
    const color = createMockColor('hwb', [360, 1, 1]);
    expect(formatCss(color)).toBe('hwb(360deg 100% 100%)');
  });
  it('should format HWB with alpha', () => {
    const color = createMockColor('hwb', [120, 0, 0], 0.5);
    expect(formatCss(color)).toBe('hwb(120deg 0% 0% / 0.5)');
  });
  it('should format HWB with none', () => {
    const color = createMockColor('hwb', [120, NaN, 0]);
    expect(formatCss(color)).toBe('hwb(120deg none 0%)');
  });
});

describe('formatCss(LAB)', () => {
  it('should format LAB', () => {
    const color = createMockColor('lab', [50, 40, 20]);
    expect(formatCss(color)).toBe('lab(50% 40 20)');
  });
  it('should format LAB with min', () => {
    const color = createMockColor('lab', [0, -125, -125]);
    expect(formatCss(color)).toBe('lab(0% -125 -125)');
  });
  it('should format LAB with max', () => {
    const color = createMockColor('lab', [100, 125, 125]);
    expect(formatCss(color)).toBe('lab(100% 125 125)');
  });
  it('should format LAB with alpha', () => {
    const color = createMockColor('lab', [50, 0, 0], 0.5);
    expect(formatCss(color)).toBe('lab(50% 0 0 / 0.5)');
  });
  it('should format LAB with none', () => {
    const color = createMockColor('lab', [NaN, 0, 0]);
    expect(formatCss(color)).toBe('lab(none 0 0)');
  });
});

describe('formatCss(LCH)', () => {
  it('should format LCH', () => {
    const color = createMockColor('lch', [50, 100, 30]);
    expect(formatCss(color)).toBe('lch(50% 100 30deg)');
  });
  it('should format LCH with min', () => {
    const color = createMockColor('lch', [0, 0, 0]);
    expect(formatCss(color)).toBe('lch(0% 0 0deg)');
  });
  it('should format LCH with max', () => {
    const color = createMockColor('lch', [100, 150, 360]);
    expect(formatCss(color)).toBe('lch(100% 150 360deg)');
  });
  it('should format LCH with alpha', () => {
    const color = createMockColor('lch', [50, 50, 10], 0.1);
    expect(formatCss(color)).toBe('lch(50% 50 10deg / 0.1)');
  });
  it('should format LCH with none', () => {
    const color = createMockColor('lch', [NaN, 50, 10]);
    expect(formatCss(color)).toBe('lch(none 50 10deg)');
  });
});

describe('formatCss(OKLAB)', () => {
  it('should format OKLAB', () => {
    const color = createMockColor('oklab', [0.5, 0.1, -0.1]);
    expect(formatCss(color)).toBe('oklab(50% 0.1 -0.1)');
  });
  it('should format OKLAB with min', () => {
    const color = createMockColor('oklab', [0, -0.4, -0.4]);
    expect(formatCss(color)).toBe('oklab(0% -0.4 -0.4)');
  });
  it('should format OKLAB with max', () => {
    const color = createMockColor('oklab', [1, 0.4, 0.4]);
    expect(formatCss(color)).toBe('oklab(100% 0.4 0.4)');
  });
  it('should format OKLAB with alpha', () => {
    const color = createMockColor('oklab', [0.5, 0, 0], 0.5);
    expect(formatCss(color)).toBe('oklab(50% 0 0 / 0.5)');
  });
  it('should format OKLAB with none', () => {
    const color = createMockColor('oklab', [0.5, NaN, NaN]);
    expect(formatCss(color)).toBe('oklab(50% none none)');
  });
});

describe('formatCss(OKLCH)', () => {
  it('should format OKLCH', () => {
    const color = createMockColor('oklch', [0.7, 0.1, 120]);
    expect(formatCss(color)).toBe('oklch(70% 0.1 120deg)');
  });
  it('should format OKLCH with min', () => {
    const color = createMockColor('oklch', [0, 0, 0]);
    expect(formatCss(color)).toBe('oklch(0% 0 0deg)');
  });
  it('should format OKLCH with max', () => {
    const color = createMockColor('oklch', [1, 0.4, 360]);
    expect(formatCss(color)).toBe('oklch(100% 0.4 360deg)');
  });
  it('should format OKLCH with alpha', () => {
    const color = createMockColor('oklch', [0.5, 0.1, 0], 0.5);
    expect(formatCss(color)).toBe('oklch(50% 0.1 0deg / 0.5)');
  });
  it('should format OKLCH with none', () => {
    const color = createMockColor('oklch', [0.5, 0, NaN], NaN);
    expect(formatCss(color)).toBe('oklch(50% 0 none / none)');
  });
});

describe('formatCss(LRGB)', () => {
  it('should format LRGB', () => {
    const color = createMockColor('lrgb', [1, 0, 0.5]);
    expect(formatCss(color)).toBe('color(srgb-linear 1 0 0.5)');
  });
  it('should format LRGB with min', () => {
    const color = createMockColor('lrgb', [0, 0, 0]);
    expect(formatCss(color)).toBe('color(srgb-linear 0 0 0)');
  });
  it('should format LRGB with max', () => {
    const color = createMockColor('lrgb', [1, 1, 1]);
    expect(formatCss(color)).toBe('color(srgb-linear 1 1 1)');
  });
  it('should format LRGB with alpha', () => {
    const color = createMockColor('lrgb', [0, 0, 0], 0);
    expect(formatCss(color)).toBe('color(srgb-linear 0 0 0 / 0)');
  });
  it('should format LRGB with none', () => {
    const color = createMockColor('lrgb', [0.5, NaN, 0.5]);
    expect(formatCss(color)).toBe('color(srgb-linear 0.5 none 0.5)');
  });
});

describe('formatCss(XYZ50)', () => {
  it('should format XYZ50', () => {
    const color = createMockColor('xyz50', [0.96, 1, 0.82]);
    expect(formatCss(color)).toBe('color(xyz-d50 0.96 1 0.82)');
  });
  it('should format XYZ50 with min', () => {
    const color = createMockColor('xyz50', [0, 0, 0]);
    expect(formatCss(color)).toBe('color(xyz-d50 0 0 0)');
  });
  it('should format XYZ50 with max', () => {
    const color = createMockColor('xyz50', [1, 1, 1]);
    expect(formatCss(color)).toBe('color(xyz-d50 1 1 1)');
  });
  it('should format XYZ50 with alpha', () => {
    const color = createMockColor('xyz50', [0.5, 0.5, 0.5], 0.5);
    expect(formatCss(color)).toBe('color(xyz-d50 0.5 0.5 0.5 / 0.5)');
  });
  it('should format XYZ50 with none', () => {
    const color = createMockColor('xyz50', [NaN, 1, 1], 0.5);
    expect(formatCss(color)).toBe('color(xyz-d50 none 1 1 / 0.5)');
  });
});

describe('formatCss(XYZ65)', () => {
  it('should format XYZ65', () => {
    const color = createMockColor('xyz65', [0.95, 1, 1.08]);
    expect(formatCss(color)).toBe('color(xyz-d65 0.95 1 1.08)');
  });
  it('should format XYZ65 with min', () => {
    const color = createMockColor('xyz65', [0, 0, 0]);
    expect(formatCss(color)).toBe('color(xyz-d65 0 0 0)');
  });
  it('should format XYZ65 with max', () => {
    const color = createMockColor('xyz65', [1, 1, 1]);
    expect(formatCss(color)).toBe('color(xyz-d65 1 1 1)');
  });
  it('should format XYZ65 with alpha', () => {
    const color = createMockColor('xyz65', [0.5, 0.5, 0.5], 0.5);
    expect(formatCss(color)).toBe('color(xyz-d65 0.5 0.5 0.5 / 0.5)');
  });
  it('should format XYZ65 with none', () => {
    const color = createMockColor('xyz65', [NaN, 1, 1], 0.5);
    expect(formatCss(color)).toBe('color(xyz-d65 none 1 1 / 0.5)');
  });
});
