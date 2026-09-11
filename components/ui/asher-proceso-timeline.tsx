"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NAVY = "#0B1956";
const SAND_TINT = "#F1E7DA";

const STEPS = [
  { id: "01", title: "Diagnóstico", description: "Escuchamos, revisamos tu marca y detectamos qué está frenando tu crecimiento." },
  { id: "02", title: "Estrategia", description: "Definimos ruta, prioridades y entregables con fechas y responsables." },
  { id: "03", title: "Ejecución", description: "Diseño, contenido, campañas y desarrollo. Un solo equipo, sin intermediarios." },
  { id: "04", title: "Blindaje", description: "Registramos tu marca y ordenamos contratos, políticas y permisos." },
  { id: "05", title: "Medición", description: "Números claros: qué funcionó, qué no y qué sigue el próximo mes." },
  { id: "06", title: "Crecimiento", description: "Iteramos y escalamos lo que ya está dando resultados." },
];

export function AsherProcesoTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 80%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="proceso" className="relative py-24 px-6 md:px-10 md:py-40" style={{ background: SAND_TINT }}>
      <div className="mx-auto mb-14 max-w-6xl md:mb-20">
        <div className="mb-10 flex items-center gap-3 md:mb-14">
          <span className="h-px w-8" style={{ background: "rgba(11,25,86,0.2)" }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.5)" }}>03</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.5)" }}>Cómo Trabajamos</span>
        </div>
        <h2
          className="mb-8 font-medium tracking-tight"
          style={{ fontSize: "clamp(2rem,5vw,5rem)", lineHeight: 1.05, color: NAVY }}
        >
          Un proceso
          <br />
          <span style={{ color: "rgba(11,25,86,0.45)" }}>sin sorpresas</span>
        </h2>
        <p className="max-w-xl text-sm leading-relaxed md:text-base" style={{ color: "rgba(11,25,86,0.6)" }}>
          Seis pasos, fechas claras y una sola persona de contacto. Sabes en todo momento qué se está haciendo y por qué.
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl md:pl-10">
        <div className="absolute bottom-0 left-0 top-0 hidden w-px md:block" style={{ background: "rgba(11,25,86,0.1)" }}>
          <motion.div className="w-full origin-top" style={{ height: lineHeight, background: NAVY }} />
        </div>

        <ol className="border-b" style={{ borderColor: "rgba(11,25,86,0.1)" }}>
          {STEPS.map((step, i) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
              className="group relative grid grid-cols-1 gap-3 border-t py-8 md:grid-cols-12 md:gap-8 md:py-10"
              style={{ borderColor: "rgba(11,25,86,0.1)" }}
            >
              <span
                className="absolute -left-[5px] top-[2.85rem] hidden h-[9px] w-[9px] rounded-full transition-colors duration-500 md:block"
                style={{ background: SAND_TINT, border: "1px solid rgba(11,25,86,0.3)" }}
              />
              <div className="flex items-baseline gap-4 md:col-span-3">
                <span className="font-mono text-[10px]" style={{ color: "rgba(11,25,86,0.5)" }}>{step.id}</span>
                <h3
                  className="text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1 md:text-2xl"
                  style={{ color: NAVY }}
                >
                  {step.title}
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-relaxed md:col-span-7 md:col-start-5 md:text-base" style={{ color: "rgba(11,25,86,0.6)" }}>
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
