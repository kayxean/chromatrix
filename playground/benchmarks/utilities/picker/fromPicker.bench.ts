import { bench, describe } from 'vitest';
import { dropColor } from '../../../shared';
import { fromPicker } from '../../../utils/picker';

describe('fromPicker', () => {
  bench('fromPicker', () => {
    const c = fromPicker({ h: 120, s: 0.8, v: 0.7, a: 1 }, 'rgb');
    dropColor(c);
  });
});
