"use client";

import { ArrowRight } from "lucide-react";
import FlowArt, { FlowSection } from "./story-scroll";
import { InteractiveHoverButton } from "./interactive-hover-button";
import { AsherServiciosAccordion } from "./asher-servicios-accordion";
import { AsherProcesoTimeline } from "./asher-proceso-timeline";
import type { RutaId } from "@/types";

interface AsherStoryScrollProps {
  onContact: (origen?: string) => void;
  onContactRuta: (rutaId: RutaId, origen?: string) => void;
}

// ── Paleta de marca ASHER ──────────────────────────────────────────────────────
const NAVY = "#0B1956";
const IVORY = "#F7F4ED";
const SLATE = "#8084B7";
const OLIVE = "#4C5340";

const headingCls = "text-[clamp(2.75rem,9vw,8.5rem)] font-black uppercase leading-[0.88] tracking-tight";
const eyebrowCls = "text-xs font-bold uppercase tracking-[0.2em]";
const bodyCls = "text-[clamp(1rem,2vw,1.4rem)] font-normal leading-relaxed";
const pillarLabelCls = "mb-2 text-sm font-bold uppercase tracking-wider";
const pillarTextCls = "text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed opacity-80";

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Historia de marca: 01 y (04-05) son actos de scroll fijado con GSAP
 * (FlowArt). 02 y 03 son las secciones "Lo Que Hacemos" / "Cómo Trabajamos" —
 * viven fuera del pin porque tienen su propia interacción (acordeón y
 * línea de tiempo con scroll), no la rotación de acto a acto.
 */
export const AsherStoryScroll = ({ onContact, onContactRuta }: AsherStoryScrollProps) => {
  return (
    <>
      <FlowArt aria-label="Presentación ASHER Consulting">
        {/* 01 — Quiénes somos */}
        <FlowSection id="nuestra-historia" aria-label="Quiénes somos" style={{ backgroundColor: NAVY, color: IVORY }}>
          <p className={eyebrowCls}>01 — Quiénes somos</p>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.25)" }} />
          <h2 className={headingCls}>
            Claridad
            <br />
            Para
            <br />
            Crecer
          </h2>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.25)" }} />
          <p className={cx("mt-auto max-w-[50ch]", bodyCls)}>
            Consultora integral de marca, marketing, tecnología y blindaje legal.
            Construimos, mejoramos, digitalizamos y protegemos tu marca — con respaldo legal desde el día uno.
          </p>
        </FlowSection>
      </FlowArt>

      {/* 02 — Lo que hacemos (acordeón de servicios) */}
      <AsherServiciosAccordion onContact={onContactRuta} />

      {/* 03 — Cómo trabajamos (línea de tiempo con scroll) */}
      <AsherProcesoTimeline />

      <FlowArt aria-label="Visión y contacto ASHER Consulting">
        {/* 04 — Nuestra visión */}
        <FlowSection id="vision" aria-label="Nuestra visión" style={{ backgroundColor: OLIVE, color: IVORY }}>
          <p className={eyebrowCls}>04 — Nuestra visión</p>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.25)" }} />
          <h2 className={headingCls}>
            Un mañana
            <br />
            Mejor,
            <br />
            Juntos
          </h2>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.25)" }} />
          <p className={cx("max-w-[50ch]", bodyCls)}>
            No ejecutamos tareas sueltas. Construimos crecimiento integral, con lo que construyes quedando protegido de verdad.
          </p>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.25)" }} />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>100+</p>
              <p className={pillarTextCls}>Empresas asesoradas en branding, marketing y legal.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>5</p>
              <p className={pillarTextCls}>Disciplinas núcleo bajo un mismo techo, un mismo equipo.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>Día uno</p>
              <p className={pillarTextCls}>Respaldo legal desde el primer paso, no como último trámite.</p>
            </div>
          </div>
        </FlowSection>

        {/* 05 — Trabajemos juntos */}
        <FlowSection id="contacto-hero" aria-label="Trabajemos juntos" style={{ backgroundColor: NAVY, color: IVORY }}>
          <p className={eyebrowCls}>05 — Trabajemos juntos</p>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.25)" }} />
          <h2 className={headingCls}>
            ¿Empezamos?
          </h2>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.25)" }} />
          <p className={cx("max-w-[50ch]", bodyCls)}>
            Cuéntanos en qué punto está tu marca y te decimos exactamente por dónde empezar.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-3">
            <InteractiveHoverButton
              text="Reservar consultoría"
              icon={<ArrowRight className="h-4 w-4 flex-shrink-0" />}
              onClick={() => onContact("hero_cta")}
              blobColor={SLATE}
              className="px-7 py-3.5 text-sm font-bold"
              style={{ backgroundColor: IVORY, color: NAVY }}
            />
            <a
              href="#rutas"
              className="rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-200"
              style={{ border: "1.5px solid rgba(247,244,237,0.4)", color: IVORY }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(247,244,237,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Ver servicios
            </a>
          </div>
        </FlowSection>
      </FlowArt>
    </>
  );
};
