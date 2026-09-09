import { NextRequest, NextResponse } from "next/server";

const RUTA_LABELS: Record<string, string> = {
  branding:         "Construir mi marca (Branding)",
  mejorar:          "Mejorar mi marca (Rebranding)",
  publicidad:       "Publicitar mi marca",
  web:              "Digitalizar mi negocio",
  legal:            "Proteger mi marca y negocio",
  integral:         "Servicio Integral",
  contacto_general: "Contacto general",
};

function buildHtml(data: Record<string, unknown>): string {
  const ruta  = RUTA_LABELS[data.ruta_interes as string] ?? data.ruta_interes;
  const diag  = data.desde_diagnostico
    ? `✅ Sí — Resultado: <strong>${RUTA_LABELS[data.resultado_diagnostico as string] ?? data.resultado_diagnostico ?? "—"}</strong>`
    : "No";
  const fecha = new Date().toLocaleString("es-EC", {
    timeZone: "America/Guayaquil",
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#111111;border-radius:16px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a1a1a,#0d0d0d);padding:28px 32px;border-bottom:1px solid #2a2a2a;">
            <p style="margin:0;color:#c9a96e;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">ASHER</p>
            <h1 style="margin:8px 0 0;color:#f0ede6;font-size:22px;font-weight:800;">🆕 Nuevo lead recibido</h1>
            <p style="margin:6px 0 0;color:rgba(240,237,230,0.4);font-size:13px;">${fecha} (Ecuador)</p>
          </td>
        </tr>

        <!-- Datos de contacto -->
        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0 0 16px;color:#c9a96e;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">📋 Datos de contacto</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
                  <span style="color:rgba(240,237,230,0.4);font-size:12px;">Nombre</span><br>
                  <span style="color:#f0ede6;font-size:16px;font-weight:600;">${data.nombre} ${data.apellido}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
                  <span style="color:rgba(240,237,230,0.4);font-size:12px;">País</span><br>
                  <span style="color:#f0ede6;font-size:15px;">${data.pais} &nbsp;<span style="color:rgba(240,237,230,0.4);font-size:13px;">${data.codigo_pais ?? ""}</span></span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
                  <span style="color:rgba(240,237,230,0.4);font-size:12px;">Celular / WhatsApp</span><br>
                  <span style="color:#c9a96e;font-size:16px;font-weight:700;">${data.celular ?? "—"}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
                  <span style="color:rgba(240,237,230,0.4);font-size:12px;">Correo electrónico</span><br>
                  <span style="color:#f0ede6;font-size:14px;">${data.correo ?? "No proporcionó"}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Interés y diagnóstico -->
        <tr>
          <td style="padding:24px 32px 0;">
            <p style="margin:0 0 16px;color:#c9a96e;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">🎯 Interés y diagnóstico</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
                  <span style="color:rgba(240,237,230,0.4);font-size:12px;">Ruta de interés</span><br>
                  <span style="display:inline-block;margin-top:4px;background:rgba(201,169,110,0.12);color:#c9a96e;border-radius:6px;padding:4px 10px;font-size:13px;font-weight:700;">${ruta}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
                  <span style="color:rgba(240,237,230,0.4);font-size:12px;">¿Vino del diagnóstico?</span><br>
                  <span style="color:#f0ede6;font-size:14px;margin-top:4px;display:block;">${diag}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
                  <span style="color:rgba(240,237,230,0.4);font-size:12px;">Sección de origen</span><br>
                  <span style="color:#f0ede6;font-size:14px;">${data.seccion_origen ?? "—"}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Mensaje -->
        ${data.mensaje ? `
        <tr>
          <td style="padding:24px 32px 0;">
            <p style="margin:0 0 12px;color:#c9a96e;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">💬 Mensaje del cliente</p>
            <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:16px;">
              <p style="margin:0;color:#f0ede6;font-size:14px;line-height:1.6;font-style:italic;">"${data.mensaje}"</p>
            </div>
          </td>
        </tr>` : ""}

        <!-- CTA -->
        <tr>
          <td style="padding:28px 32px;">
            <a href="https://wa.me/${(data.celular as string ?? "").replace(/[^0-9]/g, "")}"
               style="display:block;text-align:center;background:linear-gradient(135deg,#c9a96e,#a8834a);color:#0a0a0a;font-weight:800;font-size:15px;text-decoration:none;border-radius:50px;padding:16px 24px;">
              📲 Contactar por WhatsApp ahora
            </a>
            <p style="margin:16px 0 0;text-align:center;color:rgba(240,237,230,0.2);font-size:11px;">
              ASHER · Panel admin: asher-web.vercel.app/admin?key=Asher27
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false });

  try {
    const data = await req.json();
    const nombre = `${data.nombre ?? ""} ${data.apellido ?? ""}`.trim();

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:    "ASHER Leads <onboarding@resend.dev>",
        to:      ["asherlegalbranding@gmail.com"],
        subject: `🆕 Nuevo lead: ${nombre} — ${RUTA_LABELS[data.ruta_interes] ?? data.ruta_interes}`,
        html:    buildHtml(data),
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
