import { describe, expect, it } from 'vitest';
import { lrgbToXyz65, oklabToXyz65, xyz65ToLrgb, xyz65ToOklab } from '../../adapters/d65';
import { createColor, dropColor, getSharedBuffer } from '../../shared';

describe('D65 Adapters (LRGB & Oklab)', () => {
  describe('Linear RGB transforms', () => {
    it('should round-trip Linear RGB via XYZ D65', () => {
      const color = createColor('lrgb', [0.2, 0.5, 0.9]);
      const buf = getSharedBuffer();
      const idx = color.index;

      lrgbToXyz65(buf, idx);
      xyz65ToLrgb(buf, idx);

      expect(buf[idx]).toBeCloseTo(0.2, 5);
      expect(buf[idx + 1]).toBeCloseTo(0.5, 5);
      expect(buf[idx + 2]).toBeCloseTo(0.9, 5);

      dropColor(color);
    });

    it('should transform D65 white point to LRGB [1, 1, 1]', () => {
      const color = createColor('xyz65', [0.95047, 1.0, 1.08883]);
      const buf = getSharedBuffer();
      const idx = color.index;

      xyz65ToLrgb(buf, idx);

      expect(buf[idx]).toBeCloseTo(1.0, 4);
      expect(buf[idx + 1]).toBeCloseTo(1.0, 4);
      expect(buf[idx + 2]).toBeCloseTo(1.0, 4);

      dropColor(color);
    });
  });

  describe('Oklab transforms', () => {
    it('should round-trip standard colors through Oklab', () => {
      const color = createColor('xyz65', [0.3, 0.4, 0.5]);
      const buf = getSharedBuffer();
      const idx = color.index;

      xyz65ToOklab(buf, idx);
      oklabToXyz65(buf, idx);

      expect(buf[idx]).toBeCloseTo(0.3, 5);
      expect(buf[idx + 1]).toBeCloseTo(0.4, 5);
      expect(buf[idx + 2]).toBeCloseTo(0.5, 5);

      dropColor(color);
    });

    it('should handle the neutral axis (gray) correctly in Oklab', () => {
      const color = createColor('xyz65', [0.95047 * 0.5, 1.0 * 0.5, 1.08883 * 0.5]);
      const buf = getSharedBuffer();
      const idx = color.index;

      xyz65ToOklab(buf, idx);

      expect(buf[idx + 1]).toBeCloseTo(0, 3);
      expect(buf[idx + 2]).toBeCloseTo(0, 3);

      dropColor(color);
    });

    it('should handle absolute black correctly in Oklab', () => {
      const color = createColor('xyz65', [0, 0, 0]);
      const buf = getSharedBuffer();
      const idx = color.index;

      xyz65ToOklab(buf, idx);

      expect(buf[idx]).toBe(0);
      expect(buf[idx + 1]).toBe(0);
      expect(buf[idx + 2]).toBe(0);

      dropColor(color);
    });

    it('should support in-place mutation for Oklab transforms', () => {
      const color = createColor('xyz65', [0.5, 0.5, 0.5]);
      const buf = getSharedBuffer();
      const idx = color.index;

      const expected = createColor('oklab', [0, 0, 0]);
      const expIdx = expected.index;

      xyz65ToOklab(buf, idx);

      xyz65ToOklab(buf, idx);

      expect(buf[idx]).toBeCloseTo(buf[expIdx], 10);
      expect(buf[idx + 1]).toBeCloseTo(buf[expIdx + 1], 10);
      expect(buf[idx + 2]).toBeCloseTo(buf[expIdx + 2], 10);

      dropColor(color);
      dropColor(expected);
    });
  });
});
