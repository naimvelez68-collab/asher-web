"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { WordsPullUp } from "./words-pull-up";
import { InteractiveHoverButton } from "./interactive-hover-button";

interface AsherHeroProps {
  onContact: (origen?: string) => void;
}

// ── Paleta de marca ASHER ──────────────────────────────────────────────────────
const NAVY = "#0B1956";
const IVORY = "#F7F4ED";
const SAND = "#DBC8B6";
const SLATE = "#8084B7";
const OLIVE = "#4C5340";

const navItems = [
  { label: "Servicios",      href: "#rutas" },
  { label: "¿Por qué ASHER?", href: "#diferenciador" },
  { label: "Diagnóstico",    href: "#diagnostico" },
];

const disciplinas = ["Estrategia", "Legal", "Branding", "Marketing", "Digital", "Crecimiento"];

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

// ── Hero ──────────────────────────────────────────────────────────────────────
export const AsherHero = ({ onContact }: AsherHeroProps) => {
  return (
    <>
      <AsherHeader onContact={onContact} />

      <section id="inicio" className="relative w-full">
        <div className="relative w-full overflow-hidden rounded-b-2xl md:rounded-b-[2rem]">

          {/* Fondo — degradado de marca: marfil → arena */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(165deg, ${IVORY} 0%, #F1E7DA 45%, ${SAND} 100%)` }}
          />

          {/* Grain sutil */}
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-multiply" />

          {/* Resplandor slate blue — esquina superior derecha */}
          <div
            className="pointer-events-none absolute -top-10 right-0 h-[55%] w-[55%] rounded-full blur-[120px] opacity-[0.14]"
            style={{ background: `radial-gradient(circle, ${SLATE} 0%, transparent 70%)` }}
          />

          <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-28 sm:px-8 sm:pt-32 md:px-12 lg:pb-20 lg:pt-40">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">

              {/* ── Columna izquierda: copy ── */}
              <div className="flex flex-col gap-6 lg:col-span-6 xl:col-span-5">

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3"
                >
                  <span className="h-px w-8 flex-shrink-0" style={{ background: SLATE }} />
                  <span className="text-[10px] font-semibold tracking-[0.24em] uppercase" style={{ color: OLIVE }}>
                    Estrategia para un impacto duradero
                  </span>
                </motion.div>

                <h1
                  className="font-serif font-bold leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl"
                  style={{ color: NAVY }}
                >
                  <WordsPullUp text="Claridad para lo que sigue" />
                </h1>

                <motion.p
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-md text-sm leading-relaxed sm:text-base"
                  style={{ color: "rgba(11,25,86,0.68)" }}
                >
                  Consultora integral de legal, branding, marketing y digital.
                  Construimos, mejoramos y blindamos tu marca con respaldo legal desde el día uno.
                </motion.p>

                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <InteractiveHoverButton
                    text="Reservar consultoría"
                    icon={<ArrowRight className="h-4 w-4 flex-shrink-0" />}
                    onClick={() => onContact("hero_cta")}
                    blobColor={OLIVE}
                    className="px-6 py-3 text-sm font-bold"
                    style={{ backgroundColor: NAVY, color: IVORY }}
                  />
                  <a
                    href="#rutas"
                    className="rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200"
                    style={{ border: `1.5px solid rgba(11,25,86,0.25)`, color: NAVY }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(11,25,86,0.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    Ver servicios
                  </a>
                </motion.div>

                {/* ── Barra de estadísticas ── */}
                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl px-6 py-5"
                  style={{ background: "#FBF9F5", border: "1px solid rgba(11,25,86,0.1)" }}
                >
                  <div>
                    <p className="text-2xl font-black leading-none" style={{ color: NAVY }}>100+</p>
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(11,25,86,0.5)" }}>
                      Empresas asesoradas
                    </p>
                  </div>
                  <div className="h-8 w-px" style={{ background: "rgba(11,25,86,0.12)" }} />
                  <div>
                    <p className="text-2xl font-black leading-none" style={{ color: NAVY }}>5</p>
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(11,25,86,0.5)" }}>
                      Disciplinas núcleo
                    </p>
                  </div>
                  <div className="hidden h-8 w-px sm:block" style={{ background: "rgba(11,25,86,0.12)" }} />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase leading-tight tracking-widest" style={{ color: OLIVE }}>
                      Un mañana mejor,<br />juntos
                    </span>
                    <span className="h-px w-6" style={{ background: SLATE }} />
                  </div>
                </motion.div>

              </div>

              {/* ── Columna derecha: panel del isotipo 3D ── */}
              <div className="lg:col-span-6 xl:col-span-7">
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[6/5] w-full overflow-hidden rounded-[1.75rem] sm:aspect-[4/3] lg:aspect-[5/6] xl:aspect-[6/5]"
                  style={{
                    background: `radial-gradient(120% 90% at 18% 12%, #FFFDF9 0%, ${IVORY} 45%, #EFE1CE 100%)`,
                    border: "1px solid rgba(11,25,86,0.08)",
                  }}
                >
                  {/* Reflejos de vidrio — sutiles franjas diagonales */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.5]"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 42%, transparent 54%), linear-gradient(115deg, transparent 62%, rgba(255,255,255,0.35) 70%, transparent 80%)",
                    }}
                  />

                  {/* Isotipo de marca */}
                  <div className="absolute inset-0 flex items-center justify-center p-10 sm:p-14">
                    <img
                      src="/asher-logo-mark.png"
                      alt="ASHER Consulting"
                      className="max-h-full max-w-full object-contain"
                      style={{ filter: "drop-shadow(0 24px 40px rgba(11,25,86,0.18))" }}
                    />
                  </div>

                  {/* Scrim navy — borde derecho, para legibilidad del texto superpuesto */}
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-[42%]"
                    style={{ background: `linear-gradient(90deg, transparent 0%, rgba(11,25,86,0.55) 100%)` }}
                  />

                  {/* Texto superpuesto — lista de pilares */}
                  <div className="pointer-events-none absolute right-5 top-6 flex flex-col gap-1 sm:right-7 sm:top-8">
                    {["Personas", "Estrategia", "Marcas", "Crecimiento"].map((w) => (
                      <span key={w} className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs" style={{ color: IVORY }}>
                        {w}
                      </span>
                    ))}
                  </div>

                  <div className="pointer-events-none absolute bottom-6 right-5 flex flex-col items-end gap-2 sm:right-7">
                    <span className="h-px w-8" style={{ background: "rgba(247,244,237,0.5)" }} />
                    <span className="max-w-[9rem] text-right text-[11px] font-semibold uppercase leading-snug tracking-widest sm:text-xs" style={{ color: IVORY }}>
                      Un mañana mejor, juntos
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* ── Franja "confían en nosotros" ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-14 flex flex-col items-center gap-6 pt-10 sm:mt-16 lg:mt-20 lg:flex-row lg:items-center lg:justify-between"
              style={{ borderTop: "1px solid rgba(11,25,86,0.1)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: "rgba(11,25,86,0.45)" }}>
                Confían en nosotros
              </p>

              <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                {disciplinas.map((d) => (
                  <span
                    key={d}
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(11,25,86,0.38)" }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="h-px w-6" style={{ background: SLATE }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: OLIVE }}>
                  Ideas con impacto
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};
