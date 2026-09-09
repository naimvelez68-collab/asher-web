"use client";

import { useState, useMemo } from "react";

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

const RUTA_LABELS: Record<string, string> = {
  branding:         "Branding",
  publicidad:       "Publicidad",
  web:              "Web / Digital",
  legal:            "Blindaje Legal",
  integral:         "Integral",
  contacto_general: "General",
};

const ESTADOS = ["nuevo", "contactado", "seguimiento", "cerrado"];

const ESTADO_COLORS: Record<string, { bg: string; text: string }> = {
  nuevo:       { bg: "rgba(201,169,110,0.15)", text: "#c9a96e" },
  contactado:  { bg: "rgba(100,200,120,0.12)", text: "#64c878" },
  seguimiento: { bg: "rgba(100,150,230,0.12)", text: "#6496e6" },
  cerrado:     { bg: "rgba(200,100,100,0.12)", text: "#e05a5a" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-EC", { day: "2-digit", month: "short", year: "numeric" })
    + " · " + d.toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" });
}

function exportCSV(leads: Lead[]) {
  const headers = ["Fecha", "Nombre", "Apellido", "País", "Celular", "Correo", "Ruta", "Origen", "Estado", "Nota"];
  const rows = leads.map(l => [
    formatDate(l.created_at), l.nombre, l.apellido, l.pais,
    l.celular ?? "", l.correo ?? "",
    RUTA_LABELS[l.ruta_interes] ?? l.ruta_interes,
    l.seccion_origen ?? "", l.estado,
    (l.mensaje ?? "").replace(/\n/g, " "),
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `asher_leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

interface LeadsTableProps {
  leads: Lead[];
  onRefresh: () => void;
  onUpdateEstado: (id: string, estado: string) => Promise<void>;
  onUpdateNota: (id: string, nota: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function LeadsTable({ leads, onRefresh, onUpdateEstado, onUpdateNota, onDelete }: LeadsTableProps) {
  const [busqueda, setBusqueda]         = useState("");
  const [filtroRuta, setFiltroRuta]     = useState("todas");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [copiado, setCopiado]           = useState<string | null>(null);
  const [editandoNota, setEditandoNota] = useState<string | null>(null);
  const [notaTemp, setNotaTemp]         = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [guardandoId, setGuardandoId]   = useState<string | null>(null);

  const rutas = useMemo(() => {
    const set = new Set(leads.map(l => l.ruta_interes));
    return ["todas", ...Array.from(set)];
  }, [leads]);

  const filtrados = useMemo(() => {
    let r = leads;
    if (filtroRuta !== "todas")   r = r.filter(l => l.ruta_interes === filtroRuta);
    if (filtroEstado !== "todos") r = r.filter(l => l.estado === filtroEstado);
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      r = r.filter(l =>
        l.nombre.toLowerCase().includes(q) ||
        l.apellido.toLowerCase().includes(q) ||
        (l.celular ?? "").includes(q) ||
        (l.correo ?? "").toLowerCase().includes(q) ||
        l.pais.toLowerCase().includes(q)
      );
    }
    return r;
  }, [leads, filtroRuta, filtroEstado, busqueda]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiado(id);
    setTimeout(() => setCopiado(null), 1500);
  };

  const handleEstado = async (id: string, nuevoEstado: string) => {
    setGuardandoId(id);
    await onUpdateEstado(id, nuevoEstado);
    setGuardandoId(null);
  };

  const handleGuardarNota = async (id: string) => {
    setGuardandoId(id);
    await onUpdateNota(id, notaTemp);
    setEditandoNota(null);
    setGuardandoId(null);
  };

  const handleDelete = async (id: string) => {
    setGuardandoId(id);
    await onDelete(id);
    setConfirmDelete(null);
    setGuardandoId(null);
  };

  const inputStyle: React.CSSProperties = {
    background: "#111", border: "1px solid #2a2a2a", color: "#f0ede6",
    borderRadius: "10px", padding: "0.5rem 0.875rem", fontSize: "0.8rem", outline: "none",
  };

  return (
    <div>
      {/* Controles */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Buscar nombre, celular, correo…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ ...inputStyle, flex: "1", minWidth: "200px" }}
        />
        <select value={filtroRuta} onChange={e => setFiltroRuta(e.target.value)} style={inputStyle}>
          {rutas.map(r => (
            <option key={r} value={r} style={{ background: "#111" }}>
              {r === "todas" ? "Todas las rutas" : (RUTA_LABELS[r] ?? r)}
            </option>
          ))}
        </select>
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} style={inputStyle}>
          <option value="todos"       style={{ background: "#111" }}>Todos los estados</option>
          {ESTADOS.map(e => <option key={e} value={e} style={{ background: "#111" }}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>)}
        </select>
        <button
          onClick={() => exportCSV(filtrados)}
          style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", borderRadius: "10px", padding: "0.5rem 1rem", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
        >
          ↓ CSV
        </button>
      </div>

      <p style={{ color: "rgba(240,237,230,0.3)", fontSize: "0.72rem", marginBottom: "0.75rem" }}>
        {filtrados.length} lead{filtrados.length !== 1 ? "s" : ""} · {leads.length} total
      </p>

      {/* Tabla */}
      <div style={{ overflowX: "auto", borderRadius: "14px", border: "1px solid #1a1a1a" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
              {["Fecha", "Nombre", "País", "Celular", "Correo", "Ruta", "Estado", "Nota", ""].map((h, i) => (
                <th key={i} style={{ padding: "0.75rem 1rem", textAlign: "left", color: "rgba(240,237,230,0.3)", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: "3rem", textAlign: "center", color: "rgba(240,237,230,0.25)" }}>
                  No hay leads con ese filtro
                </td>
              </tr>
            ) : filtrados.map((lead, i) => {
              const estadoStyle = ESTADO_COLORS[lead.estado] ?? { bg: "rgba(255,255,255,0.06)", text: "rgba(240,237,230,0.5)" };
              const saving = guardandoId === lead.id;
              const deleting = confirmDelete === lead.id;

              return (
                <tr
                  key={lead.id}
                  style={{
                    borderBottom: "1px solid #141414",
                    background: deleting
                      ? "rgba(224,90,90,0.07)"
                      : saving
                        ? "rgba(201,169,110,0.04)"
                        : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    transition: "background 0.2s",
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {/* Fecha */}
                  <td style={{ padding: "0.75rem 1rem", color: "rgba(240,237,230,0.4)", whiteSpace: "nowrap", fontSize: "0.72rem" }}>
                    {formatDate(lead.created_at)}
                  </td>

                  {/* Nombre */}
                  <td style={{ padding: "0.75rem 1rem", color: "#f0ede6", fontWeight: 500, whiteSpace: "nowrap" }}>
                    {lead.nombre} {lead.apellido}
                  </td>

                  {/* País */}
                  <td style={{ padding: "0.75rem 1rem", color: "rgba(240,237,230,0.55)", whiteSpace: "nowrap" }}>
                    {lead.pais}
                  </td>

                  {/* Celular */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    {lead.celular ? (
                      <button onClick={() => handleCopy(lead.celular!, `cel-${lead.id}`)} style={{ background: "none", border: "none", cursor: "pointer", color: "#c9a96e", fontSize: "0.8rem", padding: 0, fontFamily: "monospace" }}>
                        {copiado === `cel-${lead.id}` ? "✓ Copiado" : lead.celular}
                      </button>
                    ) : <span style={{ color: "rgba(240,237,230,0.2)" }}>—</span>}
                  </td>

                  {/* Correo */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    {lead.correo ? (
                      <button onClick={() => handleCopy(lead.correo!, `email-${lead.id}`)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,237,230,0.6)", fontSize: "0.8rem", padding: 0 }}>
                        {copiado === `email-${lead.id}` ? "✓ Copiado" : lead.correo}
                      </button>
                    ) : <span style={{ color: "rgba(240,237,230,0.2)" }}>—</span>}
                  </td>

                  {/* Ruta */}
                  <td style={{ padding: "0.75rem 1rem", whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-block", background: "rgba(201,169,110,0.1)", color: "#c9a96e", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.7rem", fontWeight: 600 }}>
                      {RUTA_LABELS[lead.ruta_interes] ?? lead.ruta_interes}
                    </span>
                  </td>

                  {/* Estado — dropdown editable */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <select
                      value={lead.estado}
                      onChange={e => handleEstado(lead.id, e.target.value)}
                      disabled={saving}
                      style={{
                        background: estadoStyle.bg,
                        color: estadoStyle.text,
                        border: `1px solid ${estadoStyle.text}33`,
                        borderRadius: "6px",
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        outline: "none",
                        appearance: "none",
                        paddingRight: "1.2rem",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='${encodeURIComponent(estadoStyle.text)}' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.4rem center",
                      }}
                    >
                      {ESTADOS.map(e => (
                        <option key={e} value={e} style={{ background: "#1a1a1a", color: "#f0ede6" }}>
                          {e.charAt(0).toUpperCase() + e.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Nota — editable */}
                  <td style={{ padding: "0.75rem 1rem", maxWidth: "220px" }}>
                    {editandoNota === lead.id ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <textarea
                          value={notaTemp}
                          onChange={e => setNotaTemp(e.target.value)}
                          rows={2}
                          autoFocus
                          style={{ background: "#1a1a1a", border: "1px solid rgba(201,169,110,0.3)", color: "#f0ede6", borderRadius: "6px", padding: "0.3rem 0.5rem", fontSize: "0.75rem", resize: "none", outline: "none", width: "100%" }}
                        />
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <button onClick={() => handleGuardarNota(lead.id)} style={{ background: "#c9a96e", color: "#0a0a0a", border: "none", borderRadius: "5px", padding: "0.2rem 0.5rem", fontSize: "0.7rem", cursor: "pointer", fontWeight: 700 }}>
                            Guardar
                          </button>
                          <button onClick={() => setEditandoNota(null)} style={{ background: "rgba(255,255,255,0.06)", color: "rgba(240,237,230,0.5)", border: "none", borderRadius: "5px", padding: "0.2rem 0.5rem", fontSize: "0.7rem", cursor: "pointer" }}>
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditandoNota(lead.id); setNotaTemp(lead.mensaje ?? ""); }}
                        style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, width: "100%" }}
                        title="Clic para editar nota"
                      >
                        {lead.mensaje ? (
                          <span style={{ color: "rgba(240,237,230,0.5)", fontSize: "0.75rem", display: "block" }}>
                            {lead.mensaje.length > 55 ? lead.mensaje.slice(0, 55) + "…" : lead.mensaje}
                          </span>
                        ) : (
                          <span style={{ color: "rgba(240,237,230,0.15)", fontSize: "0.72rem", fontStyle: "italic" }}>+ Añadir nota</span>
                        )}
                      </button>
                    )}
                  </td>

                  {/* Acciones */}
                  <td style={{ padding: "0.75rem 1rem", whiteSpace: "nowrap" }}>
                    {deleting ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ color: "#e05a5a", fontSize: "0.7rem", fontWeight: 600 }}>¿Eliminar?</span>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          disabled={saving}
                          style={{ background: "#e05a5a", color: "#fff", border: "none", borderRadius: "5px", padding: "0.2rem 0.5rem", fontSize: "0.7rem", cursor: "pointer", fontWeight: 700 }}
                        >
                          Sí
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(240,237,230,0.5)", border: "none", borderRadius: "5px", padding: "0.2rem 0.5rem", fontSize: "0.7rem", cursor: "pointer" }}
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(lead.id)}
                        title="Eliminar lead"
                        style={{ background: "rgba(224,90,90,0.08)", border: "1px solid rgba(224,90,90,0.2)", color: "#e05a5a", borderRadius: "6px", padding: "0.3rem 0.6rem", fontSize: "0.75rem", cursor: "pointer", lineHeight: 1 }}
                      >
                        🗑
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
