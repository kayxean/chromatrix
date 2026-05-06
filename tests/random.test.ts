import { afterAll, describe, expect, test } from 'vite-plus/test';
import { convertColor } from '~/api/convert';
import { SPACES, createMockOutput, formatColorTrace, generateValidColor, utils } from './factory';

const ENABLE_LOGS = false;

describe('convert-color-random', () => {
  const inputBuf = new Float32Array(3);
  const outputBuf = createMockOutput();
  const colorLogs: string[] = [];

  for (let i = 0; i < 100; i++) {
    test(`convert (random-color-${i + 1})`, () => {
      const { from, to } = utils.pickDifferent(SPACES);
      generateValidColor(from, inputBuf);
      convertColor(inputBuf, outputBuf, from, to);

      colorLogs.push(formatColorTrace(inputBuf, outputBuf, from, to));
      for (let j = 0; j < 3; j++) {
        expect(Number.isFinite(outputBuf[j])).toBe(true);
      }
    });
  }

  afterAll(() => {
    if (!ENABLE_LOGS) return;
    process.stdout.write('\n  --- Random Conversion Traces ---\n');
    colorLogs.forEach((log) => {
      process.stdout.write('  ' + log + '\n');
    });
    process.stdout.write('\n');
  });
});
