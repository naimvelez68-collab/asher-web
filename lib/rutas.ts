import type { Ruta, RutaId } from "@/types";

export const RUTAS: Ruta[] = [
  {
    id: "crear_marca",
    titulo: "Crear mi marca desde cero",
    tagline: "Para emprendedores y negocios que arrancan con todo.",
    icono: "✦",
    para: "Emprendedores, profesionales o negocios nuevos",
    paquete: "Marca Lista para Lanzar",
    incluye: [
      "Naming e identidad de marca",
      "Logo, paleta de colores y tipografías",
      "Propuesta de valor clara",
      "Configuración de redes sociales iniciales",
      "Contenido base de lanzamiento",
      "Página o landing inicial",
      "Blindaje legal básico (registro de marca / estructura legal si aplica)",
    ],
    mensajeWhatsapp: "Hola ASHER, quiero crear mi marca desde cero.",
    mensajeDiagnostico: "Hola ASHER, hice el diagnóstico y me interesa crear mi marca desde cero.",
  },
  {
    id: "mejorar_marca",
    titulo: "Mejorar una marca existente",
    tagline: "Para marcas que ya existen pero merecen verse mejor.",
    icono: "◈",
    para: "Marcas que se ven improvisadas o desactualizadas",
    paquete: "Rebranding Estratégico",
    incluye: [
      "Rebranding y rediseño visual completo",
      "Nueva identidad y estrategia de comunicación",
      "Optimización y actualización de redes sociales",
      "Propuesta de valor renovada",
      "Revisión legal de marca existente",
    ],
    mensajeWhatsapp: "Hola ASHER, quiero mejorar la imagen de mi marca.",
    mensajeDiagnostico: "Hola ASHER, hice el diagnóstico y quiero mejorar la imagen de mi marca.",
  },
  {
    id: "publicidad",
    titulo: "Vender más con publicidad y contenido",
    tagline: "Para negocios que necesitan más clientes y más ventas.",
    icono: "◎",
    para: "Negocios con producto o servicio listo para escalar",
    paquete: "Impulso Digital",
    incluye: [
      "Estrategia de contenido y copys",
      "Guiones, fotos y videos",
      "Manejo profesional de redes sociales",
      "Meta Ads, Google Ads y TikTok Ads",
      "Campañas de generación de clientes",
      "Remarketing y seguimiento de resultados",
    ],
    mensajeWhatsapp: "Hola ASHER, quiero vender más con publicidad y contenido.",
    mensajeDiagnostico: "Hola ASHER, hice el diagnóstico y quiero vender más con publicidad y contenido.",
  },
  {
    id: "digitalizacion",
    titulo: "Digitalizar mi negocio",
    tagline: "Para quienes necesitan presencia digital o herramientas tech.",
    icono: "⬡",
    para: "Negocios sin presencia digital o con herramientas obsoletas",
    paquete: "Presencia Web Profesional",
    incluye: [
      "Páginas web, landing pages y catálogos digitales",
      "Tiendas virtuales y portafolios",
      "Correos institucionales y formularios",
      "Automatizaciones y CRM",
      "Aplicaciones o herramientas internas a medida",
    ],
    mensajeWhatsapp: "Hola ASHER, quiero digitalizar mi negocio.",
    mensajeDiagnostico: "Hola ASHER, hice el diagnóstico y quiero digitalizar mi negocio.",
  },
  {
    id: "blindaje_legal",
    titulo: "Proteger mi marca y mi negocio",
    tagline: "Blindaje legal como respaldo de todo lo que construyes.",
    icono: "⬟",
    para: "Marcas y negocios que quieren operar con seguridad jurídica",
    paquete: "Blindaje Legal de Marca",
    incluye: [
      "Registro de marca ante autoridades competentes",
      "Contratos, términos y condiciones",
      "Políticas de privacidad y protección de datos",
      "Constitución de compañías y estructura societaria",
      "Permisos, licencias y cumplimiento normativo",
      "Protección de activos intangibles",
    ],
    mensajeWhatsapp: "Hola ASHER, quiero proteger mi marca o mi negocio.",
    mensajeDiagnostico: "Hola ASHER, hice el diagnóstico y quiero proteger mi marca o mi negocio.",
  },
];

export const RUTA_MAP: Record<RutaId, Ruta> = Object.fromEntries(
  RUTAS.map((r) => [r.id, r])
) as Record<RutaId, Ruta>;

export const WHATSAPP_NUMERO = "593992198798";

export const MENSAJE_CONTACTO_GENERAL = "Hola ASHER, quiero información sobre sus servicios.";

export function buildWhatsAppUrl(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

export function openWhatsApp(mensaje: string): void {
  window.open(buildWhatsAppUrl(mensaje), "_blank", "noopener,noreferrer");
}

export function getMensajeByRuta(rutaId: RutaId, desdeDiagnostico = false): string {
  if (rutaId === "contacto_general") return MENSAJE_CONTACTO_GENERAL;
  const ruta = RUTA_MAP[rutaId];
  if (!ruta) return MENSAJE_CONTACTO_GENERAL;
  return desdeDiagnostico ? ruta.mensajeDiagnostico : ruta.mensajeWhatsapp;
}
