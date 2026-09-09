"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, RotateCcw } from "lucide-react";
import { RUTA_MAP } from "@/lib/rutas";
import type { RutaId } from "@/types";
import { InteractiveHoverButton } from "./interactive-hover-button";

interface DiagnosticoSectionProps {
  onContact: (rutaId: RutaId, desdeDiagnostico: boolean, resultado: string) => void;
}

const P1_OPCIONES = [
  { label: "Estoy empezando", ruta: "crear_marca" as RutaId },
  { label: "Ya existe pero se ve improvisada", ruta: "mejorar_marca" as RutaId },
  { label: "Existe y quiero vender más", ruta: "publicidad" as RutaId },
  { label: "Necesito presencia digital", ruta: "digitalizacion" as RutaId },
  { label: "Quiero protegerla legalmente", ruta: "blindaje_legal" as RutaId },
];

const P2_OPCIONES = [
  { label: "Imagen y diseño", ruta: "mejorar_marca" as RutaId },
  { label: "Más clientes y ventas", ruta: "publicidad" as RutaId },
  { label: "Página web o herramientas", ruta: "digitalizacion" as RutaId },
  { label: "Seguridad legal", ruta: "blindaje_legal" as RutaId },
];

const P3_OPCIONES = ["Sí", "No", "Quiero mejorarlos"];

type Paso = 1 | 2 | 3 | "resultado";

export const DiagnosticoSection = ({ onContact }: DiagnosticoSectionProps) => {
  const [paso, setPaso] = useState<Paso>(1);
  const [p1, setP1] = useState<RutaId | null>(null);
  const [p2, setP2] = useState<RutaId | null>(null);
  const [_p3, setP3] = useState<string | null>(null);
  const [rutaResultado, setRutaResultado] = useState<RutaId>("contacto_general");

  const seleccionarP1 = (ruta: RutaId) => {
    setP1(ruta);
    setPaso(2);
  };

  const seleccionarP2 = (ruta: RutaId) => {
    setP2(ruta);
    setPaso(3);
  };

  const seleccionarP3 = (opcion: string) => {
    setP3(opcion);
    const final = p1 ?? p2 ?? "contacto_general";
    setRutaResultado(final as RutaId);
    setPaso("resultado");
  };

  const reiniciar = () => {
    setPaso(1);
    setP1(null);
    setP2(null);
    setP3(null);
    setRutaResultado("contacto_general");
  };

  const rutaInfo = rutaResultado !== "contacto_general" ? RUTA_MAP[rutaResultado] : null;

  return (
    <section id="diagnostico" className="py-24 px-4 sm:px-6 md:px-10">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#4C5340" }}
          >
            Opcional
          </p>
          <h2
            className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            style={{ color: "#0B1956" }}
          >
            ¿No sabes por dónde empezar?
          </h2>
          <p
            className="mt-4 text-sm sm:text-base"
            style={{ color: "rgba(11,25,86,0.58)" }}
          >
            3 preguntas rápidas. Te decimos exactamente qué necesitas.
          </p>
        </motion.div>

        {/* Caja de quiz */}
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
          style={{ background: "#FBF9F5", border: "1px solid rgba(11,25,86,0.12)" }}
        >
          {/* Barra de progreso */}
          {paso !== "resultado" && (
            <div className="mb-6 flex gap-1.5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-1 flex-1 rounded-full transition-all duration-500"
                  style={{
                    background:
                      (paso as number) >= n ? "#8084B7" : "rgba(11,25,86,0.12)",
                  }}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* Pregunta 1 */}
            {paso === 1 && (
              <motion.div
                key="p1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-5 text-sm font-semibold sm:text-base" style={{ color: "#0B1956" }}>
                  1 / 3 — ¿En qué punto está tu marca?
                </p>
                <div className="flex flex-col gap-2.5">
                  {P1_OPCIONES.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => seleccionarP1(o.ruta)}
                      className="w-full rounded-xl px-4 py-3 text-left text-sm transition-all hover:border-[#8084b780]"
                      style={{
                        background: "#F1E7DA",
                        border: "1px solid rgba(11,25,86,0.12)",
                        color: "rgba(11,25,86,0.78)",
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Pregunta 2 */}
            {paso === 2 && (
              <motion.div
                key="p2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-5 text-sm font-semibold sm:text-base" style={{ color: "#0B1956" }}>
                  2 / 3 — ¿Qué es lo más urgente para ti ahora?
                </p>
                <div className="flex flex-col gap-2.5">
                  {P2_OPCIONES.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => seleccionarP2(o.ruta)}
                      className="w-full rounded-xl px-4 py-3 text-left text-sm transition-all hover:border-[#8084b780]"
                      style={{
                        background: "#F1E7DA",
                        border: "1px solid rgba(11,25,86,0.12)",
                        color: "rgba(11,25,86,0.78)",
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Pregunta 3 */}
            {paso === 3 && (
              <motion.div
                key="p3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-5 text-sm font-semibold sm:text-base" style={{ color: "#0B1956" }}>
                  3 / 3 — ¿Tienes ya logo e identidad?
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {P3_OPCIONES.map((o) => (
                    <button
                      key={o}
                      onClick={() => seleccionarP3(o)}
                      className="rounded-full px-5 py-2.5 text-sm transition-all hover:border-[#8084b780]"
                      style={{
                        background: "#F1E7DA",
                        border: "1px solid rgba(11,25,86,0.12)",
                        color: "rgba(11,25,86,0.78)",
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Resultado */}
            {paso === "resultado" && (
              <motion.div
                key="resultado"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#4C5340" }}
                >
                  Tu diagnóstico
                </p>
                <h3
                  className="mb-2 text-xl font-semibold sm:text-2xl"
                  style={{ color: "#0B1956" }}
                >
                  {rutaInfo ? rutaInfo.titulo : "Contacto general"}
                </h3>
                {rutaInfo && (
                  <p
                    className="mb-6 text-sm"
                    style={{ color: "rgba(11,25,86,0.55)" }}
                  >
                    {rutaInfo.tagline}
                  </p>
                )}

                <InteractiveHoverButton
                  text="Hablar con ASHER sobre esta ruta"
                  icon={<MessageCircle className="h-4 w-4 flex-shrink-0" />}
                  onClick={() =>
                    onContact(
                      rutaResultado,
                      true,
                      rutaInfo?.titulo ?? "Contacto general"
                    )
                  }
                  blobColor="#4C5340"
                  className="mb-4 w-full py-3.5 text-sm"
                  style={{ backgroundColor: "#0B1956", color: "#F7F4ED" }}
                />

                <button
                  onClick={reiniciar}
                  className="flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-xs transition-colors"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(11,25,86,0.15)",
                    color: "rgba(11,25,86,0.45)",
                  }}
                >
                  <RotateCcw className="h-3 w-3" />
                  Volver a responder
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
