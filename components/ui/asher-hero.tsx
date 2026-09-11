"use client";

import { useState, useEffect, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import GlyphPortal from "./glyph-portal";
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
        src="/asher-logo.png"
        alt=""
        aria-hidden
        style={{ position: "absolute", top: "-6%", left: "50%", transform: "translateX(-50%)", height: "132%", width: "auto" }}
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

// ── Link editorial: texto + subrayado + flecha (para el contenido revelado) ──
function HeroLink({ text, onClick, href }: { text: string; onClick?: () => void; href?: string }) {
  const Comp: ElementType = href ? "a" : "button";
  return (
    <Comp href={href} onClick={onClick} className="group inline-flex items-center gap-3 text-sm font-semibold sm:text-base" style={{ color: IVORY }}>
      <span className="relative pb-1">
        {text}
        <span
          className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100"
          style={{ background: IVORY }}
        />
      </span>
      <span className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full" style={{ background: "rgba(247,244,237,0.15)" }}>
        <ArrowRight className="absolute h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" />
        <ArrowRight className="absolute h-3.5 w-3.5 -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </Comp>
  );
}

// ── Escena de fondo tras el cristal — atmósfera de marca, sin foto falsa ──────
function PortalBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(circle at 20% 15%, rgba(128,132,183,0.55), transparent 45%),
          radial-gradient(circle at 82% 75%, rgba(76,83,64,0.4), transparent 50%),
          linear-gradient(150deg, #0B1956 0%, #16225f 55%, #0B1956 100%)
        `,
      }}
    />
  );
}

// ── Hero — cámara de scroll a través de la palabra ASHER (Glyph Portal) ──────
export const AsherHero = ({ onContact }: AsherHeroProps) => {
  return (
    <>
      <AsherHeader onContact={onContact} />

      <div id="inicio" />
      <GlyphPortal
        word="ASHER"
        focusChar="S"
        scrollLength={2.2}
        enterLabel="Entrar"
        background={<PortalBackground />}
        style={{
          "--gp-paper": IVORY,
          "--gp-ink": NAVY,
          "--gp-field": NAVY,
          "--gp-foreground": IVORY,
        }}
        front={
          <>
            <p
              className="absolute left-1/2 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.25em] sm:text-xs"
              style={{ top: "calc(var(--gp-word-top, 30%) - 40px)", color: "rgba(11,25,86,0.55)" }}
            >
              Estrategia · Marca · Digital · Legal
            </p>
            <p
              className="absolute left-1/2 -translate-x-1/2 px-6 text-center text-sm sm:text-base"
              style={{ top: "calc(var(--gp-word-bottom, 60%) + 20px)", color: "rgba(11,25,86,0.6)" }}
            >
              Cinco disciplinas. Un mismo equipo.
            </p>
          </>
        }
      >
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(247,244,237,0.55)" }}>
            Estás dentro de ASHER
          </p>
          <h2 className="font-medium tracking-tight" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", color: IVORY, lineHeight: 1.1 }}>
            Construimos marca sin fricciones.
          </h2>
          <p className="max-w-lg text-sm leading-relaxed sm:text-base" style={{ color: "rgba(247,244,237,0.75)" }}>
            Elige una ruta, cuéntanos tu proyecto, y tu marca empieza a moverse esta semana —
            con respaldo legal desde el día uno.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
            <HeroLink text="Reservar consultoría" onClick={() => onContact("hero_cta")} />
            <HeroLink text="Ver servicios" href="#rutas" />
          </div>
        </div>
      </GlyphPortal>
    </>
  );
};
