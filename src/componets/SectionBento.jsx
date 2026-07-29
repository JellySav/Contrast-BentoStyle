import React from 'react';
import { Type, Shapes, Wand2 } from 'lucide-react';

export default function SectionBento({ primaryColor, backgroundColor, palette }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-slate-200">Previsualización Bento Grid</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
        {/* RECTÁNGULO 1: Muestra UI Web/Publicación (Grandote) */}
        <div 
          className="md:col-span-2 md:row-span-2 p-6 rounded-3xl flex flex-col justify-between transition-colors shadow-2xl"
          style={{ backgroundColor: backgroundColor, color: primaryColor }}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-current opacity-70">
              Vista previa UI
            </span>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }}></div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold leading-tight">
              Construye interfaces accesibles
            </h3>
            <p className="mt-2 text-sm opacity-80">
              Así es como se vería un héroe de sitio web o tarjeta social utilizando esta combinación de colores.
            </p>
          </div>
          <button 
            className="w-max px-5 py-2.5 rounded-xl font-semibold text-sm transition"
            style={{ backgroundColor: primaryColor, color: backgroundColor }}
          >
            Botón de Acción
          </button>
        </div>

        {/* RECTÁNGULO 2: Formas e Iconos */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <Shapes size={16} /> Formas e Iconos
          </div>
          <div className="flex items-center justify-around">
            <div className="w-12 h-12 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <div className="w-12 h-12 rounded-xl transform rotate-12" style={{ backgroundColor: palette[1] || primaryColor }}></div>
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: palette[2] || primaryColor }}></div>
          </div>
          <span className="text-xs text-slate-500 text-center">Interacción de formas</span>
        </div>

        {/* RECTÁNGULO 3: Degradados e Integración */}
        <div 
          className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-40 blur-xl"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${palette[1] || '#3B82F6'})` }}
          ></div>
          <div className="relative z-10 text-xs font-semibold text-slate-300">Degradado Sugerido</div>
          <div className="relative z-10 text-center font-mono text-xs text-slate-200">
            linear-gradient(135deg, {primaryColor}, {palette[1] || '...'})
          </div>
        </div>

        {/* RECTÁNGULO 4: Recomendación IA - Tipografías */}
        <div className="bg-slate-900/80 border border-indigo-900/40 p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
            <Type size={16} /> Tipografías Sugeridas (IA)
          </div>
          <div className="space-y-1">
            <p className="text-lg font-serif" style={{ color: primaryColor }}>Playfair Display</p>
            <p className="text-xs text-slate-400">Ideal para títulos elegantes y alto contraste.</p>
          </div>
          <span className="text-[10px] text-slate-500">Secundaria: Inter / Roboto</span>
        </div>

        {/* RECTÁNGULO 5: Recomendación IA - Estilo / Formas */}
        <div className="bg-slate-900/80 border border-purple-900/40 p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
            <Wand2 size={16} /> Estilo Recomendado (IA)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            "Para esta paleta, se recomiendan bordes **muy redondeados (rounded-3xl)** y Sombras Neomórficas suaves."
          </p>
          <span className="text-[10px] text-purple-400 font-mono">#BentoStyle #A11y</span>
        </div>
      </div>
    </section>
  );
}