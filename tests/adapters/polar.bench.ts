import { bench, describe } from 'vitest';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from '~/adapters/polar';
import { createMockArray, createMockOutput } from '../factory';

describe('labToLch()', () => {
  const input = createMockArray([100, 128, 128]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([0, -128, -128]);
  const output = createMockOutput();
  bench('adapters (lab-to-lch)', () => {
    labToLch(input, output);
  });
  bench('adapters (lab-to-lch-zeros)', () => {
    labToLch(zeros, output);
  });
  bench('adapters (lab-to-lch-negatives)', () => {
    labToLch(negatives, output);
  });
});

describe('lchToLab()', () => {
  const input = createMockArray([100, 181.019, 360]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-100, -181.019, -360]);
  const output = createMockOutput();
  bench('adapters (lch-to-lab)', () => {
    lchToLab(input, output);
  });
  bench('adapters (lch-to-lab-zeros)', () => {
    lchToLab(zeros, output);
  });
  bench('adapters (lch-to-lab-negatives)', () => {
    lchToLab(negatives, output);
  });
});

describe('oklabToOklch()', () => {
  const input = createMockArray([1, 0.4, 0.4]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([0, -0.4, -0.4]);
  const output = createMockOutput();
  bench('adapters (oklab-to-oklch)', () => {
    oklabToOklch(input, output);
  });
  bench('adapters (oklab-to-oklch-zeros)', () => {
    oklabToOklch(zeros, output);
  });
  bench('adapters (oklab-to-oklch-negatives)', () => {
    oklabToOklch(negatives, output);
  });
});

describe('oklchToOklab()', () => {
  const input = createMockArray([1, 0.4, 360]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-1, -0.4, -360]);
  const output = createMockOutput();
  bench('adapters (oklch-to-oklab)', () => {
    oklchToOklab(input, output);
  });
  bench('adapters (oklch-to-oklab-zeros)', () => {
    oklchToOklab(zeros, output);
  });
  bench('adapters (oklch-to-oklab-negatives)', () => {
    oklchToOklab(negatives, output);
  });
});
