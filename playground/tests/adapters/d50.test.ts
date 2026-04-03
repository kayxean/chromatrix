import { describe, expect, it } from 'vitest';
import { xyz50ToLab, labToXyz50 } from '../../adapters/d50';
import { createColor, dropColor, getSharedBuffer } from '../../shared';

describe('D50 Adapters (XYZ50 <-> LAB)', () => {
  it('should convert XYZ50 to Lab', () => {
    const color = createColor('xyz50', [0.96422, 1.0, 0.82521]);
    const buf = getSharedBuffer();
    const idx = color.index;

    xyz50ToLab(buf, idx);

    expect(buf[idx]).toBeCloseTo(100, 1);
    expect(buf[idx + 1]).toBeCloseTo(0, 1);
    expect(buf[idx + 2]).toBeCloseTo(0, 1);

    dropColor(color);
  });

  it('should convert Lab to XYZ50', () => {
    const color = createColor('lab', [50, 20, -10]);
    const buf = getSharedBuffer();
    const idx = color.index;

    labToXyz50(buf, idx);

    expect(buf[idx]).toBeGreaterThan(0);
    expect(buf[idx + 1]).toBeGreaterThan(0);

    dropColor(color);
  });

  it('should round-trip with minimal error', () => {
    const color = createColor('xyz50', [0.5, 0.5, 0.5]);
    const buf = getSharedBuffer();
    const idx = color.index;

    xyz50ToLab(buf, idx);
    labToXyz50(buf, idx);

    expect(buf[idx]).toBeCloseTo(0.5, 3);
    expect(buf[idx + 1]).toBeCloseTo(0.5, 3);
    expect(buf[idx + 2]).toBeCloseTo(0.5, 3);

    dropColor(color);
  });
});
