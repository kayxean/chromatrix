import { bench, describe } from 'vitest';
import { formatHex } from '~/format';

describe('formatHex()', () => {
  bench('matrix', () => {
    formatHex(255, 128, 0);
  });
});
