import type { ColorAdapter, ColorSpace } from '~/types';
import { describe, expect, it } from 'vitest';
import { lrgbToRgb } from '~/adapters/gamma';
import { applyAdapter, convertColor, convertHue } from '~/convert';
import { createMatrix, dropMatrix } from '~/shared';

describe('Conversion Engine (convert.ts)', () => {
  it('should handle the identity path (from === to)', () => {
    const input = createMatrix('rgb');
    input.set([1, 0.5, 0]);
    const output = createMatrix('rgb');

    convertColor(input, output, 'rgb', 'rgb');
    expect(output[0]).toBe(1);
    expect(output[1]).toBe(0.5);

    convertColor(input, input, 'rgb', 'rgb');
    expect(input[0]).toBe(1);

    dropMatrix(input);
    dropMatrix(output);
  });

  it('should use DIRECT_HUB for same-model shortcuts (RGB -> HSL)', () => {
    const rgb = createMatrix('rgb');
    rgb.set([1, 0, 0]);
    const hsl = createMatrix('hsl');

    convertColor(rgb, hsl, 'rgb', 'hsl');

    expect(hsl[0]).toBe(0);
    expect(hsl[1]).toBe(1);
    expect(hsl[2]).toBe(0.5);

    dropMatrix(rgb);
    dropMatrix(hsl);
  });

  it('should handle complex Hub paths with CAT (Lab to Oklab)', () => {
    const lab = createMatrix('lab');
    lab.set([50, 20, 10]);
    const oklab = createMatrix('oklab');

    convertColor(lab, oklab, 'lab', 'oklab');

    expect(oklab[0]).toBeGreaterThan(0);
    expect(oklab[0]).toBeLessThan(1);

    dropMatrix(lab);
    dropMatrix(oklab);
  });

  it('should handle direct spaces as Hubs using valid literals', () => {
    const xyz = createMatrix('xyz65');
    xyz.set([0.95047, 1.0, 1.08883]);
    const rgb = createMatrix('rgb');

    const fromSpace: ColorSpace = 'xyz65';
    convertColor(xyz, rgb, fromSpace, 'rgb');

    expect(rgb[0]).toBeCloseTo(1, 3);

    dropMatrix(xyz);
    dropMatrix(rgb);
  });

  it('convertColor should handle the D50 to D65 chromatic adaptation path', () => {
    const xyz50 = createMatrix('xyz50');
    xyz50.set([0.9642, 1.0, 0.8249]);
    const xyz65 = createMatrix('xyz65');

    convertColor(xyz50, xyz65, 'xyz50', 'xyz65');

    expect(xyz65[0]).toBeCloseTo(0.9504, 3);
    expect(xyz65[2]).toBeCloseTo(1.0888, 3);

    dropMatrix(xyz50);
    dropMatrix(xyz65);
  });

  it('convertColor should handle D65 to D50 chromatic adaptation', () => {
    const oklab = createMatrix('oklab');
    oklab.set([1, 0, 0]);
    const lab = createMatrix('lab');

    convertColor(oklab, lab, 'oklab', 'lab');

    expect(lab[0]).toBeCloseTo(100, 1);
    dropMatrix(oklab);
    dropMatrix(lab);
  });

  it('convertColor should skip hub copy when input and output are the same', () => {
    const xyz = createMatrix('xyz65');
    xyz.set([0.5, 0.5, 0.5]);

    convertColor(xyz, xyz, 'xyz65', 'xyz65');

    expect(xyz[0]).toBe(0.5);
    dropMatrix(xyz);
  });

  it('convertColor should bypass hub-set when source is hub and input is output', () => {
    const xyz = createMatrix('xyz65');
    xyz.set([0.5, 0.5, 0.5]);

    convertColor(xyz, xyz, 'xyz65', 'oklab');

    expect(xyz[0]).not.toBe(0.5);
    dropMatrix(xyz);
  });

  it('convertHue should map correctly or copy if no polar target exists', () => {
    const rgb = createMatrix('rgb');
    rgb.set([1, 0, 0]);
    const hsl = createMatrix('hsl');

    convertHue(rgb, hsl, 'rgb');
    expect(hsl[0]).toBe(0);

    const xyz = createMatrix('xyz65');
    xyz.set([0.5, 0.5, 0.5]);
    const output = createMatrix('xyz65');

    convertHue(xyz, output, 'xyz65');
    expect(output[0]).toBe(0.5);

    dropMatrix(rgb);
    dropMatrix(hsl);
    dropMatrix(xyz);
    dropMatrix(output);
  });

  it('convertHue should handle in-place identity when no polar target exists', () => {
    const xyz = createMatrix('xyz65');
    xyz.set([0.5, 0.5, 0.5]);

    convertHue(xyz, xyz, 'xyz65');
    expect(xyz[0]).toBe(0.5);

    dropMatrix(xyz);
  });

  it('applyAdapter should handle empty, single, and multi chains', () => {
    const input = createMatrix('rgb');
    input.set([0.5, 0.5, 0.5]);
    const output = createMatrix('rgb');

    applyAdapter([], input, output);
    expect(output[0]).toBe(0.5);

    applyAdapter([], input, input);
    expect(input[0]).toBe(0.5);

    const singleStep: ColorAdapter[] = [lrgbToRgb];
    applyAdapter(singleStep, input, output);
    expect(output[0]).not.toBe(0.5);

    input.set([0.5, 0.5, 0.5]);
    const multiStep: ColorAdapter[] = [lrgbToRgb, lrgbToRgb, lrgbToRgb];
    applyAdapter(multiStep, input, output);
    expect(output[0]).toBeGreaterThan(0);

    dropMatrix(input);
    dropMatrix(output);
  });
});
