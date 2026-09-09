import { NextRequest, NextResponse } from "next/server";

const PHONE_ID  = "1266450593198805";
const API_URL   = `https://graph.facebook.com/v20.0/${PHONE_ID}/messages`;

const RUTAS: Record<string, string> = {
  "1": "Crear mi marca desde cero (Branding)",
  "2": "Mejorar mi marca actual (Rebranding)",
  "3": "Publicitar mi marca (Marketing Digital)",
  "4": "Digitalizar mi negocio (Web / Apps)",
  "5": "Proteger mi marca legalmente (Blindaje Legal)",
  "6": "No sé por dónde empezar",
};

interface Session {
  step:      number;
  ruta?:     string;
  nombre?:   string;
  consulta?: string;
}

// Estado de conversación en memoria (suficiente para bajo tráfico)
const sessions = new Map<string, Session>();

async function send(to: string, body: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!token) return;
  await fetch(API_URL, {
    method:  "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    }),
  });
}

async function sendEmailResumen(telefono: string, s: Session) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const html = `
<!DOCTYPE html><html lang="es"><body style="margin:0;padding:0;background:#f4f1ec;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:520px;background:#111;border-radius:16px;overflow:hidden;">
  <tr><td style="background:#0d0d0d;padding:24px 28px;border-bottom:1px solid #2a2a2a;">
    <p style="margin:0;color:#c9a96e;font-size:11px;font-weight:700;letter-spacing:0.2em;">ASHER</p>
    <h1 style="margin:8px 0 0;color:#f0ede6;font-size:20px;font-weight:800;">💬 Nuevo cliente por WhatsApp</h1>
  </td></tr>
  <tr><td style="padding:24px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
        <span style="color:rgba(240,237,230,0.4);font-size:12px;">Teléfono WhatsApp</span><br>
        <span style="color:#c9a96e;font-size:18px;font-weight:700;">+${telefono}</span>
      </td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
        <span style="color:rgba(240,237,230,0.4);font-size:12px;">Nombre</span><br>
        <span style="color:#f0ede6;font-size:16px;font-weight:600;">${s.nombre ?? "—"}</span>
      </td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;">
        <span style="color:rgba(240,237,230,0.4);font-size:12px;">Servicio de interés</span><br>
        <span style="display:inline-block;margin-top:4px;background:rgba(201,169,110,0.12);color:#c9a96e;border-radius:6px;padding:4px 10px;font-size:13px;font-weight:700;">${s.ruta ?? "—"}</span>
      </td></tr>
      ${s.consulta ? `<tr><td style="padding:10px 0;">
        <span style="color:rgba(240,237,230,0.4);font-size:12px;">Mensaje del cliente</span><br>
        <div style="margin-top:8px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:14px;">
          <p style="margin:0;color:#f0ede6;font-size:14px;line-height:1.6;font-style:italic;">"${s.consulta}"</p>
        </div>
      </td></tr>` : ""}
    </table>
  </td></tr>
  <tr><td style="padding:0 28px 24px;">
    <a href="https://wa.me/${telefono}" style="display:block;text-align:center;background:linear-gradient(135deg,#c9a96e,#a8834a);color:#0a0a0a;font-weight:800;font-size:15px;text-decoration:none;border-radius:50px;padding:14px 24px;">
      📲 Responder por WhatsApp
    </a>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from:    "ASHER Bot <onboarding@resend.dev>",
      to:      ["asherlegalbranding@gmail.com"],
      subject: `💬 WhatsApp: ${s.nombre ?? "Cliente"} — ${s.ruta ?? "Consulta"}`,
      html,
    }),
  });
}

/* ── GET — verificación de webhook ── */
export async function GET(req: NextRequest) {
  const p         = new URL(req.url).searchParams;
  const mode      = p.get("hub.mode");
  const token     = p.get("hub.verify_token");
  const challenge = p.get("hub.challenge");
  const verify    = process.env.WHATSAPP_VERIFY_TOKEN ?? "asher2024bot";

  if (mode === "subscribe" && token === verify) {
    return new Response(challenge ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

/* ── POST — mensajes entrantes ── */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: true }); }

  try {
    const message = (body as any).entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message || message.type !== "text") return NextResponse.json({ ok: true });

    const from = message.from as string;
    const text = ((message.text?.body ?? "") as string).trim();
    const num  = text.replace(/[^1-6]/g, "").slice(0, 1);

    const session: Session = sessions.get(from) ?? { step: 0 };

    if (session.step === 0) {
      await send(from,
        `¡Hola! Soy *TEÍTO*, el asistente de *ASHER* 👋\n\n` +
        `¿Con qué podemos ayudarte hoy? Responde con el número:\n\n` +
        `1️⃣ Crear mi marca desde cero\n` +
        `2️⃣ Mejorar mi marca actual\n` +
        `3️⃣ Publicitar mi marca\n` +
        `4️⃣ Digitalizar mi negocio (web/apps)\n` +
        `5️⃣ Proteger mi marca legalmente\n` +
        `6️⃣ No sé por dónde empezar`
      );
      sessions.set(from, { step: 1 });

    } else if (session.step === 1) {
      const ruta = RUTAS[num] ?? RUTAS["6"];
      await send(from,
        `Excelente elección 🎯 *${ruta}*\n\n¿Cuál es tu nombre y de qué país eres?`
      );
      sessions.set(from, { ...session, step: 2, ruta });

    } else if (session.step === 2) {
      await send(from,
        `Perfecto, *${text}* 😊\n\n¿Tienes alguna pregunta o detalle sobre tu negocio que quieras contarnos? _(Si no, responde *listo*)_`
      );
      sessions.set(from, { ...session, step: 3, nombre: text });

    } else if (session.step === 3) {
      const consulta = text.toLowerCase() !== "listo" ? text : undefined;

      await send(from,
        `✅ ¡Todo listo! Hemos registrado tu consulta.\n\n` +
        `Un asesor de *ASHER* te escribirá a este número muy pronto 🌟\n\n` +
        `_Mientras tanto, conoce más en:_ asher-web.vercel.app`
      );

      await sendEmailResumen(from, { ...session, consulta });
      sessions.delete(from);
    }

  } catch (err) {
    console.error("[WhatsApp Bot]", err);
  }

  return NextResponse.json({ ok: true });
}
