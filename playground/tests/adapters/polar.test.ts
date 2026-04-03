import { describe, expect, it } from 'vitest';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from '../../adapters/polar';
import { createColor, dropColor, getSharedBuffer } from '../../shared';

describe('Polar Adapters (Lab/Oklab <-> LCH/Oklch)', () => {
  it('should convert Cartesian to Polar (positive hue)', () => {
    const color = createColor('lab', [50, 10, 10]);
    const buf = getSharedBuffer();
    const idx = color.index;

    labToLch(buf, idx);

    expect(buf[idx]).toBe(50);
    expect(buf[idx + 1]).toBeCloseTo(Math.sqrt(200), 6);
    expect(buf[idx + 2]).toBeCloseTo(45, 6);

    dropColor(color);
  });

  it('should handle negative hue branch in toPolar', () => {
    const color = createColor('oklab', [60, 10, -10]);
    const buf = getSharedBuffer();
    const idx = color.index;

    oklabToOklch(buf, idx);

    expect(buf[idx + 2]).toBe(315);

    dropColor(color);
  });

  it('should round-trip Polar to Cartesian', () => {
    const color = createColor('lch', [70, 25, 180]);
    const buf = getSharedBuffer();
    const idx = color.index;

    lchToLab(buf, idx);

    expect(buf[idx + 1]).toBeCloseTo(-25, 6);
    expect(buf[idx + 2]).toBeCloseTo(0, 6);

    labToLch(buf, idx);

    expect(buf[idx]).toBeCloseTo(70, 6);
    expect(buf[idx + 1]).toBeCloseTo(25, 6);
    expect(buf[idx + 2]).toBeCloseTo(180, 6);

    dropColor(color);
  });

  it('should normalize hue in toCartesian', () => {
    const color = createColor('lch', [50, 20, -45]);
    const buf = getSharedBuffer();
    const idx = color.index;

    lchToLab(buf, idx);
    labToLch(buf, idx);

    expect(buf[idx + 2]).toBeCloseTo(315, 5);

    color.value[2] = 450;
    lchToLab(buf, idx);
    labToLch(buf, idx);
    expect(buf[idx + 2]).toBeCloseTo(90, 5);

    color.value[2] = -400;
    lchToLab(buf, idx);
    labToLch(buf, idx);
    expect(buf[idx + 2]).toBeGreaterThanOrEqual(0);
    expect(buf[idx + 2]).toBeLessThan(360);

    dropColor(color);
  });

  it('should correctly map Oklab named aliases', () => {
    const color = createColor('oklab', [1, 0.1, 0.1]);
    const buf = getSharedBuffer();
    const idx = color.index;

    oklabToOklch(buf, idx);
    oklchToOklab(buf, idx);

    expect(buf[idx]).toBeCloseTo(1, 6);
    expect(buf[idx + 1]).toBeCloseTo(0.1, 6);
    expect(buf[idx + 2]).toBeCloseTo(0.1, 6);

    dropColor(color);
  });
});
