import React from 'react';
import { Type, Shapes, Wand2 } from 'lucide-react';
import { calculateContrast, isValidHex } from '../utils/contrast';

export default function SectionBento({ mode, primaryColor, backgroundColor, palette }) {
  const contrastInfo = calculateContrast(primaryColor, backgroundColor);
  const colors = palette.filter(isValidHex);
  const secondaryColor = colors[1] || primaryColor;
  const tertiaryColor = colors[2] || backgroundColor;
  const gradient = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${tertiaryColor})`;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Aplicación en contexto</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-100">Muestra de uso</h2>
        </div>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
          {mode === 'palette' ? `${colors.length} colores en la paleta` : 'Color único'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-[190px]">
        <article
          className="flex min-h-[360px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 shadow-xl md:col-span-2 xl:row-span-2"
          style={{ backgroundColor, color: primaryColor }}
        >
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="rounded-full border border-current px-3 py-1 uppercase tracking-wider">Vista previa UI</span>
            <span className="font-mono opacity-70">ESTUDIO / 08</span>
          </div>
          <div className="my-8 max-w-lg">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">Diseño con intención</p>
            <h3 className="text-4xl font-bold leading-tight md:text-5xl">El color también comunica.</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed opacity-75">
              Una muestra de jerarquía, lectura y acentos usando tu combinación actual.
            </p>
            <button type="button" className="mt-6 rounded-lg px-4 py-2 text-sm font-semibold" style={{ backgroundColor: primaryColor, color: backgroundColor }}>
              Explorar colección
            </button>
          </div>
          <div className="flex items-end justify-between border-t border-current/20 pt-4">
            <span className="text-xs opacity-70">Texto sobre fondo seleccionado</span>
            <span className="font-mono text-xs">{contrastInfo.ratio ? `${contrastInfo.ratio}:1` : 'Revisa el HEX'}</span>
          </div>
        </article>

        <article className="flex min-h-[190px] flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Shapes size={16} /> Formas y acentos
          </div>
          <div className="flex items-center justify-center gap-4 py-3" aria-label="Muestra de formas con los colores de la paleta">
            <span className="h-14 w-14 rounded-full" style={{ backgroundColor: primaryColor }} />
            <span className="h-10 w-10 rotate-12 rounded-xl" style={{ backgroundColor: secondaryColor }} />
            <span className="h-12 w-12 rounded-md" style={{ backgroundColor: tertiaryColor }} />
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.slice(0, 4).map((color) => (
              <span key={color} className="rounded-md bg-slate-950 px-2 py-1 font-mono text-[10px] text-slate-300">{color.toUpperCase()}</span>
            ))}
          </div>
        </article>

        <article className="relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-5 text-white" style={{ background: gradient }}>
          <div className="flex items-center gap-2 text-xs font-semibold"><Wand2 size={16} /> Degradado de la paleta</div>
          <div className="rounded-lg bg-black/25 p-3 font-mono text-[10px] leading-relaxed text-white/90 break-all">
            linear-gradient(135deg, {primaryColor}, {secondaryColor}, {tertiaryColor})
          </div>
        </article>

        <article className="flex min-h-[190px] flex-col justify-between rounded-2xl border border-slate-800 p-5" style={{ backgroundColor, color: primaryColor }}>
          <div className="flex items-center gap-2 text-xs font-semibold"><Type size={16} /> Lectura y tipografía</div>
          <div>
            <p className="font-serif text-2xl">Títulos con carácter</p>
            <p className="mt-1 text-xs opacity-70">Combina una serif expresiva con una sans serif para el texto de lectura.</p>
          </div>
          <span className="text-[10px] opacity-60">Ejemplo: Georgia + sans serif</span>
        </article>

        <article className="flex min-h-[190px] flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300"><Wand2 size={16} /> Lectura del contraste</div>
            {contrastInfo.ratio && <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${contrastInfo.normalAA ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-400/15 text-amber-300'}`}>{contrastInfo.normalAA ? 'AA' : 'Revisar'}</span>}
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            {!contrastInfo.ratio
              ? 'Corrige los códigos hexadecimales para analizar esta combinación.'
              : contrastInfo.normalAA
                ? `La combinación alcanza ${contrastInfo.ratio}:1 y cumple AA para texto normal.`
                : `El ratio es ${contrastInfo.ratio}:1. Para texto normal, busca al menos 4.5:1.`}
          </p>
          <span className="text-[10px] font-mono text-slate-500">Cálculo local · WCAG 2.2</span>
        </article>
      </div>
    </section>
  );
}