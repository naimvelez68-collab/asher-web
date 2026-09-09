"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { LeadsTable } from "./leads-table";

const clean = (v: string | undefined) => (v ?? "").replace(/^﻿/, "").trim();
const supabase = createClient(
  clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
);

interface Lead {
  id: string;
  created_at: string;
  nombre: string;
  apellido: string;
  pais: string;
  codigo_pais: string;
  celular: string | null;
  correo: string | null;
  ruta_interes: string;
  desde_diagnostico: boolean;
  resultado_diagnostico: string | null;
  seccion_origen: string | null;
  estado: string;
  mensaje: string | null;
  consentimiento: boolean;
}

function StatCard({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div style={{ background: "#111", border: `1px solid ${accent ? "rgba(201,169,110,0.3)" : "#1a1a1a"}`, borderRadius: "14px", padding: "1.25rem 1.5rem" }}>
      <p style={{ color: "rgba(240,237,230,0.4)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{label}</p>
      <p style={{ color: accent ? "#c9a96e" : "#f0ede6", fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}>{value}</p>
    </div>
  );
}

export function AdminClient({ authKey }: { authKey: string }) {
  const [leads, setLeads]       = useState<Lead[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [pulso, setPulso]       = useState(false);
  const [lastSince, setLastSince] = useState("ahora mismo");
  const lastUpdatedRef          = useRef<Date>(new Date());

  const timeSince = (d: Date) => {
    const s = Math.floor((Date.now() - d.getTime()) / 1000);
    if (s < 10)  return "ahora mismo";
    if (s < 60)  return `hace ${s} seg`;
    if (s < 120) return "hace 1 min";
    return `hace ${Math.floor(s / 60)} min`;
  };

  // Contador "hace X seg"
  useEffect(() => {
    const t = setInterval(() => setLastSince(timeSince(lastUpdatedRef.current)), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchLeads = useCallback(async () => {
    const { data, error: err } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) {
      setError(err.message);
    } else {
      setLeads((data ?? []) as Lead[]);
      setError(null);
    }
    setLoading(false);
    lastUpdatedRef.current = new Date();
    setLastSince("ahora mismo");
    setPulso(true);
    setTimeout(() => setPulso(false), 800);
  }, []);

  // Carga inicial
  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // Supabase Realtime — actualización instantánea
  useEffect(() => {
    const channel = supabase
      .channel("admin-leads-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
        fetchLeads();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchLeads]);

  // Polling de respaldo cada 10 segundos
  useEffect(() => {
    const t = setInterval(fetchLeads, 10000);
    return () => clearInterval(t);
  }, [fetchLeads]);

  const updateEstado = async (id: string, estado: string) => {
    await supabase.from("leads").update({ estado }).eq("id", id);
    await fetchLeads();
  };

  const updateNota = async (id: string, nota: string) => {
    await supabase.from("leads").update({ mensaje: nota || null }).eq("id", id);
    await fetchLeads();
  };

  const deleteLead = async (id: string) => {
    await supabase.from("leads").delete().eq("id", id);
    await fetchLeads();
  };

  const hoy          = leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length;
  const estaSeamana  = leads.filter(l => (Date.now() - new Date(l.created_at).getTime()) < 7 * 86400000).length;
  const nuevos       = leads.filter(l => l.estado === "nuevo").length;

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f0ede6", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(10,10,10,0.96)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ color: "#c9a96e", fontWeight: 900, letterSpacing: "0.22em", fontSize: "0.875rem" }}>ASHER</span>
          <span style={{ color: "#2a2a2a" }}>|</span>
          <span style={{ color: "rgba(240,237,230,0.4)", fontSize: "0.8rem" }}>Panel de Leads</span>
          {/* Indicador en vivo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(100,200,120,0.08)", border: "1px solid rgba(100,200,120,0.2)", borderRadius: "999px", padding: "0.2rem 0.6rem", marginLeft: "0.5rem" }}>
            <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: pulso ? "#fff" : "#64c878", boxShadow: pulso ? "0 0 0 4px rgba(100,200,120,0.4)" : "0 0 0 2px rgba(100,200,120,0.2)", transition: "all 0.3s" }} />
            <span style={{ color: "#64c878", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em" }}>EN VIVO</span>
          </div>
          <span style={{ color: "rgba(240,237,230,0.2)", fontSize: "0.68rem" }}>· {lastSince}</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button onClick={fetchLeads} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #2a2a2a", color: "rgba(240,237,230,0.4)", borderRadius: "8px", padding: "0.3rem 0.75rem", fontSize: "0.72rem", cursor: "pointer" }}>
            ↻ Actualizar
          </button>
          <a href="/" style={{ color: "rgba(240,237,230,0.2)", fontSize: "0.7rem", textDecoration: "none" }}>← Sitio</a>
        </div>
      </div>

      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "rgba(240,237,230,0.3)" }}>Cargando leads…</div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <p style={{ color: "#e05a5a", fontWeight: 700, marginBottom: "0.5rem" }}>Error al conectar con Supabase</p>
            <code style={{ color: "rgba(240,237,230,0.4)", fontSize: "0.8rem" }}>{error}</code>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              <StatCard label="Total"       value={leads.length} />
              <StatCard label="Esta semana" value={estaSeamana} />
              <StatCard label="Hoy"         value={hoy} />
              <StatCard label="Sin atender" value={nuevos} accent />
            </div>

            {/* Tabla */}
            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "18px", padding: "1.5rem" }}>
              <h2 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1.25rem" }}>Contactos registrados</h2>
              <LeadsTable
                leads={leads}
                onRefresh={fetchLeads}
                onUpdateEstado={updateEstado}
                onUpdateNota={updateNota}
                onDelete={deleteLead}
              />
            </div>
          </>
        )}

        <p style={{ color: "rgba(240,237,230,0.1)", fontSize: "0.65rem", textAlign: "center", marginTop: "2rem" }}>
          ASHER · Panel privado · Datos confidenciales
        </p>
      </div>
    </main>
  );
}
