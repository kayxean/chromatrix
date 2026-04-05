import { describe, expect, it } from 'vitest';
import { parseHex } from '~/parse';

describe('parseHex()', () => {
  it('should parse 6-digit hex', () => {
    const result = parseHex('ff8000');
    expect(result.r).toBe(255);
    expect(result.g).toBe(128);
    expect(result.b).toBe(0);
    expect(result.a).toBe(255);
  });

  it('should parse 3-digit hex', () => {
    const result = parseHex('f80');
    expect(result.r).toBe(255);
    expect(result.g).toBe(136);
    expect(result.b).toBe(0);
    expect(result.a).toBe(255);
  });

  it('should parse 8-digit hex with alpha', () => {
    const result = parseHex('ff000080');
    expect(result.r).toBe(255);
    expect(result.g).toBe(0);
    expect(result.b).toBe(0);
    expect(result.a).toBe(128);
  });

  it('should parse 4-digit hex with alpha', () => {
    const result = parseHex('f008');
    expect(result.r).toBe(255);
    expect(result.g).toBe(0);
    expect(result.b).toBe(0);
    expect(result.a).toBe(136);
  });

  it('should throw on empty string', () => {
    expect(() => parseHex('')).toThrow('empty color string');
  });

  it('should throw on invalid length', () => {
    expect(() => parseHex('ff')).toThrow('invalid hex length: 2');
  });
});
