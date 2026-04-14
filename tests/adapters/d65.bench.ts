import { bench, describe } from 'vitest';
import { lrgbToXyz65, oklabToXyz65, xyz65ToLrgb, xyz65ToOklab } from '~/adapters/d65';
import { createMockArray, createMockOutput } from '../factory';

describe('xyz65ToLrgb()', () => {
  const input = createMockArray([0.95047, 1, 1.08883]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-0.95047, -1, -1.08883]);
  const output = createMockOutput();
  bench('adapters (xyz65-to-lrgb)', () => {
    xyz65ToLrgb(input, output);
  });
  bench('adapters (xyz65-to-lrgb-zeros)', () => {
    xyz65ToLrgb(zeros, output);
  });
  bench('adapters (xyz65-to-lrgb-negatives)', () => {
    xyz65ToLrgb(negatives, output);
  });
});

describe('lrgbToXyz65()', () => {
  const input = createMockArray([1, 1, 1]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-1, -1, -1]);
  const output = createMockOutput();
  bench('adapters (lrgb-to-xyz65)', () => {
    lrgbToXyz65(input, output);
  });
  bench('adapters (lrgb-to-xyz65-zeros)', () => {
    lrgbToXyz65(zeros, output);
  });
  bench('adapters (lrgb-to-xyz65-negatives)', () => {
    lrgbToXyz65(negatives, output);
  });
});

describe('xyz65ToOklab()', () => {
  const input = createMockArray([0.95047, 1, 1.08883]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-0.95047, -1, -1.08883]);
  const output = createMockOutput();
  bench('adapters (xyz65-to-oklab)', () => {
    xyz65ToOklab(input, output);
  });
  bench('adapters (xyz65-to-oklab-zeros)', () => {
    xyz65ToOklab(zeros, output);
  });
  bench('adapters (xyz65-to-oklab-negatives)', () => {
    xyz65ToOklab(negatives, output);
  });
});

describe('oklabToXyz65()', () => {
  const input = createMockArray([1, 0.4, 0.4]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([0, -0.4, -0.4]);
  const output = createMockOutput();
  bench('adapters (oklab-to-xyz65)', () => {
    oklabToXyz65(input, output);
  });
  bench('adapters (oklab-to-xyz65-zeros)', () => {
    oklabToXyz65(zeros, output);
  });
  bench('adapters (oklab-to-xyz65-negatives)', () => {
    oklabToXyz65(negatives, output);
  });
});
