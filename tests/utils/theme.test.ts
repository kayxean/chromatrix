import { describe, expect, it } from 'vitest';
import { convertTheme, createDualTheme, createTheme, dropTheme } from '../../src/utils/theme';
import { createColor } from '../../src/shared';

describe('theme', () => {
  describe('createTheme', () => {
    it('should create light theme from primary color', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);
      const theme = createTheme({ mode: 'light', primaryColor: primary });

      expect(theme.primary).toBeDefined();
      expect(theme.secondary).toBeDefined();
      expect(theme.accent).toBeDefined();
      expect(theme.background).toBeDefined();
      expect(theme.surface).toBeDefined();
      expect(theme.text).toBeDefined();
      expect(theme.textSecondary).toBeDefined();
      expect(theme.border).toBeDefined();
      expect(theme.error).toBeDefined();
      expect(theme.warning).toBeDefined();
      expect(theme.success).toBeDefined();
      expect(theme.info).toBeDefined();

      // Light theme should have light background
      expect(theme.background.value[0]).toBeGreaterThan(0.9);

      dropTheme(theme);
    });

    it('should create dark theme from primary color', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);
      const theme = createTheme({ mode: 'dark', primaryColor: primary });

      expect(theme.primary).toBeDefined();
      expect(theme.background).toBeDefined();

      // Dark theme should have dark background
      expect(theme.background.value[0]).toBeLessThan(0.3);

      dropTheme(theme);
    });

    it('should use custom accent color when provided', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);
      const accent = createColor('oklch', [0.7, 0.15, 50]);

      const theme = createTheme({ mode: 'light', primaryColor: primary, accentColor: accent });

      expect(theme.accent).toBeDefined();

      dropTheme(theme);
    });

    it('should respect target contrast', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);

      const lowContrast = createTheme({
        mode: 'light',
        primaryColor: primary,
        targetContrast: 30,
      });
      const highContrast = createTheme({
        mode: 'light',
        primaryColor: primary,
        targetContrast: 90,
      });

      expect(lowContrast.primary).toBeDefined();
      expect(highContrast.primary).toBeDefined();

      dropTheme(lowContrast);
      dropTheme(highContrast);
    });

    it('should generate all semantic colors', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);
      const theme = createTheme({ mode: 'light', primaryColor: primary });

      expect(theme.error.space).toBe('oklch');
      expect(theme.warning.space).toBe('oklch');
      expect(theme.success.space).toBe('oklch');
      expect(theme.info.space).toBe('oklch');

      dropTheme(theme);
    });
  });

  describe('createDualTheme', () => {
    it('should create both light and dark themes', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);
      const themes = createDualTheme(primary);

      expect(themes.light).toBeDefined();
      expect(themes.dark).toBeDefined();

      // Light theme should have light background
      expect(themes.light.background.value[0]).toBeGreaterThan(0.9);

      // Dark theme should have dark background
      expect(themes.dark.background.value[0]).toBeLessThan(0.3);

      dropTheme(themes.light);
      dropTheme(themes.dark);
    });

    it('should use custom accent in both themes', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);
      const accent = createColor('oklch', [0.7, 0.15, 50]);

      const themes = createDualTheme(primary, accent);

      expect(themes.light.accent).toBeDefined();
      expect(themes.dark.accent).toBeDefined();

      dropTheme(themes.light);
      dropTheme(themes.dark);
    });
  });

  describe('convertTheme', () => {
    it('should convert theme to different color space', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);
      const theme = createTheme({ mode: 'light', primaryColor: primary });

      const rgbTheme = convertTheme(theme, 'rgb');

      expect(rgbTheme.primary.space).toBe('rgb');
      expect(rgbTheme.background.space).toBe('rgb');
      expect(rgbTheme.text.space).toBe('rgb');

      dropTheme(theme);
      dropTheme(rgbTheme);
    });

    it('should preserve all theme colors', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);
      const theme = createTheme({ mode: 'light', primaryColor: primary });

      const hslTheme = convertTheme(theme, 'hsl');

      expect(Object.keys(hslTheme)).toHaveLength(12);
      expect(hslTheme.primary).toBeDefined();
      expect(hslTheme.secondary).toBeDefined();
      expect(hslTheme.accent).toBeDefined();
      expect(hslTheme.background).toBeDefined();
      expect(hslTheme.surface).toBeDefined();
      expect(hslTheme.text).toBeDefined();
      expect(hslTheme.textSecondary).toBeDefined();
      expect(hslTheme.border).toBeDefined();
      expect(hslTheme.error).toBeDefined();
      expect(hslTheme.warning).toBeDefined();
      expect(hslTheme.success).toBeDefined();
      expect(hslTheme.info).toBeDefined();

      dropTheme(theme);
      dropTheme(hslTheme);
    });
  });

  describe('dropTheme', () => {
    it('should dispose all theme colors', () => {
      const primary = createColor('oklch', [0.6, 0.2, 250]);
      const theme = createTheme({ mode: 'light', primaryColor: primary });

      // Should not throw
      expect(() => dropTheme(theme)).not.toThrow();
    });
  });
});
