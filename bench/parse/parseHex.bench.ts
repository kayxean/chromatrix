import { bench, describe } from 'vitest';
import { parseHex } from '~/parse';

describe('parseHex()', () => {
  bench('parse (hex-internal)', () => {
    parseHex('ff8000');
  });
});
