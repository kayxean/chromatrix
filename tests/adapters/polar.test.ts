import { describe, expect, it } from 'vitest';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from '~/adapters/polar';
import { createMatrix, dropMatrix } from '~/shared';

describe('Polar Adapters (Lab/Oklab <-> LCH/Oklch)', () => {
  it('should convert Cartesian to Polar (positive hue)', () => {
    const input = createMatrix('lab');
    input.set([50, 10, 10]);

    const output = createMatrix('lch');
    labToLch(input, output);

    expect(output[0]).toBe(50);
    expect(output[1]).toBeCloseTo(Math.sqrt(200), 6);
    expect(output[2]).toBeCloseTo(45, 6);

    dropMatrix(input);
    dropMatrix(output);
  });

  it('should handle negative hue branch in toPolar', () => {
    const input = createMatrix('oklab');
    input.set([60, 10, -10]);

    const output = createMatrix('oklch');
    oklabToOklch(input, output);

    expect(output[2]).toBe(315);

    dropMatrix(input);
    dropMatrix(output);
  });

  it('should round-trip Polar to Cartesian', () => {
    const original = createMatrix('lch');
    original.set([70, 25, 180]);

    const mid = createMatrix('lab');
    const result = createMatrix('lch');

    lchToLab(original, mid);

    expect(mid[1]).toBeCloseTo(-25, 6);
    expect(mid[2]).toBeCloseTo(0, 6);

    labToLch(mid, result);

    expect(result[0]).toBeCloseTo(original[0], 6);
    expect(result[1]).toBeCloseTo(original[1], 6);
    expect(result[2]).toBeCloseTo(original[2], 6);

    dropMatrix(original);
    dropMatrix(mid);
    dropMatrix(result);
  });

  it('should normalize hue in toCartesian', () => {
    const input = createMatrix('lch');
    const lab = createMatrix('lab');
    const result = createMatrix('lch');

    input.set([50, 20, -45]);
    lchToLab(input, lab);
    labToLch(lab, result);
    expect(result[2]).toBeCloseTo(315, 5);

    input.set([50, 20, 450]);
    lchToLab(input, lab);
    labToLch(lab, result);
    expect(result[2]).toBeCloseTo(90, 5);

    input.set([50, 20, -400]);
    lchToLab(input, lab);
    labToLch(lab, result);
    expect(result[2]).toBeGreaterThanOrEqual(0);
    expect(result[2]).toBeLessThan(360);

    dropMatrix(input);
    dropMatrix(lab);
    dropMatrix(result);
  });

  it('should correctly map Oklab named aliases', () => {
    const input = createMatrix('oklab');
    input.set([1, 0.1, 0.1]);
    const output = createMatrix('oklch');

    oklabToOklch(input, output);

    const back = createMatrix('oklab');
    oklchToOklab(output, back);

    expect(back[0]).toBeCloseTo(input[0], 6);
    expect(back[1]).toBeCloseTo(input[1], 6);
    expect(back[2]).toBeCloseTo(input[2], 6);

    dropMatrix(input);
    dropMatrix(output);
    dropMatrix(back);
  });
});
