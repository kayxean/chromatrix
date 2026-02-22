# Chromatrix

A small, heavy-duty color engine. Most libraries prioritize ease of use at the cost of accuracy or memory. This one uses `Float32Array` buffers and CIEXYZ hubs to ensure conversions are mathematically sound without trashing your heap.

## The Core Logic

Color math is messy because different spaces use different reference points. To solve this, every conversion passes through a central hub.
- **Conversion**: Moves data between `rgb`, `hsl`, `hwb`, `lab`, `lch`, `oklab`, and `oklch`.
- **Parsing**: Reads CSS strings (hex, functional notation, and modern spaces).
- **Formatting**: Outputs color objects as standard CSS strings.
- **Contrast**: Calculates APCA *Lc* values for text and background pairs.
- **Palettes**: Generates harmonies and scales using perceptual interpolation.
- **Gamut**: Detects out-of-bounds colors and clamps them to a valid range.
- **Pickers**: Maps 2D UI coordinates to HSVA values for color selection.
- **Vision**: Simulates color-blindness by projecting into reduced color spaces.

## Usage

### Color Conversion

Direct transformations are handled through a chain of adapters. The system automatically determines if it can take a direct path or if it needs to route through a CIEXYZ hub.

```ts
import { convertColor, convertHue } from './convert';
import { createMatrix, dropMatrix } from './shared';

const input = createMatrix('rgb');
const output = createMatrix('oklch');
input.set([1, 0, 0]); 

// Routes: RGB -> LRGB -> XYZ65 -> Oklab -> Oklch
convertColor(input, output, 'rgb', 'oklch');

// Quickly move a color to its native polar space (e.g., Lab -> Lch)
const polar = createMatrix('lch');
convertHue(input, polar, 'lab');

dropMatrix(input);
dropMatrix(output);
dropMatrix(polar);
```

### Matrix Management

Everything is built on a `Color` object containing a `Float32Array`. To keep performance high, we use a pool. You can either mutate in-place or derive new copies, but you must manually free them when finished.

```ts
import { createColor, mutateColor, deriveColor, dropColor } from './shared';

const color = createColor('rgb', [0.8, 0.1, 0.2]);

// In-place conversion to avoid new allocations
mutateColor(color, 'oklch');

// Create a separate copy in another space
const copy = deriveColor(color, 'hsl');

// Always return the buffer to the pool
dropColor(color);
dropColor(copy);
```

### CSS Integration

Parsing returns a managed color object. Formatting returns a standard string.

```ts
import { parseColor } from './parse';
import { formatCss } from './format';

const color = parseColor('oklch(60% 0.15 30)');
const css = formatCss(color); // "oklch(60% 0.15 30)"
```

### Contrast & Accessibility

Forget the old WCAG ratio. This uses APCA to calculate a signed *Lc* value based on font weight and background luminance.

```ts
import { checkContrast, matchContrast } from './utils/contrast';

const text = parseColor('#ffffff');
const bg = parseColor('#222222');

// Get the Lc value
const score = checkContrast(text, bg); 

// Shift text lightness until it meets a target of 75 Lc
const safeColor = matchContrast(text, bg, 75);
```

### Generative Tools

Interpolation happens in polar space for smoother, more "natural" color shifts.

```ts
import { createHarmony, createScales } from './utils/palette';

const base = parseColor('#007bff');

// Harmony: Generate analogous neighbors
const neighbors = createHarmony(base, [{ name: 'analogous', ratios: [-30, 30] }]);

// Scales: Interpolate through multiple points
const ramp = createScales([
  parseColor('#ff0000'), 
  parseColor('#0000ff')
], 5);
```

### Safety & Comparison

Colors that look the same in different spaces are treated as equal through a perceptual tolerance threshold.

```ts
import { checkGamut, clampColor } from './utils/gamut';
import { isEqual } from './utils/compare';

const wideColor = parseColor('oklch(90% 0.4 120)');

if (!checkGamut(wideColor)) {
  clampColor(wideColor); // Moves it to the closest valid RGB edge
}

// Compare different spaces perceptually
const match = isEqual(parseColor('#f00'), parseColor('hsl(0, 100%, 50%)'));
```

### Interactive Pickers

Building a UI requires bridging flat values (like slider percentages) to complex matrices. The `createPicker` utility handles the math and the state sync.

```tsx
import { createPicker } from './utils/picker';
import { parseColor } from './parse';

const picker = createPicker(parseColor('#32cd32'));

function ColorPicker() {
  const [view, setView] = useState(() => picker.getValue());
  
  useEffect(() => picker.subscribe(setView), []);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    // update() handles the coordinate-to-HSV mapping and y-axis inversion
    picker.update(
      (e.clientX - rect.left) / rect.width, 
      (e.clientY - rect.top) / rect.height, 
      'sv'
    );
  }

  return (
    <div onMouseMove={handleMove} className="picker-container">
      <div className="cursor" style={{
        left: `${view.s * 100}%`,
        top: `${(1 - view.v) * 100}%`
      }} />
    </div>
  );
}
```

### Vision Simulation

Simulates how colors appear under Protanopia, Deuteranopia, or Tritanopia by projecting matrices into reduced color spaces.

```ts
import { simulateDeficiency } from './utils/simulate';

const original = parseColor('#ff5500');
const simulated = simulateDeficiency(original, 'deuteranopia');
```

## The Math

Rather than writing thousands of individual conversion formulas, this library uses a *Hub* and *Bridge* architecture.
- **The Hubs**: Modern spaces (`rgb`, `oklab`) target **CIEXYZ D65**. Reference spaces (`lab`, `lch`) target **CIEXYZ D50**.
- **The Bridge**: When moving between hubs, we use a **Bradford CAT** (Chromatic Adaptation Transform). This prevents the "color shift" usually seen when switching between D50 and D65 standards.

By using a `Float32Array` pool, the library performs these complex matrix multiplications without triggering the garbage collector.
