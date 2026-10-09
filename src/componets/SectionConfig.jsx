import React, { useState } from 'react';
import { calculateContrast, generateHarmonyPalette, isValidHex } from '../utils/contrast';
import { Pipette, Sparkles, Shuffle, Upload, Plus } from 'lucide-react';

export default function SectionConfig({ 
  mode, setMode, 
  primaryColor, setPrimaryColor, 
  backgroundColor, setBackgroundColor,
  palette, setPalette 
}) {
  const [notice, setNotice] = useState('');
  const contrastInfo = calculateContrast(primaryColor, backgroundColor);

  // Selector de color del navegador (EyeDropper API si está disponible)
  const handleEyeDropper = async () => {
    if ('EyeDropper' in window) {
      const eyeDropper = new window.EyeDropper();
      try {
        const result = await eyeDropper.open();
        setPrimaryColor(result.sRGBHex);
        setNotice(`Color capturado: ${result.sRGBHex.toUpperCase()}`);
      } catch (e) {
        if (e.name !== 'AbortError') setNotice('No se pudo capturar el color.');
      }
    } else {
        setNotice('El gotero requiere un navegador compatible.');
    }
  };

  const handleRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setPrimaryColor(randomHex);
    setNotice(`Color aleatorio: ${randomHex.toUpperCase()}`);
  };

  const handleAIGenerate = () => {
    if (!isValidHex(primaryColor)) {
      setNotice('Introduce un color hexadecimal válido para generar una armonía.');
      return;
    }

    const suggestedPalette = generateHarmonyPalette(primaryColor);
    const lightContrast = Number(calculateContrast(suggestedPalette[0], '#FFFFFF').ratio);
    const darkContrast = Number(calculateContrast(suggestedPalette[0], '#111827').ratio);
    setPalette(suggestedPalette);
    setBackgroundColor(lightContrast >= darkContrast ? '#FFFFFF' : '#111827');
    setMode('palette');
    setNotice('Armonía sugerida con reglas de color locales; no se conecta a una API de IA.');
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;

    let image;
    try {
      image = await createImageBitmap(imageFile);
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) throw new Error('Canvas no disponible');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const totals = [0, 0, 0];
      for (let index = 0; index < pixels.length; index += 4) {
        totals[0] += pixels[index];
        totals[1] += pixels[index + 1];
        totals[2] += pixels[index + 2];
      }
      const pixelCount = pixels.length / 4;
      const [red, green, blue] = totals.map((total) => Math.round(total / pixelCount));
      const sampledColor = `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
      setPrimaryColor(sampledColor);
      setNotice(`Muestra promedio de la imagen: ${sampledColor.toUpperCase()}`);
    } catch {
      setNotice('No se pudo leer la imagen. Prueba con otro archivo.');
    } finally {
      image?.close();
      event.target.value = '';
    }
  };

  const addCurrentColor = () => {
    if (!isValidHex(primaryColor) || palette.length >= 8) return;
    if (palette.some((color) => color.toLowerCase() === primaryColor.toLowerCase())) {
      setNotice('Ese color ya está en la paleta.');
      return;
    }
    setPalette([...palette, primaryColor.toUpperCase()]);
    setNotice('Color añadido a la paleta.');
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/60 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
      {/* IZQUIERDA: Puntuación & Porcentaje */}
      <div className="flex flex-col justify-between p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contraste WCAG</span>
          <h2 className="text-5xl font-black mt-2 text-white">{contrastInfo.ratio ? `${contrastInfo.ratio}:1` : '--'}</h2>
          <p className={`text-sm font-medium mt-1 ${contrastInfo.normalAA ? 'text-emerald-400' : 'text-amber-300'}`}>
            {!contrastInfo.ratio ? 'Hexadecimal no válido' : contrastInfo.normalAA ? 'Texto normal: cumple AA' : 'Texto normal: no cumple AA'}
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-700/50 space-y-2 text-xs text-slate-400">
          <p className="flex justify-between">AA texto grande <span className={contrastInfo.largeAA ? 'text-emerald-400' : 'text-slate-500'}>{contrastInfo.largeAA ? 'Cumple' : 'No cumple'}</span></p>
          <p className="flex justify-between">AAA texto normal <span className={contrastInfo.aaa ? 'text-emerald-400' : 'text-slate-500'}>{contrastInfo.aaa ? 'Cumple' : 'No cumple'}</span></p>
        </div>
      </div>

      {/* CENTRO: Gotero, Imagen, Random & IA */}
      <div className="flex flex-col justify-between space-y-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <h3 className="text-sm font-semibold text-slate-300">Herramientas de color</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleEyeDropper}
            className="flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm transition">
            <Pipette size={18} /> Gotero
          </button>

          <button 
            onClick={handleRandomColor}
            className="flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm transition">
            <Shuffle size={18} /> Azar
          </button>
        </div>

          <button 
          onClick={handleAIGenerate}
          className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-500/20">
          <Sparkles size={18} /> Sugerir armonía
        </button>

        <label className="flex items-center justify-center gap-2 p-2 border border-dashed border-slate-600 hover:border-slate-400 rounded-xl text-xs text-slate-400 cursor-pointer transition">
          <Upload size={14} /> Extraer color de imagen
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
        <p role="status" aria-live="polite" className="min-h-8 text-xs text-slate-400">{notice}</p>
      </div>

      {/* DERECHA: Configuración (1 color vs Paleta) */}
      <div className="flex flex-col justify-between p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div>
          <div className="flex bg-slate-900 p-1 rounded-xl mb-4">
            <button 
              onClick={() => setMode('single')}
              className={`flex-1 py-1.5 text-xs rounded-lg transition ${mode === 'single' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
              Un Color
            </button>
            <button 
              onClick={() => setMode('palette')}
              className={`flex-1 py-1.5 text-xs rounded-lg transition ${mode === 'palette' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
              Paleta
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Color Principal / Texto</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={isValidHex(primaryColor) ? primaryColor : '#000000'} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" 
                />
                <input 
                  type="text" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  aria-label="Código hexadecimal del color principal"
                  aria-invalid={!isValidHex(primaryColor)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 text-sm font-mono text-white" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Fondo</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={isValidHex(backgroundColor) ? backgroundColor : '#000000'} 
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" 
                />
                <input 
                  type="text" 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  aria-label="Código hexadecimal del fondo"
                  aria-invalid={!isValidHex(backgroundColor)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 text-sm font-mono text-white" 
                />
              </div>
            </div>
          </div>

          {mode === 'palette' && (
            <div className="mt-5 border-t border-slate-700/50 pt-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">Colores de la paleta</span>
                <button onClick={addCurrentColor} disabled={!isValidHex(primaryColor) || palette.length >= 8} className="flex items-center gap-1 text-xs text-cyan-300 disabled:text-slate-600">
                  <Plus size={14} /> Añadir actual
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {palette.map((color, index) => (
                  <div key={`${color}-${index}`} className="flex items-center gap-1 rounded-lg bg-slate-900 p-1">
                    <button onClick={() => setPrimaryColor(color)} title={`Usar ${color}`} aria-label={`Seleccionar ${color}`} className={`h-7 w-7 rounded-md border-2 ${color.toLowerCase() === primaryColor.toLowerCase() ? 'border-white' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                    <button
                      onClick={() => setPalette(palette.filter((_, colorIndex) => colorIndex !== index))}
                      disabled={palette.length <= 1}
                      title={`Quitar ${color} de la paleta`}
                      aria-label={`Quitar ${color} de la paleta`}
                      className="px-1 text-xs text-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}