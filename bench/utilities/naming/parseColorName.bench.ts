import { bench, describe } from 'vitest';
import { parseColorName } from '~/utils/naming';

describe('parseColorName()', () => {
  bench('naming (parse)', () => {
    parseColorName('red');
  });
});
