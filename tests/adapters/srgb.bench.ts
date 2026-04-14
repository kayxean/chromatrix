import { bench, describe } from 'vitest';
import { hslToHsv, hsvToHsl, hsvToHwb, hsvToRgb, hwbToHsv, rgbToHsv } from '~/adapters/srgb';
import { createMockArray, createMockOutput } from '../factory';

describe('rgbToHsv()', () => {
  const input = createMockArray([1, 1, 1]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-1, -1, -1]);
  const output = createMockOutput();
  bench('adapters (rgb-to-hsv)', () => {
    rgbToHsv(input, output);
  });
  bench('adapters (rgb-to-hsv-zeros)', () => {
    rgbToHsv(zeros, output);
  });
  bench('adapters (rgb-to-hsv-negatives)', () => {
    rgbToHsv(negatives, output);
  });
});

describe('hsvToRgb()', () => {
  const input = createMockArray([360, 1, 1]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-360, -1, -1]);
  const output = createMockOutput();
  bench('adapters (hsv-to-rgb)', () => {
    hsvToRgb(input, output);
  });
  bench('adapters (hsv-to-rgb-zeros)', () => {
    hsvToRgb(zeros, output);
  });
  bench('adapters (hsv-to-rgb-negatives)', () => {
    hsvToRgb(negatives, output);
  });
});

describe('hsvToHsl()', () => {
  const input = createMockArray([360, 1, 1]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-360, -1, -1]);
  const output = createMockOutput();
  bench('adapters (hsv-to-hsl)', () => {
    hsvToHsl(input, output);
  });
  bench('adapters (hsv-to-hsl-zeros)', () => {
    hsvToHsl(zeros, output);
  });
  bench('adapters (hsv-to-hsl-negatives)', () => {
    hsvToHsl(negatives, output);
  });
});

describe('hslToHsv()', () => {
  const input = createMockArray([360, 1, 1]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-360, -1, -1]);
  const output = createMockOutput();
  bench('adapters (hsl-to-hsv)', () => {
    hslToHsv(input, output);
  });
  bench('adapters (hsl-to-hsv-zeros)', () => {
    hslToHsv(zeros, output);
  });
  bench('adapters (hsl-to-hsv-negatives)', () => {
    hslToHsv(negatives, output);
  });
});

describe('hsvToHwb()', () => {
  const input = createMockArray([360, 1, 1]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-360, -1, -1]);
  const output = createMockOutput();
  bench('adapters (hsv-to-hwb)', () => {
    hsvToHwb(input, output);
  });
  bench('adapters (hsv-to-hwb-zeros)', () => {
    hsvToHwb(zeros, output);
  });
  bench('adapters (hsv-to-hwb-negatives)', () => {
    hsvToHwb(negatives, output);
  });
});

describe('hwbToHsv()', () => {
  const input = createMockArray([360, 1, 1]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-360, -1, -1]);
  const output = createMockOutput();
  bench('adapters (hwb-to-hsv)', () => {
    hwbToHsv(input, output);
  });
  bench('adapters (hwb-to-hsv-zeros)', () => {
    hwbToHsv(zeros, output);
  });
  bench('adapters (hwb-to-hsv-negatives)', () => {
    hwbToHsv(negatives, output);
  });
});
