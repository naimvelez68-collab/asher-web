"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const INITIAL: Message = {
  role: "bot",
  text: "Hola, soy TEÍTO, la IA de ASHER ✦ ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros servicios de branding, marketing, diseño web o blindaje legal.",
};

export function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState<Message[]>([INITIAL]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, msgs]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMsgs(m => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMsgs(m => [...m, { role: "bot", text: data.reply ?? data.error ?? "Sin respuesta." }]);
    } catch {
      setMsgs(m => [...m, { role: "bot", text: "Error de conexión. Inténtalo de nuevo." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir chat TEÍTO"
        style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 999,
          width: "60px", height: "60px", borderRadius: "50%",
          background: "#0B1956",
          border: "1.5px solid rgba(128,132,183,0.5)",
          cursor: "pointer",
          boxShadow: "0 4px 24px rgba(11,25,86,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          overflow: "hidden",
          padding: 0,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 32px rgba(11,25,86,0.5)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(11,25,86,0.35)";
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F7F4ED" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <div style={{
            position: "relative", width: "76%", height: "76%", borderRadius: "30%",
            background: "#F7F4ED", overflow: "hidden",
          }}>
            <img
              src="/asher-logo-mark.png"
              alt="ASHER"
              style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", height: "128%", width: "auto" }}
            />
          </div>
        )}
      </button>

      {/* Ventana de chat */}
      {open && (
        <div
          style={{
            position: "fixed", bottom: "5rem", right: "1.5rem", zIndex: 998,
            width: "min(360px, calc(100vw - 2rem))",
            height: "min(520px, calc(100vh - 7rem))",
            background: "#FBF9F5", border: "1px solid rgba(11,25,86,0.12)",
            borderRadius: "20px", display: "flex", flexDirection: "column",
            boxShadow: "0 24px 60px rgba(11,25,86,0.22)",
            overflow: "hidden",
            animation: "chatIn 0.22s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <style>{`
            @keyframes chatIn {
              from { opacity: 0; transform: translateY(16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(11,25,86,0.1)", display: "flex", alignItems: "center", gap: "0.75rem", background: "#F1E7DA" }}>
            <div style={{ position: "relative", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid rgba(128,132,183,0.45)", overflow: "hidden", flexShrink: 0, background: "#F7F4ED" }}>
              <img
                src="/asher-logo-mark.png"
                alt="ASHER"
                style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", height: "128%", width: "auto" }}
              />
            </div>
            <div>
              <p style={{ color: "#0B1956", fontWeight: 700, fontSize: "0.85rem", lineHeight: 1 }}>
                TEÍTO <span style={{ color: "rgba(11,25,86,0.5)", fontWeight: 400, fontSize: "0.72rem" }}>· IA de ASHER</span>
              </p>
              <p style={{ color: "#3f8a5c", fontSize: "0.65rem", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#3f8a5c" }} />
                En línea
              </p>
            </div>
          </div>

          {/* Mensajes */}
          <div data-lenis-prevent style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    maxWidth: "82%", padding: "0.6rem 0.9rem",
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: m.role === "user"
                      ? "linear-gradient(135deg,#0B1956,#3d4a8f)"
                      : "#F1E7DA",
                    color: m.role === "user" ? "#F7F4ED" : "#0B1956",
                    fontSize: "0.82rem", lineHeight: "1.5",
                    fontWeight: m.role === "user" ? 600 : 400,
                    border: m.role === "bot" ? "1px solid rgba(11,25,86,0.1)" : "none",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: "#F1E7DA", border: "1px solid rgba(11,25,86,0.1)", borderRadius: "16px 16px 16px 4px", padding: "0.6rem 1rem", display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8084B7", display: "inline-block", animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Atajo WhatsApp */}
          <div style={{ padding: "0.5rem 1rem 0", borderTop: "1px solid rgba(11,25,86,0.08)" }}>
            <a
              href="https://wa.me/593992198798"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#3f8a5c", fontSize: "0.72rem", textDecoration: "none", padding: "0.4rem 0" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#3f8a5c"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Hablar directo por WhatsApp
            </a>
          </div>

          {/* Input */}
          <div style={{ padding: "0.75rem 1rem", display: "flex", gap: "0.5rem", borderTop: "1px solid rgba(11,25,86,0.1)" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu pregunta…"
              maxLength={500}
              disabled={loading}
              style={{
                flex: 1, background: "#F1E7DA", border: "1px solid rgba(11,25,86,0.12)",
                borderRadius: "12px", padding: "0.6rem 0.875rem",
                color: "#0B1956", fontSize: "0.82rem", outline: "none",
                opacity: loading ? 0.6 : 1,
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() && !loading ? "#0B1956" : "rgba(11,25,86,0.15)",
                border: "none", borderRadius: "12px",
                width: "40px", height: "40px", flexShrink: 0,
                cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? "#F7F4ED" : "rgba(11,25,86,0.4)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
