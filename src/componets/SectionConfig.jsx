import React from 'react';
import { calculateContrast } from '../utils/contrast';
import { Pipette, Sparkles, Shuffle, Upload } from 'lucide-react';

export default function SectionConfig({ 
  mode, setMode, 
  primaryColor, setPrimaryColor, 
  backgroundColor, setBackgroundColor,
  palette, setPalette 
}) {
  const contrastInfo = calculateContrast(primaryColor, backgroundColor);

  // Selector de color del navegador (EyeDropper API si está disponible)
  const handleEyeDropper = async () => {
    if ('EyeDropper' in window) {
      const eyeDropper = new window.EyeDropper();
      try {
        const result = await eyeDropper.open();
        setPrimaryColor(result.sRGBHex);
      } catch (e) {
        console.log('Gotero cancelado');
      }
    } else {
      alert('Tu navegador no soporta la API de Gotero directo.');
    }
  };

  const handleRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setPrimaryColor(randomHex);
  };

  const handleAIGenerate = () => {
    // Simulación de IA (Aquí puedes conectar la API de OpenAI / Gemini)
    const aiPalettes = [
      ['#00F2FE', '#4FACFE', '#000000', '#FFFFFF'],
      ['#FF0844', '#FFB199', '#1E1E24', '#FFF8F0'],
      ['#F12711', '#F5AF19', '#111827', '#F9FAFB']
    ];
    const picked = aiPalettes[Math.floor(Math.random() * aiPalettes.length)];
    setPrimaryColor(picked[0]);
    setBackgroundColor(picked[2]);
    setPalette(picked);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/60 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
      {/* IZQUIERDA: Puntuación & Porcentaje */}
      <div className="flex flex-col justify-between p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Puntuación WCAG</span>
          <h2 className="text-5xl font-black mt-2 text-white">{contrastInfo.percentage}%</h2>
          <p className="text-sm font-medium mt-1 text-indigo-400">{contrastInfo.score}</p>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-700/50 text-xs text-slate-400">
          Ratio: <span className="text-white font-mono">{contrastInfo.ratio}:1</span>
        </div>
      </div>

      {/* CENTRO: Gotero, Imagen, Random & IA */}
      <div className="flex flex-col justify-between space-y-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <h3 className="text-sm font-semibold text-slate-300">Generación y Captura</h3>
        
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
          className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-indigo-500/20">
          <Sparkles size={18} /> Generar con IA
        </button>

        <label className="flex items-center justify-center gap-2 p-2 border border-dashed border-slate-600 hover:border-slate-400 rounded-xl text-xs text-slate-400 cursor-pointer transition">
          <Upload size={14} /> Cargar imagen para muestra
          <input type="file" accept="image/*" className="hidden" />
        </label>
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
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" 
                />
                <input 
                  type="text" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 text-sm font-mono text-white" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Fondo</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" 
                />
                <input 
                  type="text" 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 text-sm font-mono text-white" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}