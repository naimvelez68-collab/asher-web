"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { RUTAS } from "@/lib/rutas";
import type { RutaId } from "@/types";
import { GlowCard } from "./spotlight-card";
import { InteractiveHoverButton } from "./interactive-hover-button";

interface RutasSectionProps {
  onContact: (rutaId: RutaId, origen?: string) => void;
}

export const RutasSection = ({ onContact }: RutasSectionProps) => {
  const [expandida, setExpandida] = useState<RutaId | null>(null);

  return (
    <section id="rutas" className="py-28 px-5 sm:px-8 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* ── Header de sección ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8" style={{ background: "#8084B7" }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#4C5340" }}>
              Lo que hacemos
            </p>
            <span className="h-px w-8" style={{ background: "#8084B7" }} />
          </div>
          <h2
            className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: "#0B1956" }}
          >
            Elige tu ruta
          </h2>
          <p className="mt-4 max-w-md text-sm sm:text-base" style={{ color: "rgba(11,25,86,0.55)" }}>
            Cinco caminos claros hacia el crecimiento.
            <br className="hidden sm:block" />
            Mueve el cursor sobre las tarjetas.
          </p>
        </motion.div>

        {/* ── Grid de GlowCards ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RUTAS.map((ruta, i) => {
            const abierta = expandida === ruta.id;

            return (
              <motion.div
                key={ruta.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <GlowCard
                  customSize
                  glowColor="slate"
                  className="w-full p-6 gap-0 flex flex-col"
                >
                  {/* Número de ruta */}
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold tracking-[0.25em] uppercase"
                      style={{ color: "rgba(11,25,86,0.4)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl leading-none" style={{ color: "#8084B7" }}>
                      {ruta.icono}
                    </span>
                  </div>

                  {/* Título + tagline */}
                  <h3
                    className="mb-2 text-[15px] font-bold leading-snug"
                    style={{ color: "#0B1956" }}
                  >
                    {ruta.titulo}
                  </h3>
                  <p
                    className="mb-5 text-xs leading-relaxed"
                    style={{ color: "rgba(11,25,86,0.55)" }}
                  >
                    {ruta.tagline}
                  </p>

                  {/* Acordeón "Ver qué incluye" */}
                  <button
                    onClick={() => setExpandida(abierta ? null : ruta.id)}
                    className="mb-4 flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-[11px] font-semibold transition-all duration-200"
                    style={{
                      background: abierta ? "rgba(128,132,183,0.12)" : "rgba(11,25,86,0.04)",
                      border: `1px solid ${abierta ? "rgba(128,132,183,0.35)" : "rgba(11,25,86,0.08)"}`,
                      color: abierta ? "#4C5340" : "rgba(11,25,86,0.55)",
                    }}
                  >
                    <span>Ver qué incluye</span>
                    <motion.span
                      animate={{ rotate: abierta ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {abierta && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-4 space-y-2">
                          {ruta.incluye.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-[11px]">
                              <span
                                className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full"
                                style={{ background: "#8084B7" }}
                              />
                              <span style={{ color: "rgba(11,25,86,0.65)" }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div
                          className="mb-4 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em]"
                          style={{ background: "rgba(76,83,64,0.08)", color: "#4C5340" }}
                        >
                          {ruta.paquete}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA — empuja al fondo */}
                  <div className="mt-auto pt-2">
                    <InteractiveHoverButton
                      text="Hablar por WhatsApp"
                      icon={<MessageCircle className="h-4 w-4 flex-shrink-0" />}
                      onClick={() => onContact(ruta.id, `ruta_${ruta.id}`)}
                      blobColor="#4C5340"
                      className="w-full py-3 text-[13px] font-bold"
                      style={{ backgroundColor: "#0B1956", color: "#F7F4ED" }}
                    />
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
