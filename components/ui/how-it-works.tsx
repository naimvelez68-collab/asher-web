"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

const NAVY = "#0B1956";
const IVORY = "#F7F4ED";

interface CardProps {
  number: string;
  title: string;
  description: string;
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({ number, title, description, className, rotate, colors }: CardProps) => {
  const bg = colors?.bg ?? "rgba(128,132,183,0.08)";
  const text = colors?.text ?? NAVY;
  const border = colors?.border ?? "rgba(11,25,86,0.1)";

  return (
    <div className={`relative w-full md:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}>
      <div
        className="rounded-[25px] border p-2 shadow-[0px_10px_20px_0px_rgba(11,25,86,0.1)]"
        style={{ background: IVORY, borderColor: "rgba(11,25,86,0.06)" }}
      >
        <Pin className="z-20 mx-auto mb-6 h-8 w-8" style={{ color: text }} />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] border p-[15px]" style={{ background: bg, borderColor: border }}>
          <span className="mb-5 font-mono text-3xl font-semibold" style={{ color: text }}>{number}</span>
          <h3 className="mb-[10px] text-2xl font-semibold leading-none" style={{ color: NAVY }}>{title}</h3>
          <p className="text-sm/5 tracking-tight" style={{ color: "rgba(11,25,86,0.55)" }}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colors?: { bg: string; text: string; border: string };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[120px] md:right-[15%]", rotate: "-rotate-8" },
  { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[570px] md:right-[10%]", rotate: "-rotate-8" },
  { className: "md:absolute md:top-[850px] md:left-[15%]", rotate: "rotate-8" },
];

// Paleta ASHER usada como "colorTheme" en vez de orange/blue/purple genéricos.
const ASHER_STEPS: Step[] = [
  {
    title: "Diagnóstico",
    description: "Escuchamos, revisamos tu marca y detectamos qué está frenando tu crecimiento.",
    colors: { bg: "rgba(219,200,182,0.35)", text: "#4C5340", border: "rgba(219,200,182,0.6)" },
  },
  {
    title: "Estrategia",
    description: "Definimos ruta, prioridades y entregables con fechas y responsables.",
    colors: { bg: "rgba(128,132,183,0.12)", text: "#0B1956", border: "rgba(128,132,183,0.3)" },
  },
  {
    title: "Ejecución",
    description: "Diseño, contenido, campañas y desarrollo. Un solo equipo, sin intermediarios.",
    colors: { bg: "rgba(76,83,64,0.1)", text: "#4C5340", border: "rgba(76,83,64,0.25)" },
  },
  {
    title: "Blindaje",
    description: "Registramos tu marca y ordenamos contratos, políticas y permisos.",
    colors: { bg: "rgba(11,25,86,0.06)", text: "#0B1956", border: "rgba(11,25,86,0.15)" },
  },
  {
    title: "Crecimiento",
    description: "Medimos resultados reales, iteramos y escalamos lo que funciona.",
    colors: { bg: "rgba(128,132,183,0.12)", text: "#0B1956", border: "rgba(128,132,183,0.3)" },
  },
];

export default function HowItWorks({ features, className = "", stepPositions }: HowItWorksProps) {
  const data = features && features.length > 0 ? features : ASHER_STEPS;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1130;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 450;
  else if (data.length === 3) height = 800;
  else if (data.length === 4) height = 900;
  else height = 1130;

  return (
    <LazyMotion features={domAnimation}>
      <div className={`relative max-md:pb-25 max-md:pt-10 px-8 md:py-20 ${className}`} style={{ background: IVORY }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `linear-gradient(${NAVY} 1px, transparent 1px)`, backgroundSize: "100% 32px", marginTop: "4px" }}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2" style={{ background: `linear-gradient(to right, ${IVORY}, transparent)` }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2" style={{ background: `linear-gradient(to left, ${IVORY}, transparent)` }} />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-14 text-center md:mb-20">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8" style={{ background: "#8084B7" }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.5)" }}>Cómo trabajamos</span>
            </div>
            <h2 className="font-medium tracking-tight" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", color: NAVY, lineHeight: 1.05 }}>
              Un proceso
              <br />
              <span style={{ color: "rgba(11,25,86,0.45)" }}>sin sorpresas</span>
            </h2>
          </div>

          <div
            className="relative mx-auto flex h-auto w-full max-w-[1000px] flex-col space-y-8 md:block md:h-[var(--md-height)] md:space-y-0"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-full md:block" viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none">
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0) return "M 290 150 C 500 150, 550 270, 710 270";
                    if (index === 1) return acc + " C 850 270, 500 350, 290 450";
                    if (index === 2) return acc + " C 290 600, 550 720, 750 720";
                    if (index === 3) return acc + " C 950 720, 500 800, 290 850";
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="rgba(11,25,86,0.18)"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -140 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];
              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  colors={step.colors}
                  rotate={position.rotate}
                  className={position.className}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
