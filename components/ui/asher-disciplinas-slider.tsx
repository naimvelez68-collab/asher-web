"use client";

import { InfiniteSlider } from "./infinite-slider";

const NAVY = "#0B1956";
const IVORY = "#F7F4ED";

const DISCIPLINAS = [
  { label: "Estrategia", src: "/disciplinas/estrategia-maroon.png" },
  { label: "Marca", src: "/disciplinas/marca-branding.png" },
  { label: "Digital", src: "/disciplinas/digital-verde.png" },
  { label: "Publicidad", src: "/disciplinas/publicidad-naranja.png" },
  { label: "Legal", src: "/disciplinas/legal-navy.png" },
];

/** Franja de logos infinita — vive justo antes del footer. */
export function AsherDisciplinasSlider() {
  return (
    <section className="relative py-14 md:py-20" style={{ background: IVORY, borderTop: "1px solid rgba(11,25,86,0.08)" }}>
      <p
        className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.25em] md:mb-10"
        style={{ color: "rgba(11,25,86,0.45)" }}
      >
        Cinco disciplinas, un mismo equipo
      </p>

      <InfiniteSlider gap={64} duration={28} durationOnHover={70} className="w-full">
        {DISCIPLINAS.map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-3">
            <img
              src={d.src}
              alt={`Isotipo ASHER — ${d.label}`}
              className="h-[100px] w-[100px] rounded-full object-cover md:h-[120px] md:w-[120px]"
              style={{ border: "1px solid rgba(11,25,86,0.08)" }}
            />
            <span className="text-xs font-medium uppercase tracking-[0.15em]" style={{ color: NAVY }}>
              {d.label}
            </span>
          </div>
        ))}
      </InfiniteSlider>
    </section>
  );
}
