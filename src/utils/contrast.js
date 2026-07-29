// Convierte Hex a RGB
export function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return [ (num >> 16) & 255, (num >> 8) & 255, num & 255 ];
}

// Calcula la luminancia relativa
function getLuminance([r, g, b]) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calcula el ratio de contraste (entre 1:1 y 21:1) y un porcentaje simbólico
export function calculateContrast(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  // Normalizar ratio 21:1 a 0 - 100%
  const percentage = Math.min(Math.round((ratio / 21) * 100), 100);
  
  let score = 'Malo';
  if (ratio >= 7) score = 'Excelente (AAA)';
  else if (ratio >= 4.5) score = 'Bueno (AA)';
  else if (ratio >= 3) score = 'Aceptable (AA Large)';

  return { ratio: ratio.toFixed(2), percentage, score };
}