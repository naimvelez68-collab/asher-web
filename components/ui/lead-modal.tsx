"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ChevronDown } from "lucide-react";
import { leadSchema } from "@/lib/schemas";
import { insertarLead } from "@/lib/supabase";
import { openWhatsApp, getMensajeByRuta, MENSAJE_CONTACTO_GENERAL } from "@/lib/rutas";
import { PAISES, getCodigoPorPais } from "@/lib/paises";
import type { RutaId, LeadFormData } from "@/types";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  rutaId: RutaId;
  desdeDiagnostico?: boolean;
  resultadoDiagnostico?: string;
  seccionOrigen?: string;
}

const CAMPOS_INIT = {
  nombre: "",
  apellido: "",
  pais: "Ecuador",
  codigoPais: "+593",
  celular: "",
  correo: "",
  mensaje: "",
  consentimiento: false,
};

export const LeadModal = ({
  isOpen,
  onClose,
  rutaId,
  desdeDiagnostico = false,
  resultadoDiagnostico,
  seccionOrigen,
}: LeadModalProps) => {
  const [campos, setCampos] = useState(CAMPOS_INIT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [codigoManual, setCodigoManual] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCampos(CAMPOS_INIT);
      setErrors({});
      setCodigoManual(false);
      setGuardado(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (campos.pais === "Otro país") {
      setCodigoManual(true);
      setCampos((p) => ({ ...p, codigoPais: "" }));
    } else {
      setCodigoManual(false);
      const codigo = getCodigoPorPais(campos.pais);
      setCampos((p) => ({ ...p, codigoPais: codigo }));
    }
  }, [campos.pais]);

  const set = (key: string, value: string | boolean) => {
    setCampos((p) => ({ ...p, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const mensajeWhatsapp = getMensajeByRuta(rutaId, desdeDiagnostico);

    const payload: LeadFormData = {
      ...campos,
      rutaInteres: rutaId,
      mensajeWhatsapp,
      desdeDiagnostico,
      resultadoDiagnostico,
      seccionOrigen,
      consentimiento: campos.consentimiento,
    };

    const result = leadSchema.safeParse(payload);
    if (!result.success) {
      const errMap: Record<string, string> = {};
      result.error.issues.forEach((e) => {
        if (e.path[0]) errMap[e.path[0] as string] = e.message;
      });
      setErrors(errMap);
      return;
    }

    setLoading(true);

    try {
      await insertarLead(payload);
      setGuardado(true);
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:                payload.nombre,
          apellido:              payload.apellido,
          pais:                  payload.pais,
          codigo_pais:           payload.codigoPais,
          celular:               payload.celular,
          correo:                payload.correo,
          ruta_interes:          payload.rutaInteres,
          desde_diagnostico:     payload.desdeDiagnostico,
          resultado_diagnostico: payload.resultadoDiagnostico,
          seccion_origen:        payload.seccionOrigen,
          mensaje:               payload.mensaje,
        }),
      }).catch(() => {});
    } catch {
      // Si Supabase falla, WhatsApp se abre igual — conversión nunca bloqueada
    }

    // Breve pausa para mostrar confirmación antes de abrir WhatsApp
    await new Promise(r => setTimeout(r, guardado ? 800 : 0));
    openWhatsApp(mensajeWhatsapp);
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-sm"
            style={{ background: "rgba(11,25,86,0.45)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 rounded-2xl p-6 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 md:p-8"
            style={{ background: "#FBF9F5", border: "1px solid rgba(11,25,86,0.12)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p
                  className="mb-1 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#4C5340" }}
                >
                  ASHER
                </p>
                <h3
                  className="text-lg font-semibold leading-tight"
                  style={{ color: "#0B1956" }}
                >
                  Cuéntanos un poco sobre ti
                </h3>
                <p className="mt-1 text-xs" style={{ color: "rgba(11,25,86,0.55)" }}>
                  En segundos te conectamos con nuestro equipo.
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 transition-colors hover:bg-[#0B1956]/10"
                style={{ color: "rgba(11,25,86,0.55)" }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-3.5">

              {/* Nombre + Apellido */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Nombre *"
                    value={campos.nombre}
                    onChange={(e) => set("nombre", e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:opacity-40"
                    style={{
                      background: "#F1E7DA",
                      border: `1px solid ${errors.nombre ? "#e05a5a" : "rgba(11,25,86,0.15)"}`,
                      color: "#0B1956",
                    }}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-[10px] text-red-500">{errors.nombre}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Apellido *"
                    value={campos.apellido}
                    onChange={(e) => set("apellido", e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:opacity-40"
                    style={{
                      background: "#F1E7DA",
                      border: `1px solid ${errors.apellido ? "#e05a5a" : "rgba(11,25,86,0.15)"}`,
                      color: "#0B1956",
                    }}
                  />
                  {errors.apellido && (
                    <p className="mt-1 text-[10px] text-red-500">{errors.apellido}</p>
                  )}
                </div>
              </div>

              {/* País */}
              <div className="relative">
                <select
                  value={campos.pais}
                  onChange={(e) => set("pais", e.target.value)}
                  className="w-full appearance-none rounded-xl px-4 py-3 text-sm outline-none"
                  style={{
                    background: "#F1E7DA",
                    border: "1px solid rgba(11,25,86,0.15)",
                    color: "#0B1956",
                  }}
                >
                  {PAISES.map((p) => (
                    <option key={p.nombre} value={p.nombre} style={{ background: "#F1E7DA" }}>
                      {p.bandera} {p.nombre} {p.codigo}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                  style={{ color: "rgba(11,25,86,0.4)" }}
                />
              </div>

              {/* Celular */}
              <div>
                <div className="flex gap-2">
                  {codigoManual ? (
                    <input
                      type="text"
                      placeholder="+00"
                      value={campos.codigoPais}
                      onChange={(e) => set("codigoPais", e.target.value)}
                      className="w-20 rounded-xl px-3 py-3 text-sm outline-none"
                      style={{
                        background: "#F1E7DA",
                        border: "1px solid rgba(11,25,86,0.15)",
                        color: "#0B1956",
                      }}
                    />
                  ) : (
                    <div
                      className="flex items-center rounded-xl px-3 text-sm"
                      style={{
                        background: "#F1E7DA",
                        border: "1px solid rgba(11,25,86,0.15)",
                        color: "rgba(11,25,86,0.65)",
                        minWidth: "4.5rem",
                      }}
                    >
                      {campos.codigoPais}
                    </div>
                  )}
                  <input
                    type="tel"
                    placeholder="Celular / WhatsApp"
                    value={campos.celular}
                    onChange={(e) => set("celular", e.target.value)}
                    className="flex-1 rounded-xl px-4 py-3 text-sm outline-none placeholder:opacity-40"
                    style={{
                      background: "#F1E7DA",
                      border: `1px solid ${errors.celular ? "#e05a5a" : "rgba(11,25,86,0.15)"}`,
                      color: "#0B1956",
                    }}
                  />
                </div>
                {errors.celular && (
                  <p className="mt-1 text-[10px] text-red-500">{errors.celular}</p>
                )}
              </div>

              {/* Correo */}
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico (opcional)"
                  value={campos.correo}
                  onChange={(e) => set("correo", e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none placeholder:opacity-40"
                  style={{
                    background: "#F1E7DA",
                    border: `1px solid ${errors.correo ? "#e05a5a" : "rgba(11,25,86,0.15)"}`,
                    color: "#0B1956",
                  }}
                />
                {errors.correo && (
                  <p className="mt-1 text-[10px] text-red-500">{errors.correo}</p>
                )}
              </div>

              {/* Mensaje opcional */}
              <textarea
                placeholder="¿Algo que quieras contarnos? (opcional)"
                value={campos.mensaje}
                onChange={(e) => set("mensaje", e.target.value)}
                rows={2}
                className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none placeholder:opacity-40"
                style={{
                  background: "#F1E7DA",
                  border: "1px solid rgba(11,25,86,0.15)",
                  color: "#0B1956",
                }}
              />

              {/* Consentimiento */}
              <label className="flex cursor-pointer items-start gap-3">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={campos.consentimiento}
                    onChange={(e) => set("consentimiento", e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className="flex h-4 w-4 items-center justify-center rounded transition-colors"
                    style={{
                      background: campos.consentimiento ? "#0B1956" : "transparent",
                      border: `1.5px solid ${errors.consentimiento ? "#e05a5a" : campos.consentimiento ? "#0B1956" : "rgba(11,25,86,0.25)"}`,
                    }}
                    onClick={() => set("consentimiento", !campos.consentimiento)}
                  >
                    {campos.consentimiento && (
                      <svg className="h-2.5 w-2.5" style={{ color: "#F7F4ED" }} fill="none" viewBox="0 0 12 12">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[11px] leading-tight" style={{ color: "rgba(11,25,86,0.55)" }}>
                  Acepto que ASHER use mis datos para contactarme y dar seguimiento a mi solicitud.
                </span>
              </label>
              {errors.consentimiento && (
                <p className="text-[10px] text-red-500">{errors.consentimiento}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all disabled:opacity-60"
                style={{
                  background: guardado ? "#22c55e" : "#0B1956",
                  color: "#F7F4ED",
                  transition: "background 0.3s",
                }}
              >
                {loading && !guardado && <Loader2 className="h-4 w-4 animate-spin" />}
                {guardado
                  ? "✓ Datos guardados · Abriendo WhatsApp…"
                  : loading
                    ? "Guardando…"
                    : "Continuar a WhatsApp →"}
              </button>

            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
