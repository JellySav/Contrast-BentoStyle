export function isValidHex(hex) {
  return /^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(hex);
}

export function hexToRgb(hex) {
  if (!isValidHex(hex)) return null;
  let value = hex.slice(1);
  if (value.length === 3) value = [...value].map((digit) => digit + digit).join('');
  const number = Number.parseInt(value, 16);
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
}

function getLuminance([red, green, blue]) {
  const channels = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

export function calculateContrast(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return { ratio: null, normalAA: false, largeAA: false, aaa: false };

  const luminance1 = getLuminance(rgb1);
  const luminance2 = getLuminance(rgb2);
  const ratio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);

  return {
    ratio: ratio.toFixed(2),
    normalAA: ratio >= 4.5,
    largeAA: ratio >= 3,
    aaa: ratio >= 7,
  };
}

function hslToHex(hue, saturation, lightness) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const section = hue / 60;
  const second = chroma * (1 - Math.abs((section % 2) - 1));
  const match = lightness - chroma / 2;
  const channels = section < 1 ? [chroma, second, 0]
    : section < 2 ? [second, chroma, 0]
      : section < 3 ? [0, chroma, second]
        : section < 4 ? [0, second, chroma]
          : section < 5 ? [second, 0, chroma]
            : [chroma, 0, second];

  return `#${channels.map((channel) => Math.round((channel + match) * 255)
    .toString(16).padStart(2, '0')).join('')}`;
}

export function generateHarmonyPalette(hex) {
  const [red, green, blue] = hexToRgb(hex) || [99, 102, 241];
  const redValue = red / 255;
  const greenValue = green / 255;
  const blueValue = blue / 255;
  const maximum = Math.max(redValue, greenValue, blueValue);
  const minimum = Math.min(redValue, greenValue, blueValue);
  const difference = maximum - minimum;
  const lightness = (maximum + minimum) / 2;
  let hue = 0;
  let saturation = 0;

  if (difference) {
    saturation = difference / (1 - Math.abs(2 * lightness - 1));
    if (maximum === redValue) hue = ((greenValue - blueValue) / difference) % 6;
    else if (maximum === greenValue) hue = (blueValue - redValue) / difference + 2;
    else hue = (redValue - greenValue) / difference + 4;
    hue = (hue * 60 + 360) % 360;
  }

  const adjustedSaturation = Math.max(0.32, Math.min(saturation, 0.78));
  const adjustedLightness = Math.max(0.38, Math.min(lightness, 0.62));
  return [0, 32, -32, 180].map((offset) =>
    offset === 0 ? hex.toUpperCase() : hslToHex((hue + offset + 360) % 360, adjustedSaturation, adjustedLightness));
}