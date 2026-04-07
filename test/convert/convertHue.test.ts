import { describe, it } from 'vitest';
import { convertHue } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertHue()', () => {
  it('should convert hue for RGB', () => {
    const input = createMockArray([1, 0, 0]);
    const output = createMockOutput();
    convertHue(input, output, 'rgb');
    expectColorCloseTo(output, [0, 1, 0.5]);
  });

  it('should convert hue for HSL', () => {
    const input = createMockArray([180, 0.5, 0.5]);
    const output = createMockOutput();
    convertHue(input, output, 'hsl');
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should convert hue for HSV', () => {
    const input = createMockArray([180, 0.5, 0.5]);
    const output = createMockOutput();
    convertHue(input, output, 'hsv');
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should convert hue for HWB', () => {
    const input = createMockArray([180, 0.5, 0.5]);
    const output = createMockOutput();
    convertHue(input, output, 'hwb');
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should convert hue for LAB', () => {
    const input = createMockArray([54.2917, 80.8125, 69.8851]);
    const output = createMockOutput();
    convertHue(input, output, 'lab');
    expectColorCloseTo(output, [54.2917, 106.839, 40.8526]);
  });

  it('should convert hue for LCH', () => {
    const input = createMockArray([50, 30, 120]);
    const output = createMockOutput();
    convertHue(input, output, 'lch');
    expectColorCloseTo(output, [50, 30, 120]);
  });

  it('should convert hue for OKLAB', () => {
    const input = createMockArray([0.6279, 0.2248, 0.1258]);
    const output = createMockOutput();
    convertHue(input, output, 'oklab');
    expectColorCloseTo(output, [0.6279, 0.2576, 29.2317]);
  });

  it('should convert hue for OKLCH', () => {
    const input = createMockArray([0.6, 0.2, 120]);
    const output = createMockOutput();
    convertHue(input, output, 'oklch');
    expectColorCloseTo(output, [0.6, 0.2, 120]);
  });
});
