import { createClient } from "@supabase/supabase-js";
import type { LeadFormData } from "@/types";
import { normalizarCelular } from "./paises";

const clean = (v: string | undefined) => (v ?? "").replace(/^﻿/, "").trim();
const supabaseUrl     = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function insertarLead(data: LeadFormData): Promise<void> {
  const celularNormalizado =
    data.celular && data.celular.trim()
      ? normalizarCelular(data.celular, data.codigoPais)
      : null;

  const { error } = await supabase.from("leads").insert([
    {
      nombre: data.nombre,
      apellido: data.apellido,
      pais: data.pais,
      codigo_pais: data.codigoPais,
      celular: celularNormalizado,
      correo: data.correo || null,
      ruta_interes: data.rutaInteres,
      mensaje_whatsapp: data.mensajeWhatsapp,
      desde_diagnostico: data.desdeDiagnostico,
      resultado_diagnostico: data.resultadoDiagnostico ?? null,
      seccion_origen: data.seccionOrigen ?? null,
      estado: "nuevo",
      mensaje: data.mensaje || null,
      consentimiento: data.consentimiento,
    },
  ]);

  if (error) {
    console.error("[Supabase] Error al insertar lead:", error.message);
    throw error;
  }
}
