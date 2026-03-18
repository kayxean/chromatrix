import type { Color, ColorSpace } from '../types';
import { createColor, deriveColor, dropColor, mutateColor } from '../shared';
import { matchContrast } from './contrast';
import { createHarmony } from './palette';

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  primary: Color;
  secondary: Color;
  accent: Color;
  background: Color;
  surface: Color;
  text: Color;
  textSecondary: Color;
  border: Color;
  error: Color;
  warning: Color;
  success: Color;
  info: Color;
};

export type ThemeOptions = {
  mode?: ThemeMode;
  primaryColor: Color;
  accentColor?: Color;
  targetContrast?: number;
};

/**
 * Generate a complete color theme from a primary color.
 * Automatically creates harmonious colors and ensures proper contrast.
 */
export function createTheme(options: ThemeOptions): ThemeColors {
  const { mode = 'light', primaryColor, accentColor, targetContrast = 60 } = options;

  const isDark = mode === 'dark';

  // Create background and surface colors
  const background = createColor('oklch', isDark ? [0.15, 0, 0] : [0.98, 0, 0]);
  const surface = createColor('oklch', isDark ? [0.2, 0, 0] : [1, 0, 0]);

  // Generate harmonious colors from primary
  const harmonies = createHarmony(primaryColor, [
    { name: 'analogous', ratios: [30] },
    { name: 'complementary', ratios: [180] },
  ]);

  const secondary = harmonies[0].colors[0];
  const accent = accentColor
    ? deriveColor(accentColor, primaryColor.space)
    : harmonies[1].colors[0];

  // Ensure primary and accent have proper contrast against background
  const primary = matchContrast(primaryColor, background, targetContrast);
  const accentAdjusted = matchContrast(accent, background, targetContrast);

  // Create text colors with proper contrast
  const textLightness = isDark ? 0.95 : 0.15;
  const textSecondaryLightness = isDark ? 0.7 : 0.45;

  const text = createColor('oklch', [textLightness, 0, 0]);
  const textSecondary = createColor('oklch', [textSecondaryLightness, 0, 0]);

  // Create border color
  const borderLightness = isDark ? 0.3 : 0.85;
  const border = createColor('oklch', [borderLightness, 0, 0]);

  // Create semantic colors (error, warning, success, info)
  const error = createColor('oklch', [0.55, 0.22, 25]); // Red
  const warning = createColor('oklch', [0.7, 0.15, 85]); // Orange/Yellow
  const success = createColor('oklch', [0.6, 0.17, 145]); // Green
  const info = createColor('oklch', [0.6, 0.15, 250]); // Blue

  // Adjust semantic colors for contrast
  const errorAdjusted = matchContrast(error, background, targetContrast);
  const warningAdjusted = matchContrast(warning, background, targetContrast);
  const successAdjusted = matchContrast(success, background, targetContrast);
  const infoAdjusted = matchContrast(info, background, targetContrast);

  // Clean up temporary colors
  harmonies.forEach((h) => h.colors.forEach((c) => c !== secondary && dropColor(c)));
  if (!accentColor) {
    // accent was created from harmonies, already cleaned up
  }
  dropColor(error);
  dropColor(warning);
  dropColor(success);
  dropColor(info);

  return {
    primary,
    secondary,
    accent: accentAdjusted,
    background,
    surface,
    text,
    textSecondary,
    border,
    error: errorAdjusted,
    warning: warningAdjusted,
    success: successAdjusted,
    info: infoAdjusted,
  };
}

/**
 * Generate both light and dark themes from a primary color.
 */
export function createDualTheme(
  primaryColor: Color,
  accentColor?: Color,
): { light: ThemeColors; dark: ThemeColors } {
  return {
    light: createTheme({ mode: 'light', primaryColor, accentColor }),
    dark: createTheme({ mode: 'dark', primaryColor, accentColor }),
  };
}

/**
 * Convert a theme to a different color space.
 * Useful for working with themes in a specific color space.
 */
export function convertTheme<S extends ColorSpace>(
  theme: ThemeColors,
  space: S,
): Record<keyof ThemeColors, Color<S>> {
  const result = {} as Record<keyof ThemeColors, Color<S>>;

  for (const [key, color] of Object.entries(theme)) {
    result[key as keyof ThemeColors] = deriveColor(color, space);
  }

  return result;
}

/**
 * Dispose of all colors in a theme to free memory.
 */
export function dropTheme(theme: ThemeColors): void {
  for (const color of Object.values(theme)) {
    dropColor(color);
  }
}
