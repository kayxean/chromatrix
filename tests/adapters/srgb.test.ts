import { describe, it } from 'vitest';
import { hslToHsv, hsvToHsl, hsvToHwb, hsvToRgb, hwbToHsv, rgbToHsv } from '~/adapters/srgb';
import { createMockArray, createMockOutput, expectColorCloseTo, expectColorToBe } from '../factory';

describe('rgbToHsv()', () => {
  it('should convert RGB to HSV', () => {
    const input = createMockArray([1, 1, 1]);
    const output = createMockOutput();
    rgbToHsv(input, output);
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    rgbToHsv(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-1, -1, -1]);
    const output = createMockOutput();
    rgbToHsv(input, output);
    expectColorCloseTo(output, [0, 0, -1]);
  });
});

describe('hsvToRgb()', () => {
  it('should convert HSV to RGB', () => {
    const input = createMockArray([360, 1, 1]);
    const output = createMockOutput();
    hsvToRgb(input, output);
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    hsvToRgb(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-360, -1, -1]);
    const output = createMockOutput();
    hsvToRgb(input, output);
    expectColorCloseTo(output, [-1, -2, -2]);
  });
});

describe('hsvToHsl()', () => {
  it('should convert HSV to HSL', () => {
    const input = createMockArray([360, 1, 1]);
    const output = createMockOutput();
    hsvToHsl(input, output);
    expectColorCloseTo(output, [360, 1, 0.5]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    hsvToHsl(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-360, -1, -1]);
    const output = createMockOutput();
    hsvToHsl(input, output);
    expectColorCloseTo(output, [-360, 0, -1.5]);
  });
});

describe('hslToHsv()', () => {
  it('should convert HSL to HSV', () => {
    const input = createMockArray([360, 1, 1]);
    const output = createMockOutput();
    hslToHsv(input, output);
    expectColorCloseTo(output, [360, 0, 1]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    hslToHsv(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-360, -1, -1]);
    const output = createMockOutput();
    hslToHsv(input, output);
    expectColorCloseTo(output, [-360, 0, 0]);
  });
});

describe('hsvToHwb()', () => {
  it('should convert HSV to HWB', () => {
    const input = createMockArray([360, 1, 1]);
    const output = createMockOutput();
    hsvToHwb(input, output);
    expectColorCloseTo(output, [360, 0, 0]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    hsvToHwb(input, output);
    expectColorToBe(output, [0, 0, 1]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-360, -1, -1]);
    const output = createMockOutput();
    hsvToHwb(input, output);
    expectColorCloseTo(output, [-360, -2, 2]);
  });
});

describe('hwbToHsv()', () => {
  it('should convert HWB to HSV', () => {
    const input = createMockArray([360, 1, 1]);
    const output = createMockOutput();
    hwbToHsv(input, output);
    expectColorCloseTo(output, [360, 0, 0]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    hwbToHsv(input, output);
    expectColorToBe(output, [0, 1, 1]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-360, -1, -1]);
    const output = createMockOutput();
    hwbToHsv(input, output);
    expectColorCloseTo(output, [-360, 1.5, 2]);
  });
});
