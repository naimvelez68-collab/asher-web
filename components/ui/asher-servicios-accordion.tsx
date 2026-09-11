"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { RUTAS } from "@/lib/rutas";
import type { RutaId } from "@/types";

const NAVY = "#0B1956";
const IVORY = "#F7F4ED";
const SLATE = "#8084B7";

// Párrafos largos — misma fuente de contenido que el resto del sitio, en el
// registro editorial de "página 02".
const DESCRIPCIONES: Partial<Record<RutaId, string>> = {
  crear_marca:
    "Partimos de cero contigo: definimos quién eres, cómo te ves y cómo hablas, y dejamos la marca lista para salir al mercado sin improvisar.",
  mejorar_marca:
    "Auditamos lo que ya tienes, conservamos lo que funciona y reconstruimos lo que te está restando credibilidad frente a tu cliente.",
  publicidad:
    "Campañas que se miden en clientes, no en likes. Construimos el embudo completo: mensaje, creatividad, pauta y seguimiento.",
  digitalizacion:
    "Del sitio web al sistema interno. Ordenamos tu operación con herramientas que tu equipo sí usa y que puedes mantener.",
  blindaje_legal:
    "Lo que no está protegido, no es tuyo. Registramos, documentamos y ordenamos la parte legal antes de que se vuelva un problema.",
};

interface AsherServiciosAccordionProps {
  onContact: (rutaId: RutaId, origen?: string) => void;
}

export function AsherServiciosAccordion({ onContact }: AsherServiciosAccordionProps) {
  const [openId, setOpenId] = useState<RutaId | null>(null);

  return (
    <section id="lo-que-hacemos" className="relative py-24 px-6 md:px-10 md:py-40" style={{ background: IVORY }}>
      <div className="mx-auto mb-14 max-w-6xl md:mb-20">
        <div className="mb-10 flex items-center gap-3 md:mb-14">
          <span className="h-px w-8" style={{ background: "rgba(11,25,86,0.2)" }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.5)" }}>02</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.5)" }}>Lo Que Hacemos</span>
        </div>
        <h2
          className="font-medium tracking-tight"
          style={{ fontSize: "clamp(2rem,5vw,5rem)", lineHeight: 1.05, color: NAVY }}
        >
          Cinco rutas,
          <br />
          <span style={{ color: "rgba(11,25,86,0.45)" }}>un mismo equipo</span>
        </h2>
      </div>

      <div className="mx-auto max-w-6xl border-t" style={{ borderColor: "rgba(11,25,86,0.1)" }}>
        {RUTAS.map((ruta) => {
          const isOpen = openId === ruta.id;
          return (
            <div key={ruta.id} className="border-b" style={{ borderColor: "rgba(11,25,86,0.1)" }}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : ruta.id)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
              >
                <div className="flex min-w-0 items-center gap-5 md:gap-8">
                  <span className="flex-shrink-0 text-2xl md:text-3xl" style={{ color: SLATE }}>{ruta.icono}</span>
                  <div className="min-w-0">
                    <h3
                      className="text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-3xl"
                      style={{ color: NAVY }}
                    >
                      {ruta.titulo}
                    </h3>
                    <p className="mt-2 hidden text-sm transition-transform duration-500 group-hover:translate-x-2 md:block" style={{ color: "rgba(11,25,86,0.5)" }}>
                      {ruta.tagline}
                    </p>
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-colors"
                  style={{ borderColor: "rgba(11,25,86,0.15)", color: "rgba(11,25,86,0.5)" }}
                >
                  {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-8 pb-10 pt-8 md:grid-cols-12 md:gap-12 md:pb-14 md:pt-12">
                      <div className="md:col-span-5">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] md:hidden" style={{ color: "rgba(11,25,86,0.5)" }}>
                          {ruta.tagline}
                        </p>
                        <p className="text-sm leading-relaxed md:text-base" style={{ color: "rgba(11,25,86,0.65)" }}>
                          {DESCRIPCIONES[ruta.id] ?? ruta.tagline}
                        </p>
                        <button
                          onClick={() => onContact(ruta.id, `servicios_${ruta.id}`)}
                          className="group/link mt-8 inline-flex items-center gap-3 border-b pb-1 font-mono text-sm uppercase tracking-[0.15em] transition-colors duration-300"
                          style={{ color: NAVY, borderColor: "rgba(11,25,86,0.2)" }}
                        >
                          Solicitar propuesta
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                        </button>
                      </div>
                      <div className="md:col-span-6 md:col-start-7">
                        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.5)" }}>Incluye</p>
                        <ul className="space-y-0">
                          {ruta.incluye.map((item, i) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                              className="flex items-start gap-4 border-t py-3 text-sm md:text-base"
                              style={{ borderColor: "rgba(11,25,86,0.1)", color: NAVY }}
                            >
                              <span className="mt-1.5 font-mono text-[10px]" style={{ color: "rgba(11,25,86,0.4)" }}>
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
