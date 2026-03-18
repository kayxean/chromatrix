import type { Color } from '../types';
import { formatCss } from '../format';
import { createShades } from './palette';

export type GradientType = 'linear' | 'radial' | 'conic';

export type GradientStop = {
  color: Color;
  position?: number; // 0-100
};

export type LinearGradientOptions = {
  angle?: number; // degrees, default 180 (top to bottom)
  stops: GradientStop[];
};

export type RadialGradientOptions = {
  shape?: 'circle' | 'ellipse';
  position?: string; // e.g., 'center', 'top left', '50% 50%'
  stops: GradientStop[];
};

export type ConicGradientOptions = {
  angle?: number; // degrees, default 0
  position?: string; // e.g., 'center', '50% 50%'
  stops: GradientStop[];
};

/**
 * Generate a CSS linear-gradient string from color stops.
 */
export function createLinearGradient(options: LinearGradientOptions): string {
  const { angle = 180, stops } = options;
  const stopStrings = stops.map((stop) => {
    const colorStr = formatCss(stop.color);
    return stop.position !== undefined ? `${colorStr} ${stop.position}%` : colorStr;
  });

  return `linear-gradient(${angle}deg, ${stopStrings.join(', ')})`;
}

/**
 * Generate a CSS radial-gradient string from color stops.
 */
export function createRadialGradient(options: RadialGradientOptions): string {
  const { shape = 'ellipse', position = 'center', stops } = options;
  const stopStrings = stops.map((stop) => {
    const colorStr = formatCss(stop.color);
    return stop.position !== undefined ? `${colorStr} ${stop.position}%` : colorStr;
  });

  return `radial-gradient(${shape} at ${position}, ${stopStrings.join(', ')})`;
}

/**
 * Generate a CSS conic-gradient string from color stops.
 */
export function createConicGradient(options: ConicGradientOptions): string {
  const { angle = 0, position = 'center', stops } = options;
  const stopStrings = stops.map((stop) => {
    const colorStr = formatCss(stop.color);
    return stop.position !== undefined ? `${colorStr} ${stop.position}%` : colorStr;
  });

  return `conic-gradient(from ${angle}deg at ${position}, ${stopStrings.join(', ')})`;
}

/**
 * Generate a smooth gradient with evenly distributed stops between two colors.
 */
export function createSmoothGradient(
  start: Color,
  end: Color,
  steps: number,
  type: GradientType = 'linear',
  options?: { angle?: number; shape?: 'circle' | 'ellipse'; position?: string },
): string {
  const shades = createShades(start, end, steps);
  const stops: GradientStop[] = shades.map((color, i) => ({
    color,
    position: (i / (steps - 1)) * 100,
  }));

  let result: string;
  if (type === 'linear') {
    result = createLinearGradient({ angle: options?.angle, stops });
  } else if (type === 'radial') {
    result = createRadialGradient({
      shape: options?.shape,
      position: options?.position,
      stops,
    });
  } else {
    result = createConicGradient({ angle: options?.angle, position: options?.position, stops });
  }

  // Clean up
  shades.forEach((s) => {
    // Note: Colors are managed by the pool, but we don't drop them here
    // because they're still referenced in the stops array
  });

  return result;
}

/**
 * Generate a multi-color gradient with automatic position distribution.
 */
export function createMultiColorGradient(
  colors: Color[],
  type: GradientType = 'linear',
  options?: { angle?: number; shape?: 'circle' | 'ellipse'; position?: string },
): string {
  if (colors.length === 0) {
    throw new Error('At least one color is required');
  }

  if (colors.length === 1) {
    return formatCss(colors[0]);
  }

  const stops: GradientStop[] = colors.map((color, i) => ({
    color,
    position: (i / (colors.length - 1)) * 100,
  }));

  if (type === 'linear') {
    return createLinearGradient({ angle: options?.angle, stops });
  }

  if (type === 'radial') {
    return createRadialGradient({
      shape: options?.shape,
      position: options?.position,
      stops,
    });
  }

  return createConicGradient({ angle: options?.angle, position: options?.position, stops });
}
