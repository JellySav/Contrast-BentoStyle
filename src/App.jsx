import React, { useState } from 'react';
import SectionConfig from './componets/SectionConfig';
import SectionBento from './componets/SectionBento';

export default function App() {
  const [mode, setMode] = useState('single'); // 'single' o 'palette'
  const [primaryColor, setPrimaryColor] = useState('#6366F1');
  const [backgroundColor, setBackgroundColor] = useState('#0F172A');
  const [palette, setPalette] = useState(['#6366F1', '#A855F7', '#EC4899', '#F43F5E']);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
      <header className="max-w-7xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Contrast-BentoStyle 
        </h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Analiza contraste WCAG, prueba una paleta en contexto y genera armonías de color con reglas locales.
        </p>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* Sección 1: Configuración & Elección */}
        <SectionConfig 
          mode={mode} 
          setMode={setMode}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          palette={palette}
          setPalette={setPalette}
        />

        {/* Sección 2: Bento Grid / Muestra de Uso */}
        <SectionBento 
            mode={mode}
          primaryColor={primaryColor}
          backgroundColor={backgroundColor}
          palette={palette}
        />
      </main>

      <footer className="max-w-7xl mx-auto mt-16 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
        Proyecto Final • Desarrollado con React y Tailwind CSS
      </footer>
    </div>
  );
}