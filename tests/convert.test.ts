import type { ColorAdapter, ColorSpace } from '~/types';
import { describe, expect, it } from 'vitest';
import { lrgbToRgb } from '~/adapters/gamma';
import { applyAdapter, convertColor, convertHue } from '~/convert';
import { createMatrix, dropMatrix } from '~/shared';

describe('Conversion Engine (convert.ts)', () => {
  it('should handle the identity path (from === to)', () => {
    const input = createMatrix('rgb');
    input.set([1, 0.5, 0]);
    const output = createMatrix('rgb');

    // Simple case: no conversion needed, should perform a buffer set
    convertColor(input, output, 'rgb', 'rgb');
    expect(output[0]).toBe(1);
    expect(output[1]).toBe(0.5);

    // Verify in-place identity does nothing and remains stable
    convertColor(input, input, 'rgb', 'rgb');
    expect(input[0]).toBe(1);

    dropMatrix(input);
    dropMatrix(output);
  });

  it('should use DIRECT_HUB for same-model shortcuts (RGB -> HSL)', () => {
    /**
     * Certain spaces share a common model (sRGB).
     * The engine should detect this and bypass the XYZ hub for performance.
     */
    const rgb = createMatrix('rgb');
    rgb.set([1, 0, 0]);
    const hsl = createMatrix('hsl');

    convertColor(rgb, hsl, 'rgb', 'hsl');

    expect(hsl[0]).toBe(0); // Hue
    expect(hsl[1]).toBe(1); // Saturation
    expect(hsl[2]).toBe(0.5); // Lightness

    dropMatrix(rgb);
    dropMatrix(hsl);
  });

  it('should handle complex Hub paths with CAT (Lab to Oklab)', () => {
    /**
     * This exercises the full conversion pipeline:
     * 1. Lab (D50) -> XYZ D50
     * 2. XYZ D50 -> Bradford CAT -> XYZ D65
     * 3. XYZ D65 -> Oklab (D65)
     */
    const lab = createMatrix('lab');
    lab.set([50, 20, 10]);
    const oklab = createMatrix('oklab');

    convertColor(lab, oklab, 'lab', 'oklab');

    // Values should be normalized within standard perceptual bounds
    expect(oklab[0]).toBeGreaterThan(0);
    expect(oklab[0]).toBeLessThan(1);

    dropMatrix(lab);
    dropMatrix(oklab);
  });

  it('should handle direct spaces as Hubs using valid literals', () => {
    /**
     * Verifies the fallback logic when a space is its own hub (e.g., XYZ65).
     * This ensures the engine doesn't try to find a conversion path to itself.
     */
    const xyz = createMatrix('xyz65');
    xyz.set([0.95047, 1.0, 1.08883]);
    const rgb = createMatrix('rgb');

    const fromSpace: ColorSpace = 'xyz65';
    convertColor(xyz, rgb, fromSpace, 'rgb');

    // D65 White point should map back to white in sRGB
    expect(rgb[0]).toBeCloseTo(1, 3);

    dropMatrix(xyz);
    dropMatrix(rgb);
  });

  it('convertColor should handle the D50 to D65 chromatic adaptation path', () => {
    /**
     * Path: xyz50 -> CAT -> xyz65
     * Forces the 'else' branch of the sourceHub === 'xyz65' check.
     */
    const xyz50 = createMatrix('xyz50');
    xyz50.set([0.9642, 1.0, 0.8249]); // D50 White point
    const xyz65 = createMatrix('xyz65');

    convertColor(xyz50, xyz65, 'xyz50', 'xyz65');

    // Should result in D65 White point
    expect(xyz65[0]).toBeCloseTo(0.9504, 3);
    expect(xyz65[2]).toBeCloseTo(1.0888, 3);

    dropMatrix(xyz50);
    dropMatrix(xyz65);
  });

  it('convertColor should handle D65 to D50 chromatic adaptation', () => {
    /**
     * Path: oklab (D65) -> xyz65 -> CAT -> xyz50 -> lab (D50)
     * Triggers the (sourceHub === 'xyz65') branch for CAT.
     */
    const oklab = createMatrix('oklab');
    oklab.set([1, 0, 0]); // White
    const lab = createMatrix('lab');

    convertColor(oklab, lab, 'oklab', 'lab');

    // D65 White oklab [1,0,0] should become D50 White lab [100,0,0]
    expect(lab[0]).toBeCloseTo(100, 1);
    dropMatrix(oklab);
    dropMatrix(lab);
  });

  it('convertColor should skip hub copy when input and output are the same', () => {
    /**
     * Triggers the "else if (input !== output)" bypass for hub assignments.
     * Uses a space that is its own hub (xyz65) and the same matrix reference.
     */
    const xyz = createMatrix('xyz65');
    xyz.set([0.5, 0.5, 0.5]);

    convertColor(xyz, xyz, 'xyz65', 'xyz65');

    expect(xyz[0]).toBe(0.5);
    dropMatrix(xyz);
  });

  it('convertColor should bypass hub-set when source is hub and input is output', () => {
    /**
     * from='xyz65' means toHubChain is undefined.
     * input === output means the (input !== output) branch is skipped.
     */
    const xyz = createMatrix('xyz65');
    xyz.set([0.5, 0.5, 0.5]);

    // Converting xyz65 to oklab in-place
    convertColor(xyz, xyz, 'xyz65', 'oklab');

    expect(xyz[0]).not.toBe(0.5);
    dropMatrix(xyz);
  });

  it('convertHue should map correctly or copy if no polar target exists', () => {
    /**
     * Specialized utility for operations like 'color-mix'
     * that specifically need to isolate the hue component.
     */
    const rgb = createMatrix('rgb');
    rgb.set([1, 0, 0]);
    const hsl = createMatrix('hsl');

    // Valid polar conversion (RGB -> HSL -> Extract H)
    convertHue(rgb, hsl, 'rgb');
    expect(hsl[0]).toBe(0);

    // If the space isn't polar (like XYZ), it should just copy values.
    const xyz = createMatrix('xyz65');
    xyz.set([0.5, 0.5, 0.5]);
    const output = createMatrix('xyz65');

    convertHue(xyz, output, 'xyz65');
    expect(output[0]).toBe(0.5);

    dropMatrix(rgb);
    dropMatrix(hsl);
    dropMatrix(xyz);
    dropMatrix(output);
  });

  it('convertHue should handle in-place identity when no polar target exists', () => {
    /**
     * Covers the branch where targetPolar is missing AND input === output.
     * Ensures stability for non-polar in-place operations.
     */
    const xyz = createMatrix('xyz65');
    xyz.set([0.5, 0.5, 0.5]);

    convertHue(xyz, xyz, 'xyz65');
    expect(xyz[0]).toBe(0.5);

    dropMatrix(xyz);
  });

  it('applyAdapter should handle empty, single, and multi chains', () => {
    /**
     * Tests the low-level adapter sequencer which uses a temporary 'scratchpad'
     * matrix to handle chains of 3 or more transformations.
     */
    const input = createMatrix('rgb');
    input.set([0.5, 0.5, 0.5]);
    const output = createMatrix('rgb');

    // Empty chain: different matrices covers the .set() call
    applyAdapter([], input, output);
    expect(output[0]).toBe(0.5);

    // Empty chain: same matrix covers the identity/return branch
    applyAdapter([], input, input);
    expect(input[0]).toBe(0.5);

    // Single step: applies transformation directly to the output
    const singleStep: ColorAdapter[] = [lrgbToRgb];
    applyAdapter(singleStep, input, output);
    expect(output[0]).not.toBe(0.5);

    // Multi-step (3+): forces scratchpad logic and internal for-loop execution
    input.set([0.5, 0.5, 0.5]);
    const multiStep: ColorAdapter[] = [lrgbToRgb, lrgbToRgb, lrgbToRgb];
    applyAdapter(multiStep, input, output);
    expect(output[0]).toBeGreaterThan(0);

    dropMatrix(input);
    dropMatrix(output);
  });
});
