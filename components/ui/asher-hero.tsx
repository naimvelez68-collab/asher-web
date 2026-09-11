"use client";

import { useState, useEffect, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Play } from "lucide-react";
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
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0, overflow: "hidden" }}>
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

        <a href="#inicio" className="flex items-center gap-2.5 select-none" aria-label="Inicio ASHER">
          <AsherMarkIcon size={32} />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-[0.14em] uppercase" style={{ color: NAVY }}>Asher</span>
            <span className="text-[8px] font-medium tracking-[0.28em] uppercase" style={{ color: "rgba(11,25,86,0.5)" }}>Consulting</span>
          </span>
        </a>

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
            style={{ background: "rgba(11,25,86,0.06)", border: "1px solid rgba(11,25,86,0.15)", color: NAVY }}
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

// ── Texto revelado línea por línea (estilo split-lines de Habito) ─────────────
function SplitLines({ lines, delayStart = 0.15 }: { lines: string[]; delayStart?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} style={{ display: "block", overflow: "hidden" }}>
          <motion.span
            style={{ display: "block" }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, delay: delayStart + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

// ── CTA minimalista con subrayado + doble flecha deslizante (estilo Habito) ───
function HeroLink({
  text,
  onClick,
  href,
}: {
  text: string;
  onClick?: () => void;
  href?: string;
}) {
  const Comp: ElementType = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className="group inline-flex items-center gap-3 text-sm font-semibold sm:text-base"
      style={{ color: NAVY }}
    >
      <span className="relative pb-1">
        {text}
        <span
          className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100"
          style={{ background: NAVY }}
        />
      </span>
      <span className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full" style={{ background: "rgba(11,25,86,0.08)" }}>
        <ArrowRight
          className="absolute h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5"
        />
        <ArrowRight
          className="absolute h-3.5 w-3.5 -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </Comp>
  );
}

// ── Insignia giratoria — "showreel" de marca ──────────────────────────────────
function SpinningBadge({ size = 128 }: { size?: number }) {
  const r = size / 2 - 13;
  const cx = size / 2;
  const cy = size / 2;
  const d = `M ${cx - r},${cy} a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="animate-spin-badge" style={{ width: "100%", height: "100%" }}>
        <defs>
          <path id="asher-badge-path" d={d} />
        </defs>
        <text fontSize="9.5" fontWeight={700} letterSpacing="2.5" fill={NAVY}>
          <textPath href="#asher-badge-path" startOffset="0%">
            ASHER CONSULTING • ASHER CONSULTING •&nbsp;
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: size * 0.34, height: size * 0.34, background: NAVY }}
        >
          <Play className="h-3.5 w-3.5" style={{ color: IVORY, marginLeft: 2 }} fill={IVORY} />
        </div>
      </div>
    </div>
  );
}

const MARQUEE_ITEMS = Array.from({ length: 6 });

// ── Hero — inspirado en habito.studio ─────────────────────────────────────────
export const AsherHero = ({ onContact }: AsherHeroProps) => {
  return (
    <>
      <AsherHeader onContact={onContact} />

      <section id="inicio" className="relative w-full overflow-hidden" style={{ background: IVORY }}>

        {/* Resplandor atmosférico */}
        <div
          className="pointer-events-none absolute -top-24 right-[-12%] h-[70%] w-[65%] rounded-full blur-[140px] opacity-[0.16]"
          style={{ background: `radial-gradient(circle, ${SLATE} 0%, transparent 70%)` }}
        />

        <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-center gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 md:px-12 lg:pt-28">

          {/* Insignia giratoria flotante */}
          <div className="pointer-events-none absolute right-5 top-28 hidden sm:block md:right-10 lg:right-14 lg:top-24">
            <SpinningBadge size={132} />
          </div>

          <div className="flex flex-col gap-7">
            <h1
              className="font-black uppercase leading-[0.88] tracking-tight text-[clamp(2.6rem,9vw,7rem)]"
              style={{ color: NAVY }}
            >
              <SplitLines lines={["Construimos", "Marca Sin", "Fricciones"]} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md text-sm leading-relaxed sm:text-base"
              style={{ color: "rgba(11,25,86,0.68)" }}
            >
              Elige una ruta, cuéntanos tu proyecto, y tu marca empieza a moverse esta semana —
              con respaldo legal desde el día uno.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <HeroLink text="Reservar consultoría" onClick={() => onContact("hero_cta")} />
              <HeroLink text="Ver servicios" href="#rutas" />
            </motion.div>
          </div>
        </div>

        {/* Marquee inferior */}
        <div className="relative overflow-hidden border-t py-3.5" style={{ borderColor: "rgba(11,25,86,0.1)" }}>
          <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
            {[0, 1].map((rep) => (
              <div key={rep} className="flex items-center gap-10">
                {MARQUEE_ITEMS.map((_, i) => (
                  <span key={i} className="flex items-center gap-10">
                    <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.4)" }}>
                      Asher Consulting
                    </span>
                    <span className="text-xs" style={{ color: SLATE }}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
};
