import { bench, describe } from 'vitest';
import { roundTo } from '~/format';

describe('roundTo()', () => {
  bench('matrix', () => {
    roundTo(3.14159265, 2);
  });
});
