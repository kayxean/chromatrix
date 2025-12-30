import type { ColorSpace } from '~/types';
import { rgbToHex } from '~/adapters/srgb';
import { createHarmony, createScales, createShades } from '~/interpolate';

const colorBlock = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `\x1b[48;2;${r};${g};${b}m   \x1b[0m`;
};

const runVisualRandomTest = () => {
  const baseRgb = [Math.random(), Math.random(), Math.random()] as ColorSpace<'rgb'>;
  const harmonies = [
    { name: 'Compl', ratios: [0, 180] },
    { name: 'Analogous', ratios: [-30, 0, 30] },
    { name: 'Triadic', ratios: [0, 120, 240] },
    { name: 'Adjacent', ratios: [0, 150, 210] },
    { name: 'Tetradic', ratios: [0, 90, 180, 270] },
    { name: 'Rectangle', ratios: [0, 60, 180, 240] },
  ];

  const harmonyResults = harmonies.map((h) => createHarmony(baseRgb, 'rgb', [h])[0]);
  const harmonyRow = harmonyResults.map((h) => h.colors.map((c) => colorBlock(rgbToHex(c))).join('')).join('   ');
  const labelRow = harmonyResults.map((h) => h.name.padEnd(h.colors.length * 3 + 3)).join('');

  console.log(`${harmonyRow}`);
  console.log(`${labelRow}\n`);

  const s1 = [Math.random() * 360, 0.8, 0.5] as ColorSpace<'hsl'>;
  const s2 = [Math.random() * 360, 0.8, 0.5] as ColorSpace<'hsl'>;

  const shades = createShades(s1, s2, 'hsl', 5);
  const shadeHexes = shades.map((c) => rgbToHex(c as any));

  console.log(`${shadeHexes.map((h) => colorBlock(h)).join(' ')}`);
  console.log(`${shadeHexes.map((h) => h.toLowerCase()).join('  ')}\n`);

  const cLeft = [Math.random(), 0.2, 0.2] as ColorSpace<'rgb'>;
  const cMid = [1, 1, 1] as ColorSpace<'rgb'>;
  const cRight = [0.2, 0.2, Math.random()] as ColorSpace<'rgb'>;
  const scaleHexes = createScales([cLeft, cMid, cRight], 'rgb', 9).map((c) => rgbToHex(c));

  console.log(`${scaleHexes.map((h) => colorBlock(h)).join('')}`);
  console.log(`${scaleHexes[0]} (Start)  ➜  ${scaleHexes[4]} (Anchor)  ➜  ${scaleHexes[8]} (End)\n`);
};

runVisualRandomTest();
