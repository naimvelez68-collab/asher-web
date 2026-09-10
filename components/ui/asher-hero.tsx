"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import FlowArt, { FlowSection } from "./story-scroll";
import { InteractiveHoverButton } from "./interactive-hover-button";

interface AsherHeroProps {
  onContact: (origen?: string) => void;
}

// ── Paleta de marca ASHER ──────────────────────────────────────────────────────
const NAVY = "#0B1956";
const IVORY = "#F7F4ED";
const SLATE = "#8084B7";
const OLIVE = "#4C5340";

const navItems = [
  { label: "Servicios",      href: "#rutas" },
  { label: "¿Por qué ASHER?", href: "#diferenciador" },
  { label: "Diagnóstico",    href: "#diagnostico" },
];

// ── Isotipo pequeño para el logotype (recorta solo la marca A/S de la imagen) ──
function AsherMarkIcon({ size = 34 }: { size?: number }) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <img
        src="/asher-logo-mark.png"
        alt=""
        aria-hidden
        style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", height: "128%", width: "auto" }}
      />
    </div>
  );
}

// ── Header sticky ─────────────────────────────────────────────────────────────
function AsherHeader({ onContact }: { onContact: (o?: string) => void }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 top-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(247,244,237,0.88)" : "rgba(247,244,237,0.0)",
        backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
        borderBottom: scrolled ? `1px solid rgba(11,25,86,0.08)` : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">

        {/* ── Izquierda: Logotipo ── */}
        <a href="#inicio" className="flex items-center gap-2.5 select-none" aria-label="Inicio ASHER">
          <AsherMarkIcon size={32} />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-[0.14em] uppercase" style={{ color: NAVY }}>
              Asher
            </span>
            <span className="text-[8px] font-medium tracking-[0.28em] uppercase" style={{ color: "rgba(11,25,86,0.5)" }}>
              Consulting
            </span>
          </span>
        </a>

        {/* ── Centro: Nav links (desktop) ── */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-medium tracking-wide transition-colors duration-200"
              style={{ color: "rgba(11,25,86,0.55)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = NAVY)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(11,25,86,0.55)")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ── Derecha: CTA + hamburguesa ── */}
        <div className="flex items-center gap-3">
          <InteractiveHoverButton
            text="Reservar consultoría"
            onClick={() => onContact("header_cta")}
            blobColor={OLIVE}
            className="hidden sm:flex px-5 py-2.5 text-xs font-bold"
            style={{ backgroundColor: NAVY, color: IVORY }}
          />

          <button
            onClick={() => setMenuAbierto((v) => !v)}
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{
              background: "rgba(11,25,86,0.06)",
              border: "1px solid rgba(11,25,86,0.15)",
              color: NAVY,
            }}
            aria-label="Menú"
          >
            {menuAbierto ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-5 pb-5 pt-2 flex flex-col gap-1"
            style={{ background: "rgba(247,244,237,0.97)", borderTop: "1px solid rgba(11,25,86,0.08)" }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuAbierto(false)}
                className="py-3 text-sm font-medium transition-colors"
                style={{ color: "rgba(11,25,86,0.7)", borderBottom: "1px solid rgba(11,25,86,0.06)" }}
              >
                {item.label}
              </a>
            ))}
            <InteractiveHoverButton
              text="Reservar consultoría"
              onClick={() => { onContact("header_cta_mobile"); setMenuAbierto(false); }}
              blobColor={OLIVE}
              className="mt-3 w-full py-3 text-sm font-bold"
              style={{ backgroundColor: NAVY, color: IVORY }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const headingCls = "text-[clamp(2.75rem,9vw,8.5rem)] font-black uppercase leading-[0.88] tracking-tight";
const eyebrowCls = "text-xs font-bold uppercase tracking-[0.2em]";
const bodyCls = "text-[clamp(1rem,2vw,1.4rem)] font-normal leading-relaxed";
const pillarLabelCls = "mb-2 text-sm font-bold uppercase tracking-wider";
const pillarTextCls = "text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed opacity-80";

// ── Hero: secuencia "story-scroll" de marca ────────────────────────────────────
export const AsherHero = ({ onContact }: AsherHeroProps) => {
  return (
    <>
      <AsherHeader onContact={onContact} />

      <FlowArt aria-label="Presentación ASHER Consulting">

        {/* 01 — Quiénes somos */}
        <FlowSection id="inicio" aria-label="Quiénes somos" style={{ backgroundColor: NAVY, color: IVORY }}>
          <p className={eyebrowCls}>01 — Quiénes somos</p>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.25)" }} />
          <h1 className={headingCls}>
            Claridad
            <br />
            Para
            <br />
            Crecer
          </h1>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.25)" }} />
          <p className={cx("mt-auto max-w-[50ch]", bodyCls)}>
            Consultora integral de marca, marketing, tecnología y blindaje legal.
            Construimos, mejoramos, digitalizamos y protegemos tu marca — con respaldo legal desde el día uno.
          </p>
        </FlowSection>

        {/* 02 — Lo que hacemos */}
        <FlowSection id="rutas-preview" aria-label="Lo que hacemos" style={{ backgroundColor: "#F1E7DA", color: NAVY }}>
          <p className={eyebrowCls}>02 — Lo que hacemos</p>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(11,25,86,0.15)" }} />
          <h2 className={headingCls}>
            Cinco
            <br />
            Rutas
            <br />
            Claras
          </h2>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(11,25,86,0.15)" }} />
          <p className={cx("max-w-[50ch]", bodyCls)}>
            Cinco caminos claros hacia el crecimiento, según el momento en el que está tu marca hoy.
          </p>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(11,25,86,0.15)" }} />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>Crear marca</p>
              <p className={pillarTextCls}>Para emprendedores y negocios que arrancan con todo.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>Mejorar marca</p>
              <p className={pillarTextCls}>Para marcas que ya existen pero merecen verse mejor.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>Publicidad</p>
              <p className={pillarTextCls}>Para negocios que necesitan más clientes y más ventas.</p>
            </div>
          </div>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(11,25,86,0.15)" }} />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>Digitalización</p>
              <p className={pillarTextCls}>Para quienes necesitan presencia digital o herramientas tech.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>Blindaje legal</p>
              <p className={pillarTextCls}>Respaldo legal como base de todo lo que construyes.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>Diagnóstico</p>
              <p className={pillarTextCls}>3 preguntas para saber exactamente qué necesitas primero.</p>
            </div>
          </div>
        </FlowSection>

        {/* 03 — Cómo trabajamos */}
        <FlowSection id="proceso" aria-label="Cómo trabajamos" style={{ backgroundColor: SLATE, color: IVORY }}>
          <p className={eyebrowCls}>03 — Cómo trabajamos</p>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.3)" }} />
          <h2 className={headingCls}>
            Diagnóstico.
            <br />
            Estrategia.
            <br />
            Ejecución.
          </h2>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.3)" }} />
          <p className={cx("max-w-[50ch]", bodyCls)}>
            Un mismo equipo acompaña tu marca de principio a fin. Sin fragmentar tu proyecto entre múltiples agencias.
          </p>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.3)" }} />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>01 — Diagnóstico</p>
              <p className={pillarTextCls}>Entendemos tu marca, tu mercado y tu punto de partida real.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>02 — Estrategia</p>
              <p className={pillarTextCls}>Diseñamos un plan de marca, comunicación y crecimiento a la medida.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>03 — Ejecución</p>
              <p className={pillarTextCls}>Implementamos con rigor: diseño, contenido, campañas y desarrollo.</p>
            </div>
          </div>
          <hr className="my-[2vw] border-t" style={{ borderColor: "rgba(247,244,237,0.3)" }} />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>04 — Blindaje</p>
              <p className={pillarTextCls}>Registro de marca, contratos y cumplimiento legal desde el inicio.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>05 — Medición</p>
              <p className={pillarTextCls}>Seguimos resultados reales y ajustamos lo que haga falta.</p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className={pillarLabelCls}>06 — Crecimiento</p>
              <p className={pillarTextCls}>Tu marca evoluciona; nosotros seguimos a tu lado en cada etapa.</p>
            </div>
          </div>
        </FlowSection>

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

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}
