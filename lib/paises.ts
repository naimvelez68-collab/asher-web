import type { PaisOption } from "@/types";

export const PAISES: PaisOption[] = [
  { nombre: "Ecuador", codigo: "+593", bandera: "🇪🇨" },
  { nombre: "Colombia", codigo: "+57", bandera: "🇨🇴" },
  { nombre: "Perú", codigo: "+51", bandera: "🇵🇪" },
  { nombre: "México", codigo: "+52", bandera: "🇲🇽" },
  { nombre: "Estados Unidos", codigo: "+1", bandera: "🇺🇸" },
  { nombre: "Canadá", codigo: "+1", bandera: "🇨🇦" },
  { nombre: "Argentina", codigo: "+54", bandera: "🇦🇷" },
  { nombre: "Chile", codigo: "+56", bandera: "🇨🇱" },
  { nombre: "España", codigo: "+34", bandera: "🇪🇸" },
  { nombre: "Bolivia", codigo: "+591", bandera: "🇧🇴" },
  { nombre: "Costa Rica", codigo: "+506", bandera: "🇨🇷" },
  { nombre: "Cuba", codigo: "+53", bandera: "🇨🇺" },
  { nombre: "El Salvador", codigo: "+503", bandera: "🇸🇻" },
  { nombre: "Guatemala", codigo: "+502", bandera: "🇬🇹" },
  { nombre: "Honduras", codigo: "+504", bandera: "🇭🇳" },
  { nombre: "Nicaragua", codigo: "+505", bandera: "🇳🇮" },
  { nombre: "Panamá", codigo: "+507", bandera: "🇵🇦" },
  { nombre: "Paraguay", codigo: "+595", bandera: "🇵🇾" },
  { nombre: "República Dominicana", codigo: "+1", bandera: "🇩🇴" },
  { nombre: "Uruguay", codigo: "+598", bandera: "🇺🇾" },
  { nombre: "Venezuela", codigo: "+58", bandera: "🇻🇪" },
  { nombre: "Puerto Rico", codigo: "+1", bandera: "🇵🇷" },
  { nombre: "Otro país", codigo: "", bandera: "🌍" },
];

export function getCodigoPorPais(nombre: string): string {
  const p = PAISES.find((p) => p.nombre === nombre);
  return p?.codigo ?? "";
}

export function normalizarCelular(celular: string, codigoPais: string): string {
  let numero = celular.replace(/[\s\-().+]/g, "");
  if (numero.startsWith("0")) numero = numero.slice(1);
  const codigo = codigoPais.replace("+", "");
  return `+${codigo}${numero}`;
}
