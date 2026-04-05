import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { convertHue } from '~/convert';
import { expectColorCloseTo } from '../expect';

describe('convertHue()', () => {
  it('should convert hue for RGB', () => {
    const input = new Float32Array([1, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertHue(input, output, 'rgb');
    expectColorCloseTo(output, [0, 1, 0.5]);
  });

  it('should convert hue for HSL', () => {
    const input = new Float32Array([180, 0.5, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertHue(input, output, 'hsl');
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should convert hue for HSV', () => {
    const input = new Float32Array([180, 0.5, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertHue(input, output, 'hsv');
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should convert hue for HWB', () => {
    const input = new Float32Array([180, 0.5, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertHue(input, output, 'hwb');
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should convert hue for LAB', () => {
    const input = new Float32Array([54.2917, 80.8125, 69.8851]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertHue(input, output, 'lab');
    expectColorCloseTo(output, [54.2917, 106.839, 40.8526]);
  });

  it('should convert hue for LCH', () => {
    const input = new Float32Array([50, 30, 120]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertHue(input, output, 'lch');
    expectColorCloseTo(output, [50, 30, 120]);
  });

  it('should convert hue for OKLAB', () => {
    const input = new Float32Array([0.6279, 0.2248, 0.1258]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertHue(input, output, 'oklab');
    expectColorCloseTo(output, [0.6279, 0.2576, 29.2317]);
  });

  it('should convert hue for OKLCH', () => {
    const input = new Float32Array([0.6, 0.2, 120]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;
    convertHue(input, output, 'oklch');
    expectColorCloseTo(output, [0.6, 0.2, 120]);
  });
});
