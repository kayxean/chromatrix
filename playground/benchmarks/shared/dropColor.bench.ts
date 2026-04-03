import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../shared';

describe('dropColor', () => {
  bench('dropColor', () => {
    const c = createColor('rgb', [0.7, 0.1, 0.9]);
    dropColor(c);
  });
});

describe('dropColor color objects', () => {
  bench('dropColor color objects', () => {
    const c = createColor('hsl', [240, 0.8, 0.6]);
    dropColor(c);
  });
});
