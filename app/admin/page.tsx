import { AdminClient } from "./_components/admin-client";

export const dynamic = "force-dynamic";

function LoginPage({ wrongKey }: { wrongKey: boolean }) {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "380px", padding: "2rem" }}>
        <p style={{ color: "#c9a96e", fontWeight: 900, letterSpacing: "0.22em", fontSize: "0.875rem", marginBottom: "0.5rem" }}>ASHER</p>
        <h1 style={{ color: "#f0ede6", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>Panel de Leads</h1>
        <p style={{ color: "rgba(240,237,230,0.35)", fontSize: "0.8rem", marginBottom: "2rem" }}>
          Acceso privado para el equipo ASHER.
        </p>
        {wrongKey && (
          <p style={{ color: "#e05a5a", fontSize: "0.8rem", marginBottom: "1rem" }}>Contraseña incorrecta.</p>
        )}
        <form method="GET" action="/admin">
          <input
            name="key"
            type="password"
            placeholder="Contraseña"
            autoFocus
            style={{ width: "100%", background: "#111", border: "1px solid #2a2a2a", color: "#f0ede6", borderRadius: "12px", padding: "0.875rem 1rem", fontSize: "0.9rem", outline: "none", marginBottom: "0.75rem", boxSizing: "border-box" }}
          />
          <button type="submit" style={{ width: "100%", background: "#c9a96e", color: "#0a0a0a", border: "none", borderRadius: "12px", padding: "0.875rem", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer" }}>
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const key     = (searchParams.key ?? "").trim();
  const ADMIN_PW = (process.env.ADMIN_PASSWORD ?? "").trim() || "Asher27";
  const autenticado = key === ADMIN_PW;

  if (!autenticado) {
    return <LoginPage wrongKey={!!key} />;
  }

  // Pasa la clave al cliente para que haga las queries en el browser (evita ByteString en Node)
  return <AdminClient authKey={key} />;
}
