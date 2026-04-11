import { describe, expect, it } from 'vitest';
import { convertColor, convertHue } from '~/convert';

describe('convertColor()', () => {
  it('returns input unchanged when source and target spaces are identical', () => {
    const input = new Float32Array([0.5, 0.5, 0.5]);
    const output = new Float32Array(3);
    convertColor(input, output, 'rgb', 'rgb');
    expect(output[0]).toBe(0.5);
    expect(output[1]).toBe(0.5);
    expect(output[2]).toBe(0.5);
  });

  it('applies direct transformation matrix for rgb to hsv conversion', () => {
    const input = new Float32Array([1, 0, 0]);
    const output = new Float32Array(3);
    convertColor(input, output, 'rgb', 'hsv');
    expect(output[0]).toBe(0);
    expect(output[1]).toBe(1);
    expect(output[2]).toBe(1);
  });

  it('uses adaptation-aware matrix for rgb to lab conversion', () => {
    const input = new Float32Array([1, 1, 1]);
    const output = new Float32Array(3);
    convertColor(input, output, 'rgb', 'lab');
    expect(output[0]).toBeCloseTo(100, 1);
    expect(output[1]).toBeCloseTo(0, 1);
    expect(output[2]).toBeCloseTo(0, 1);
  });

  it('applies chromatic adaptation when converting between xyz65 and xyz50', () => {
    const input = new Float32Array([0.95047, 1.0, 1.08883]);
    const output = new Float32Array(3);
    convertColor(input, output, 'xyz65', 'xyz50');
    expect(output[0]).toBeCloseTo(0.9642, 3);
    expect(output[1]).toBeCloseTo(1.0, 3);
    expect(output[2]).toBeCloseTo(0.8252, 3);
  });

  it('performs perceptual mapping via reference hub for xyz50 to lab conversion', () => {
    const input = new Float32Array([0.9642, 1.0, 0.8252]);
    const output = new Float32Array(3);
    convertColor(input, output, 'xyz50', 'lab');
    expect(output[0]).toBeCloseTo(100, 1);
    expect(output[1]).toBeCloseTo(0, 1);
    expect(output[2]).toBeCloseTo(0, 1);
  });
});

describe('convertHue()', () => {
  it('converts rgb hue to hsl hue coordinate system', () => {
    const input = new Float32Array([1, 0, 0]);
    const output = new Float32Array(3);
    convertHue(input, output, 'rgb');
    expect(output[0]).toBe(0);
    expect(output[1]).toBe(1);
    expect(output[2]).toBe(0.5);
  });

  it('preserves input values when target space is same as source or non-polar', () => {
    const input = new Float32Array([0.1, 0.2, 0.3]);
    const output = new Float32Array(3);
    convertHue(input, output, 'xyz65');
    expect(output[0]).toBeCloseTo(0.1);
    expect(output[1]).toBeCloseTo(0.2);
    expect(output[2]).toBeCloseTo(0.3);
  });
});
