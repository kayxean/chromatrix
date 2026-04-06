import { bench, describe } from 'vitest';
import { parseHex } from '~/parse';

describe('parseHex()', () => {
  bench('parse (6-digit)', () => {
    parseHex('ff8000');
  });

  bench('parse (3-digit)', () => {
    parseHex('f80');
  });

  bench('parse (8-digit)', () => {
    parseHex('ff000080');
  });

  bench('parse (4-digit)', () => {
    parseHex('f008');
  });
});
