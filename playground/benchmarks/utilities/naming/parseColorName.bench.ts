import { bench, describe } from 'vitest';
import { dropColor } from '../../../shared';
import { parseColorName } from '../../../utils/naming';

describe('parseColorName', () => {
  bench('parseColorName', () => {
    const c = parseColorName('red');
    if (c) dropColor(c);
  });
});
