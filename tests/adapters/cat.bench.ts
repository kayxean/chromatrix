import { bench, describe } from 'vitest';
import { xyz50ToXyz65, xyz65ToXyz50 } from '~/adapters/cat';
import { createMockArray, createMockOutput } from '../factory';

describe('xyz65ToXyz50()', () => {
  const input = createMockArray([0.95047, 1, 1.08883]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-0.95047, -1, -1.08883]);
  const output = createMockOutput();
  bench('adapters (xyz65-to-xyz50)', () => {
    xyz65ToXyz50(input, output);
  });
  bench('adapters (xyz65-to-xyz50-zeros)', () => {
    xyz65ToXyz50(zeros, output);
  });
  bench('adapters (xyz65-to-xyz50-negatives)', () => {
    xyz65ToXyz50(negatives, output);
  });
});
describe('xyz50ToXyz65()', () => {
  const input = createMockArray([0.96422, 1, 0.82521]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-0.96422, -1, -0.82521]);
  const output = createMockOutput();
  bench('adapters (xyz50-to-xyz65)', () => {
    xyz50ToXyz65(input, output);
  });
  bench('adapters (xyz50-to-xyz65-zeros)', () => {
    xyz50ToXyz65(zeros, output);
  });
  bench('adapters (xyz50-to-xyz65-negatives)', () => {
    xyz50ToXyz65(negatives, output);
  });
});
