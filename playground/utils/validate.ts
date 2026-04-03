const VALID_SPACES = new Set([
  'rgb',
  'hsl',
  'hsv',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'lrgb',
  'xyz50',
  'xyz65',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d65',
  'xyz-d50',
]);

const SPLIT_RE = /[\s,/]+/;

function isHexChar(code: number): boolean {
  return (code >= 48 && code <= 57) || (code >= 97 && code <= 102);
}

function isNumber(str: string): boolean {
  const len = str.length;
  if (len === 0) return false;
  let i = 0;
  if (str.charCodeAt(0) === 45) i++;
  if (i >= len) return false;
  let hasDigit = false;
  while (i < len) {
    const c = str.charCodeAt(i);
    if (c >= 48 && c <= 57) {
      hasDigit = true;
    } else if (c !== 46 && c !== 37) {
      return false;
    }
    i++;
  }
  return hasDigit;
}

export function isValidColor(css: string): boolean {
  const len = css.length;
  if (len === 0) return false;

  const firstChar = css.charCodeAt(0);

  if (firstChar === 35) {
    const hex = css.length === 4 || css.length === 7 ? css : css.trim();
    const hexLen = hex.length - 1;
    if (hexLen !== 3 && hexLen !== 4 && hexLen !== 6 && hexLen !== 8) return false;

    for (let i = 1; i <= hexLen; i++) {
      if (!isHexChar(hex.charCodeAt(i))) return false;
    }
    return true;
  }

  const trimmed = css.trim();
  if (trimmed.length === 0) return false;

  const openParen = trimmed.indexOf('(');
  if (openParen === -1) return false;

  const closeParen = trimmed.lastIndexOf(')');
  const name = trimmed.slice(0, openParen).toLowerCase();
  const content = trimmed.slice(openParen + 1, closeParen);

  const parts = content.split(SPLIT_RE).filter(Boolean);

  let space: string;
  if (name === 'color') {
    if (parts.length < 2) return false;
    space = parts[0].toLowerCase();
  } else {
    const baseLen = name.length;
    space = baseLen > 3 && name.charCodeAt(baseLen - 1) === 97 ? name.slice(0, -1) : name;
  }

  if (!VALID_SPACES.has(space)) return false;

  const offset = name === 'color' ? 1 : 0;
  if (parts.length < offset + 3) return false;

  for (let i = offset; i < offset + 3; i++) {
    if (!isNumber(parts[i])) return false;
  }

  return true;
}
