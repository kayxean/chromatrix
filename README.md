# Color Manipulation Library

A lightweight and powerful TypeScript library for color conversions, manipulations, and interpolations.

## Features

- **Color Parsing:** Parse CSS color strings (`#rgb`, `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`).
- **Color Conversion:** Convert colors between various color spaces (RGB, HSL, HWB, LAB, LCH, OKLAB, OKLCH).
- **Color Interpolation:**
    - Create harmonious color palettes.
    - Generate color shades between two colors.
    - Create color scales from multiple color stops.
- **CSS Output:** Format colors into CSS-compatible strings.
- **Type-Safe:** Written in TypeScript for robust, type-safe operations.

## Installation

To get started, clone the repository and install the dependencies using `pnpm`:

```bash
git clone https://github.com/kayxean/color.git

cd color

pnpm install
```

## Usage

### Building the Library

To build the library, run the following command:

```bash
pnpm build
```

This will compile the TypeScript source files into JavaScript in the `dist` directory.

### Running Tests

To ensure everything is working correctly, you can run the test suite. The tests will build the project and then execute a set of test cases.

```bash
pnpm build

node dist/index.mjs

node dist/palette.mjs
```

This will run a random test from the test suite. To run all tests, you can modify `test/index.ts` to call `inspectColor(true)`.

## Core Functions

- `parseColor(css: string)`: Parses a CSS color string.
- `convertColor(color, from, to)`: Converts a color from one color space to another.
- `createHarmony(color, mode, variants)`: Creates color harmonies.
- `createShades(start, end, mode, steps)`: Creates shades between two colors.
- `createScales(stops, mode, steps)`: Creates a scale from multiple color stops.
- `parseCss(mode, values)`: Formats a color into a CSS string.
