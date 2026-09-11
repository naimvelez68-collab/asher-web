"use client";

import { buttonVariants } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const NAVY = "#0B1956";
const IVORY = "#F7F4ED";

interface PricingTier {
  name: string;
  audience: string;
  features: string[];
  note: string;
  buttonText: string;
  isPopular: boolean;
}

// Los tres niveles reales de cliente ASHER (Emprende / PYME / Corporativo).
// Sin cifras: el modelo real es por hora/proyecto/retainer, no suscripción
// mensual — publicar la tarifa horaria interna no corresponde en un sitio
// público, así que cada nivel cotiza a la medida.
const TIERS: PricingTier[] = [
  {
    name: "ASHER Emprende",
    audience: "Profesionales independientes, emprendimientos y fundaciones.",
    features: [
      "Naming e identidad de marca",
      "Logo, paleta y manual de uso básico",
      "Presencia digital inicial",
      "Blindaje legal esencial (registro de marca)",
    ],
    note: "Cotización a la medida",
    buttonText: "Cotizar mi proyecto",
    isPopular: false,
  },
  {
    name: "ASHER PYME",
    audience: "Empresas formalizadas con menos de 70 colaboradores.",
    features: [
      "Todo lo de ASHER Emprende",
      "Estrategia de marketing y publicidad con seguimiento",
      "Automatización y herramientas digitales a medida",
      "Blindaje legal integral (contratos, políticas, cumplimiento)",
      "Retainer mensual con un solo punto de contacto",
    ],
    note: "Nuestro nivel más elegido",
    buttonText: "Hablar con ASHER",
    isPopular: true,
  },
  {
    name: "ASHER Corporativo",
    audience: "Empresas de 70+ colaboradores, sector público y grupos empresariales.",
    features: [
      "Todo lo de ASHER PYME",
      "Equipo dedicado y tiempos de respuesta prioritarios",
      "Estructuración societaria y M&A",
      "Cumplimiento normativo avanzado",
      "Reportes ejecutivos y KPIs a medida",
    ],
    note: "Cotización a la medida",
    buttonText: "Agendar consultoría",
    isPopular: false,
  },
];

interface AsherPricingProps {
  onContact: (origen?: string) => void;
}

export function AsherPricing({ onContact }: AsherPricingProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section id="planes" className="py-24 px-6 md:px-10 md:py-32" style={{ background: IVORY }}>
      <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8" style={{ background: "#8084B7" }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.5)" }}>
            Niveles de cliente
          </span>
        </div>
        <h2 className="font-medium tracking-tight" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", color: NAVY, lineHeight: 1.05 }}>
          Un nivel para cada
          <br />
          <span style={{ color: "rgba(11,25,86,0.45)" }}>etapa de tu negocio</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed md:text-base" style={{ color: "rgba(11,25,86,0.6)" }}>
          Trabajamos por proyecto o por retainer mensual, según tu nivel. Sin sorpresas: te cotizamos
          antes de empezar y el alcance queda por escrito.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
        {TIERS.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ y: 40, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: tier.isPopular ? -16 : 0,
                    opacity: 1,
                    scale: tier.isPopular ? 1 : 0.97,
                  }
                : { y: 0, opacity: 1 }
            }
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: index * 0.08 }}
            className={cn(
              "relative flex flex-col rounded-2xl border p-7 text-left",
              tier.isPopular ? "z-10" : "z-0"
            )}
            style={{
              background: "#FBF9F5",
              borderColor: tier.isPopular ? "#0B1956" : "rgba(11,25,86,0.1)",
              borderWidth: tier.isPopular ? 2 : 1,
            }}
          >
            {tier.isPopular && (
              <div
                className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl rounded-tr-xl px-3 py-1"
                style={{ background: NAVY }}
              >
                <Star className="h-3.5 w-3.5 fill-current" style={{ color: IVORY }} />
                <span className="text-xs font-semibold" style={{ color: IVORY }}>Popular</span>
              </div>
            )}

            <p className="text-lg font-semibold" style={{ color: NAVY }}>{tier.name}</p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(11,25,86,0.6)" }}>{tier.audience}</p>

            <p className="mt-6 text-2xl font-black tracking-tight" style={{ color: NAVY }}>{tier.note}</p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#8084B7" }} />
                  <span className="text-left text-sm" style={{ color: "rgba(11,25,86,0.75)" }}>{feature}</span>
                </li>
              ))}
            </ul>

            <hr className="my-6 w-full" style={{ borderColor: "rgba(11,25,86,0.1)" }} />

            <button
              onClick={() => onContact(`planes_${tier.name.toLowerCase().replace(/\s+/g, "_")}`)}
              className={cn(
                buttonVariants({ variant: tier.isPopular ? "default" : "outline" }),
                "group relative mt-auto w-full gap-2 overflow-hidden text-base font-semibold"
              )}
              style={
                tier.isPopular
                  ? { background: NAVY, color: IVORY }
                  : { background: "transparent", color: NAVY, borderColor: "rgba(11,25,86,0.25)" }
              }
            >
              {tier.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
