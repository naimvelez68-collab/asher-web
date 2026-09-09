import { z } from "zod";

export const leadSchema = z
  .object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    pais: z.string().min(1, "Selecciona un país"),
    codigoPais: z.string().min(1, "El código de país es obligatorio"),
    celular: z.string().optional(),
    correo: z
      .string()
      .optional()
      .refine((val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Ingresa un correo válido",
      }),
    rutaInteres: z.string().min(1),
    mensajeWhatsapp: z.string().min(1),
    mensaje: z.string().optional(),
    desdeDiagnostico: z.boolean().default(false),
    resultadoDiagnostico: z.string().optional(),
    seccionOrigen: z.string().optional(),
    consentimiento: z
      .boolean()
      .refine((val) => val === true, { message: "Debes aceptar el uso de tus datos" }),
  })
  .refine(
    (data) => {
      const tieneCelular = data.celular && data.celular.trim().length > 3;
      const tieneCorreo = data.correo && data.correo.trim().length > 0;
      return tieneCelular || tieneCorreo;
    },
    { message: "Ingresa al menos tu celular o tu correo", path: ["celular"] }
  );

export type LeadSchemaInput = z.infer<typeof leadSchema>;
