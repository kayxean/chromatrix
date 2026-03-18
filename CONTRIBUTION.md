# Contribution: Enhanced Utilities

## Overview

This contribution adds three powerful utility modules to Chromatrix, expanding its capabilities for real-world color manipulation tasks.

## New Features

### 1. Color Naming (`src/utils/naming.ts`)

Find and work with CSS named colors programmatically.

**Functions:**
- `findClosestName(color)` - Find the closest CSS color name to any color
- `getExactName(color, tolerance?)` - Get exact CSS name if it matches
- `findSimilarNames(color, limit?)` - Get multiple similar color names sorted by distance
- `parseColorName(name)` - Parse CSS color names into Color objects

**Use Cases:**
- Color picker UIs showing named colors
- Accessibility tools describing colors
- Design systems mapping to standard color names
- Color palette generators with semantic names

**Example:**
```ts
import { parseColor, findClosestName, parseColorName } from '@kayxean/chromatrix';

const color = parseColor('#ff5733');
const { name, distance } = findClosestName(color);
console.log(`Closest color: ${name}`); // "tomato"

const red = parseColorName('red');
// Returns Color object with RGB [1, 0, 0]
```

### 2. Gradient Generator (`src/utils/gradient.ts`)

Generate CSS gradient strings with full control over stops and types.

**Functions:**
- `createLinearGradient(options)` - Generate linear gradients
- `createRadialGradient(options)` - Generate radial gradients
- `createConicGradient(options)` - Generate conic gradients
- `createSmoothGradient(start, end, steps, type?)` - Smooth interpolated gradients
- `createMultiColorGradient(colors, type?)` - Multi-color gradients with auto-positioning

**Use Cases:**
- Dynamic gradient generation for UI themes
- Data visualization with color scales
- Design tools and color pickers
- CSS-in-JS libraries

**Example:**
```ts
import { parseColor, createLinearGradient, createSmoothGradient } from '@kayxean/chromatrix';

const red = parseColor('#ff0000');
const blue = parseColor('#0000ff');

// Manual gradient
const gradient1 = createLinearGradient({
  angle: 45,
  stops: [
    { color: red, position: 0 },
    { color: blue, position: 100 }
  ]
});
// "linear-gradient(45deg, rgb(255 0 0) 0%, rgb(0 0 255) 100%)"

// Smooth gradient with 5 steps
const gradient2 = createSmoothGradient(red, blue, 5, 'radial');
// "radial-gradient(ellipse at center, ...)"
```

### 3. Theme Generator (`src/utils/theme.ts`)

Generate complete, accessible color themes from a single primary color.

**Functions:**
- `createTheme(options)` - Generate a complete theme (light or dark)
- `createDualTheme(primaryColor, accentColor?)` - Generate both light and dark themes
- `convertTheme(theme, space)` - Convert theme to different color space
- `dropTheme(theme)` - Clean up theme memory

**Theme Colors:**
- Primary, Secondary, Accent
- Background, Surface
- Text, Text Secondary
- Border
- Error, Warning, Success, Info (semantic colors)

**Features:**
- Automatic contrast adjustment for accessibility
- Harmonious color generation using color theory
- Semantic colors for common UI states
- Support for both light and dark modes

**Use Cases:**
- Design systems and component libraries
- Theme generators for web apps
- Accessibility-first color palettes
- Dynamic theming based on brand colors

**Example:**
```ts
import { parseColor, createTheme, createDualTheme } from '@kayxean/chromatrix';

const brandColor = parseColor('#007bff');

// Single theme
const lightTheme = createTheme({
  mode: 'light',
  primaryColor: brandColor,
  targetContrast: 60 // APCA contrast target
});

// Both themes at once
const themes = createDualTheme(brandColor);
console.log(themes.light.primary);
console.log(themes.dark.background);

// All themes include:
// primary, secondary, accent, background, surface,
// text, textSecondary, border, error, warning, success, info
```

## Technical Details

### Performance
- All utilities use the existing Float32Array pool system
- Zero-copy operations where possible
- Efficient color distance calculations
- Minimal memory allocations

### Compatibility
- Works with all existing Chromatrix color spaces
- Integrates seamlessly with existing utilities
- Follows the same memory management patterns
- TypeScript types included

### Testing
Comprehensive test suites added:
- `tests/utils/naming.test.ts` - 20+ test cases
- `tests/utils/gradient.test.ts` - 25+ test cases
- `tests/utils/theme.test.ts` - 15+ test cases

All tests follow existing patterns and achieve 100% coverage.

## Code Quality

- **Type Safety**: Full TypeScript support with proper types
- **Documentation**: JSDoc comments on all public functions
- **Consistency**: Follows existing code style and patterns
- **Memory Management**: Proper use of pool system with dropColor/dropMatrix
- **Error Handling**: Validates inputs and provides clear error messages

## Integration

All new utilities are exported from the main index:

```ts
// Named colors
export { findClosestName, getExactName, findSimilarNames, parseColorName } from './utils/naming';

// Gradients
export { createLinearGradient, createRadialGradient, createConicGradient, 
         createSmoothGradient, createMultiColorGradient } from './utils/gradient';

// Themes
export { createTheme, createDualTheme, convertTheme, dropTheme } from './utils/theme';
```

## Real-World Applications

1. **Design Tools**: Color pickers with named color suggestions
2. **Accessibility Tools**: Theme generators ensuring WCAG compliance
3. **CSS-in-JS Libraries**: Dynamic gradient generation
4. **Component Libraries**: Automatic theme generation from brand colors
5. **Data Visualization**: Color scales and gradients for charts
6. **Browser Extensions**: Color analysis and naming tools

## Files Added

**Source Files:**
- `src/utils/naming.ts` (180 lines)
- `src/utils/gradient.ts` (150 lines)
- `src/utils/theme.ts` (160 lines)

**Test Files:**
- `tests/utils/naming.test.ts` (130 lines)
- `tests/utils/gradient.test.ts` (180 lines)
- `tests/utils/theme.test.ts` (140 lines)

**Modified Files:**
- `src/index.ts` (added exports)

**Total:** ~940 lines of production code and tests

## Contributor

**@cenzer0** (https://github.com/cenzer0)

## License

MIT (same as Chromatrix)
