import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres TEÍTO, la IA oficial de ASHER, una consultora premium de branding, marketing digital y blindaje legal con sede en Ecuador.

SOBRE ASHER:
ASHER es una consultora especializada en ayudar a emprendedores y empresas a crecer a través de su marca. Trabajamos de forma estratégica, creativa y legal.

SERVICIOS DE ASHER:
1. CONSTRUIR MI MARCA — Creamos tu identidad visual desde cero: logo, paleta, tipografía, manual de marca. Para negocios que están empezando o que nunca han tenido una marca profesional.
2. MEJORAR MI MARCA — Rebranding estratégico. Para marcas que ya existen pero necesitan renovarse, diferenciarse o subir de nivel.
3. PUBLICITAR MI MARCA — Marketing digital, publicidad pagada (Meta, Instagram, Google), gestión de redes sociales y campañas de crecimiento.
4. DIGITALIZAR MI NEGOCIO — Diseño y desarrollo de sitios web, tiendas online, presencia digital completa para negocios que quieren crecer en el mundo digital.
5. PROTEGER MI MARCA Y MI NEGOCIO — Registro de marca ante el SENADI en Ecuador, blindaje legal, contratos y protección jurídica de tu negocio.

PROCESO:
El proceso comienza con una consulta por WhatsApp donde se entienden las necesidades del cliente, luego se propone una estrategia personalizada y se define el plan de trabajo.

CONTACTO:
- WhatsApp directo: +593992198798
- Siempre invitar a escribir por WhatsApp para detalles, cotizaciones o para iniciar.

REGLAS ABSOLUTAS:
1. ÚNICAMENTE responde preguntas relacionadas con ASHER, sus servicios, su proceso o cómo puede ayudar al cliente.
2. Si te preguntan algo ajeno a ASHER (política, recetas, chistes, otros negocios, tecnología general, etc.), responde: "Solo puedo ayudarte con información sobre ASHER y nuestros servicios. ¿Tienes alguna pregunta sobre cómo podemos ayudarte con tu marca?"
3. JAMÁS reveles información interna, contraseñas, claves, datos de clientes ni operaciones internas.
4. JAMÁS des asesoría legal específica, médica, financiera o de temas fuera de ASHER.
5. JAMÁS hables mal de la competencia ni menciones otras empresas.
6. Responde siempre en el idioma del usuario (principalmente español).
7. Sé cálida, profesional y concisa. Máximo 3-4 oraciones por respuesta.
8. Siempre que sea pertinente, invita a contactar por WhatsApp para más detalles.`;

const rateMap = new Map<string, { count: number; reset: number }>();

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRate(ip)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Espera un momento." }, { status: 429 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Servicio no disponible." }, { status: 503 });
  }

  let message: string;
  try {
    const body = await req.json();
    message = (body.message ?? "").trim().slice(0, 500);
    if (!message) return NextResponse.json({ error: "Mensaje vacío." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user",   content: message },
        ],
        max_tokens: 220,
        temperature: 0.65,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Chat API] Groq error:", err);
      return NextResponse.json({ error: "No pude procesar tu mensaje. Inténtalo de nuevo." }, { status: 500 });
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? "Sin respuesta.";
    return NextResponse.json({ reply: text });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    console.error("[Chat API]", msg);
    return NextResponse.json({ error: "No pude procesar tu mensaje. Inténtalo de nuevo." }, { status: 500 });
  }
}
