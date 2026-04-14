import { bench, describe } from 'vitest';
import { labToXyz50, xyz50ToLab } from '~/adapters/d50';
import { createMockArray, createMockOutput } from '../factory';

describe('xyz50ToLab()', () => {
  const input = createMockArray([0.96422, 1, 0.82521]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-0.96422, -1, -0.82521]);
  const output = createMockOutput();
  bench('adapters (xyz50-to-lab)', () => {
    xyz50ToLab(input, output);
  });
  bench('adapters (xyz50-to-lab-zeros)', () => {
    xyz50ToLab(zeros, output);
  });
  bench('adapters (xyz50-to-lab-negatives)', () => {
    xyz50ToLab(negatives, output);
  });
});

describe('labToXyz50()', () => {
  const input = createMockArray([100, 128, 128]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([0, -128, -128]);
  const output = createMockOutput();
  bench('adapters (lab-to-xyz50)', () => {
    labToXyz50(input, output);
  });
  bench('adapters (lab-to-xyz50-zeros)', () => {
    labToXyz50(zeros, output);
  });
  bench('adapters (lab-to-xyz50-negatives)', () => {
    labToXyz50(negatives, output);
  });
});
