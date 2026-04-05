import { describe, expect, it } from 'vitest';
import { getContrastRating } from '~/utils/contrast';

describe('getContrastRating()', () => {
  it('should return platinum for Lc >= 90', () => {
    expect(getContrastRating(90)).toBe('platinum');
    expect(getContrastRating(114)).toBe('platinum');
    expect(getContrastRating(-114)).toBe('platinum');
  });

  it('should return gold for Lc >= 75', () => {
    expect(getContrastRating(75)).toBe('gold');
    expect(getContrastRating(89.9)).toBe('gold');
  });

  it('should return silver for Lc >= 60', () => {
    expect(getContrastRating(60)).toBe('silver');
    expect(getContrastRating(74.9)).toBe('silver');
  });

  it('should return bronze for Lc >= 45', () => {
    expect(getContrastRating(45)).toBe('bronze');
    expect(getContrastRating(59.9)).toBe('bronze');
  });

  it('should return ui for Lc >= 30', () => {
    expect(getContrastRating(30)).toBe('ui');
    expect(getContrastRating(44.9)).toBe('ui');
  });

  it('should return fail for Lc < 30', () => {
    expect(getContrastRating(29.9)).toBe('fail');
    expect(getContrastRating(0)).toBe('fail');
  });
});
