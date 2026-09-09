"use client";

import { motion } from "framer-motion";
import { MessageCircle, Calendar, FileText } from "lucide-react";
import type { RutaId } from "@/types";
import { InteractiveHoverButton } from "./interactive-hover-button";
import { cn } from "@/lib/utils";

interface ContactoSectionProps {
  onContact: (rutaId: RutaId, origen?: string) => void;
}

export const ContactoSection = ({ onContact }: ContactoSectionProps) => {
  const acciones = [
    {
      icono: MessageCircle,
      label: "Hablar por WhatsApp",
      desc: "Respuesta inmediata",
      origen: "contacto_whatsapp",
    },
    {
      icono: Calendar,
      label: "Agendar asesoría",
      desc: "30 min sin compromiso",
      origen: "contacto_asesoria",
    },
    {
      icono: FileText,
      label: "Solicitar propuesta",
      desc: "Recibe una propuesta a medida",
      origen: "contacto_propuesta",
    },
  ];

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 md:px-10">
      <div className="mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 text-center sm:p-12"
          style={{ background: "#111111", border: "1px solid #2a2a2a" }}
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#c9a96e" }}
          >
            Hablemos
          </p>
          <h2
            className="mb-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            style={{ color: "#f0ede6" }}
          >
            ¿Lista tu marca para el siguiente nivel?
          </h2>
          <p
            className="mx-auto mb-10 max-w-md text-sm sm:text-base"
            style={{ color: "rgba(240,237,230,0.5)" }}
          >
            Cuéntanos dónde estás y hacia dónde quieres ir. El primer paso es gratis.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {acciones.map((a, i) => {
              const Ico = a.icono;
              const isPrimario = i === 0;
              return (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <InteractiveHoverButton
                    text={a.label}
                    icon={<Ico className="h-4 w-4 flex-shrink-0" />}
                    onClick={() => onContact("contacto_general", a.origen)}
                    blobColor={isPrimario ? "#0a0a0a" : "#c9a96e"}
                    className={cn(
                      "w-full px-8 py-3.5 text-sm sm:w-auto",
                      !isPrimario && "group-hover:text-[#0a0a0a]"
                    )}
                    style={
                      isPrimario
                        ? { backgroundColor: "#c9a96e", color: "#0a0a0a" }
                        : {
                            backgroundColor: "transparent",
                            border: "1px solid #3a3a3a",
                            color: "rgba(240,237,230,0.75)",
                          }
                    }
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs" style={{ color: "rgba(240,237,230,0.3)" }}>
            © {new Date().getFullYear()} ASHER.{" "}
            <button
              onClick={() => onContact("contacto_general", "footer_privacidad")}
              className="underline decoration-dotted underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Política de Privacidad
            </button>
            {" — "}Todos los derechos reservados.
          </p>
        </div>

      </div>
    </section>
  );
};
