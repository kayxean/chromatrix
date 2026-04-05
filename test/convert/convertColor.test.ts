import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { expectColorCloseTo } from '../expect';

describe('convertColor()', () => {
  it('should convert RGB to HSL', () => {
    const input = new Float32Array([1, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'rgb', 'hsl');
    expectColorCloseTo(output, [0, 1, 0.5]);
  });

  it('should convert RGB to HSV', () => {
    const input = new Float32Array([1, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'rgb', 'hsv');
    expectColorCloseTo(output, [0, 1, 1]);
  });

  it('should convert RGB to HWB', () => {
    const input = new Float32Array([1, 1, 1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'rgb', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });

  it('should convert RGB to LRGB', () => {
    const input = new Float32Array([0.5, 0.5, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'rgb', 'lrgb');
    expectColorCloseTo(output, [0.214, 0.214, 0.214]);
  });

  it('should convert RGB to LAB', () => {
    const input = new Float32Array([1, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'rgb', 'lab');
    expectColorCloseTo(output, [54.2917, 80.8125, 69.8851]);
  });

  it('should convert RGB to LCH', () => {
    const input = new Float32Array([1, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'rgb', 'lch');
    expectColorCloseTo(output, [54.2917, 106.839, 40.8526]);
  });

  it('should convert RGB to OKLAB', () => {
    const input = new Float32Array([1, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'rgb', 'oklab');
    expectColorCloseTo(output, [0.6279, 0.2248, 0.1258]);
  });

  it('should convert RGB to OKLCH', () => {
    const input = new Float32Array([1, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'rgb', 'oklch');
    expectColorCloseTo(output, [0.6279, 0.2576, 29.227]);
  });

  it('should convert HSL to RGB', () => {
    const input = new Float32Array([0, 1, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'hsl', 'rgb');
    expectColorCloseTo(output, [1, 0, 0]);
  });

  it('should convert HSV to RGB', () => {
    const input = new Float32Array([0, 1, 1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'hsv', 'rgb');
    expectColorCloseTo(output, [1, 0, 0]);
  });

  it('should convert HWB to RGB', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'hwb', 'rgb');
    expectColorCloseTo(output, [1, 0, 0]);
  });

  it('should convert LRGB to RGB', () => {
    const input = new Float32Array([0.214, 0.214, 0.214]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'lrgb', 'rgb');
    expectColorCloseTo(output, [0.5, 0.5, 0.5]);
  });

  it('should convert LAB to RGB', () => {
    const input = new Float32Array([53.2328, 80.1093, 67.2201]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'lab', 'rgb');
    expectColorCloseTo(output, [0.9823, -0.021, 0.0255]);
  });

  it('should convert LCH to LAB', () => {
    const input = new Float32Array([54.2917, 106.839, 40.8526]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'lch', 'lab');
    expectColorCloseTo(output, [54.2917, 80.8125, 69.8851]);
  });

  it('should convert OKLAB to RGB', () => {
    const input = new Float32Array([0.6279, 0.2248, 0.1258]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'oklab', 'rgb');
    expectColorCloseTo(output, [1, 0, 0]);
  });

  it('should convert OKLCH to OKLAB', () => {
    const input = new Float32Array([0.6279, 0.2576, 29.233]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'oklch', 'oklab');
    expectColorCloseTo(output, [0.6279, 0.2248, 0.1258]);
  });

  it('should handle same-space conversion', () => {
    const input = new Float32Array([0.5, 0.5, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertColor(input, output, 'rgb', 'rgb');
    expectColorCloseTo(output, [0.5, 0.5, 0.5]);
  });
});
