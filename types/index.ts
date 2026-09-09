export type RutaId =
  | "crear_marca"
  | "mejorar_marca"
  | "publicidad"
  | "digitalizacion"
  | "blindaje_legal"
  | "contacto_general";

export interface Ruta {
  id: RutaId;
  titulo: string;
  tagline: string;
  icono: string;
  para: string;
  paquete: string;
  incluye: string[];
  mensajeWhatsapp: string;
  mensajeDiagnostico: string;
}

export interface LeadFormData {
  nombre: string;
  apellido: string;
  pais: string;
  codigoPais: string;
  celular: string;
  correo: string;
  rutaInteres: RutaId;
  mensajeWhatsapp: string;
  mensaje: string;
  desdeDiagnostico: boolean;
  resultadoDiagnostico?: string;
  seccionOrigen?: string;
  consentimiento: boolean;
}

export interface PaisOption {
  nombre: string;
  codigo: string;
  bandera: string;
}

export interface DiagnosticoState {
  pregunta1: string | null;
  pregunta2: string | null;
  pregunta3: string | null;
  rutaRecomendada: RutaId | null;
}
