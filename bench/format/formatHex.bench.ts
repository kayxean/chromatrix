import { bench, describe } from 'vitest';
import { formatHex } from '~/format';

describe('formatHex()', () => {
  bench('format (hex-internal)', () => {
    formatHex(255, 128, 0);
  });
});
