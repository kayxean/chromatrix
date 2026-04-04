import { bench, describe } from 'vitest';
import { parseHex } from '~/parse';

describe('parseHex()', () => {
  bench('matrix', () => {
    parseHex('ff8000');
  });
});
