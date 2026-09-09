"use client";

import { motion } from "framer-motion";
import { Layers, Zap, Shield, TrendingUp } from "lucide-react";
import { GlowCard } from "./spotlight-card";

const puntos = [
  {
    icono: Layers,
    titulo: "Todo bajo un mismo techo",
    texto:
      "Branding, publicidad, web y protección legal en una sola consultora. Sin fragmentar tu proyecto entre múltiples agencias.",
  },
  {
    icono: TrendingUp,
    titulo: "Construimos para crecer",
    texto:
      "No ejecutamos tareas sueltas. Diseñamos una estrategia de crecimiento completa: marca, comunicación, presencia digital y ventas.",
  },
  {
    icono: Shield,
    titulo: "Con blindaje desde el principio",
    texto:
      "Lo que construyes queda protegido. El respaldo legal no es un extra: es parte del proceso para que tu marca sea tuya de verdad.",
  },
  {
    icono: Zap,
    titulo: "Estrategia que se ejecuta",
    texto:
      "No solo planificamos. Implementamos, medimos y ajustamos hasta que los resultados sean reales y sostenibles.",
  },
];

export const DiferenciadorSection = () => {
  return (
    <section id="diferenciador" className="py-24 px-4 sm:px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Copy izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#4C5340" }}
            >
              Por qué ASHER
            </p>
            <h2
              className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
              style={{ color: "#0B1956" }}
            >
              No somos una agencia.
              <br />
              Somos tu equipo de{" "}
              <span style={{ color: "#8084B7" }}>crecimiento integral.</span>
            </h2>
            <p
              className="mt-6 text-sm leading-relaxed sm:text-base"
              style={{ color: "rgba(11,25,86,0.62)" }}
            >
              Consultora premium de marca, marketing, tecnología y blindaje legal.
              Cada proyecto arranca con estrategia, se ejecuta con rigor
              y queda protegido legalmente.
            </p>
          </motion.div>

          {/* Puntos derechos — GlowCards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {puntos.map((p, i) => {
              const Ico = p.icono;
              return (
                <motion.div
                  key={p.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <GlowCard customSize glowColor="slate" className="w-full p-5 flex flex-col">
                    <div
                      className="mb-3 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ background: "rgba(128,132,183,0.14)" }}
                    >
                      <Ico className="h-4 w-4" style={{ color: "#0B1956" }} />
                    </div>
                    <h3 className="mb-1.5 text-sm font-bold" style={{ color: "#0B1956" }}>
                      {p.titulo}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(11,25,86,0.58)" }}>
                      {p.texto}
                    </p>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
