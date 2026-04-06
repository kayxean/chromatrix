import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { parseColorName } from '~/utils/naming';

describe('parseColorName()', () => {
  bench('naming (parse)', () => {
    const color = parseColorName('red');
    if (color) dropColor(color);
  });

  bench('naming (parse-case-insensitive)', () => {
    const color = parseColorName('ReBeCcAPuRpLe');
    if (color) dropColor(color);
  });

  bench('naming (parse-invalid)', () => {
    parseColorName('notacolor');
  });

  bench('naming (parse-long-name)', () => {
    const color = parseColorName('lightgoldenrodyellow');
    if (color) dropColor(color);
  });
});
