"use client";

import { useState, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

interface AsherHeroProps {
  onContact: (origen?: string) => void;
}

// ── Paleta de marca ASHER ──────────────────────────────────────────────────────
const NAVY = "#0B1956";
const IVORY = "#F7F4ED";
const SAND = "#DBC8B6";
const SLATE = "#8084B7";
const OLIVE = "#4C5340";

const EASE = [0.16, 1, 0.3, 1] as const;

const navItems = [
  { label: "SOBRE",     href: "#diferenciador" },
  { label: "TRABAJO",   href: "#proceso" },
  { label: "SERVICIOS", href: "#rutas" },
];

// ── Isotipo — recorta solo la marca A/S del asset original (sin el texto) ─────
function AsherMarkIcon({ size }: { size?: number }) {
  const box = size ? { width: size, height: size } : { width: "100%", height: "100%" };
  return (
    <div style={{ position: "relative", ...box, flexShrink: 0, overflow: "hidden" }}>
      <img
        src="/asher-logo.png"
        alt=""
        aria-hidden
        style={{
          position: "absolute", top: "-6%", left: "50%", transform: "translateX(-50%)",
          height: "132%", width: "auto",
        }}
      />
    </div>
  );
}

// ── Header / navbar — vive dentro del hero, sin fondo, sombra ni borde ────────
function AsherHeader({ onContact }: { onContact: (o?: string) => void }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative z-10 w-full flex-none"
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          height: "clamp(88px, 9vw, 108px)",
          paddingLeft: "clamp(24px, 3.4vw, 68px)",
          paddingRight: "clamp(24px, 3.4vw, 68px)",
        }}
      >
        <a href="#inicio" className="flex items-center gap-3 select-none" aria-label="Inicio ASHER">
          <AsherMarkIcon size={38} />
          <span className="text-base font-bold tracking-tight" style={{ color: NAVY, fontFamily: "var(--font-sans)" }}>
            Asher
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10 lg:gap-14">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-base font-medium"
              style={{ color: NAVY, letterSpacing: "0" }}
            >
              {item.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
                style={{ background: NAVY }}
              />
            </a>
          ))}
          <button
            onClick={() => onContact("nav_cta")}
            className="group relative text-base font-medium"
            style={{ color: NAVY }}
          >
            CONTACTO
            <span
              className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
              style={{ background: NAVY }}
            />
          </button>
        </nav>

        <button
          onClick={() => setMenuAbierto((v) => !v)}
          className="flex md:hidden items-center justify-center w-9 h-9"
          style={{ color: NAVY }}
          aria-label="Menú"
        >
          {menuAbierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden flex flex-col gap-1"
            style={{
              background: IVORY,
              paddingLeft: "clamp(24px, 3.4vw, 68px)",
              paddingRight: "clamp(24px, 3.4vw, 68px)",
              paddingBottom: "1.25rem",
              borderTop: "1px solid rgba(11,25,86,0.08)",
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuAbierto(false)}
                className="py-3 text-sm font-medium"
                style={{ color: NAVY, borderBottom: "1px solid rgba(11,25,86,0.06)" }}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => { onContact("nav_cta_mobile"); setMenuAbierto(false); }}
              className="py-3 text-left text-sm font-medium"
              style={{ color: NAVY }}
            >
              CONTACTO
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Titular revelado línea por línea ──────────────────────────────────────────
function SplitLines({ lines, delayStart = 0.55 }: { lines: string[]; delayStart?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} style={{ display: "block", overflow: "hidden" }}>
          <motion.span
            style={{ display: "block" }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: delayStart + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

// ── Link editorial: texto + subrayado + flecha deslizante (sin píldoras) ──────
function EditorialLink({ text, onClick, href, align = "left" }: { text: string; onClick?: () => void; href?: string; align?: "left" | "right" }) {
  const Comp: ElementType = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className="group inline-flex items-center gap-2.5"
      style={{ color: NAVY, justifyContent: align === "right" ? "flex-end" : "flex-start" }}
    >
      <span className="relative pb-1 text-[17px] font-medium sm:text-lg">
        {text}
        <span
          className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
          style={{ background: NAVY }}
        />
      </span>
      <ArrowRight className="h-4 w-4 flex-shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
    </Comp>
  );
}

// ── Bloque de media — composición estática de marca (sin foto, sin video) ─────
function MediaBlock() {
  return (
    <div
      className="relative w-full"
      style={{ background: NAVY, aspectRatio: "16 / 9" }}
    >
      <div className="absolute inset-0 flex items-center justify-between p-6 sm:p-8">
        <div className="relative h-full aspect-square flex-shrink-0" style={{ background: IVORY, overflow: "hidden" }}>
          <AsherMarkIcon />
        </div>
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {[SAND, SLATE, OLIVE, IVORY].map((c) => (
            <div key={c} style={{ background: c, width: "1.6rem", height: "1.6rem" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Hero — inspirado en la composición editorial de habito.studio ────────────
export const AsherHero = ({ onContact }: AsherHeroProps) => {
  return (
    <section
      id="inicio"
      className="relative w-full"
      style={{ background: IVORY, minHeight: "100svh" }}
    >
      <div
        className="mx-auto flex w-full flex-col"
        style={{
          minHeight: "100svh",
          paddingLeft: "clamp(24px, 3.4vw, 68px)",
          paddingRight: "clamp(24px, 3.4vw, 68px)",
        }}
      >
        <AsherHeader onContact={onContact} />

          {/* ══ MOBILE / TABLET (< xl): orden Nav → Titular → Media → Caption → Statement → CTAs ══ */}
          <div className="flex flex-col gap-10 pb-14 pt-6 xl:hidden">
            <h1
              className="font-black uppercase text-[clamp(52px,15vw,78px)]"
              style={{ color: NAVY, lineHeight: 0.9, letterSpacing: "-0.045em", fontFamily: "var(--font-sans)" }}
            >
              <SplitLines lines={["Construimos", "Marcas Con", "Dirección"]} />
            </h1>

            <div className="flex flex-col gap-3.5">
              <motion.div
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              >
                <MediaBlock />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
                className="text-[19px] font-medium"
                style={{ color: NAVY }}
              >
                ASHER — TRABAJO DESTACADO
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
              className="text-[clamp(30px,7vw,44px)]"
              style={{ color: NAVY, lineHeight: 1.1, letterSpacing: "-0.03em", fontFamily: "var(--font-sans)" }}
            >
              Estrategia, identidad y crecimiento construidos para mover negocios hacia adelante.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.25, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <EditorialLink text="SOBRE ASHER" onClick={() => onContact("hero_about")} />
              <EditorialLink text="INICIAR UN PROYECTO" onClick={() => onContact("hero_cta")} />
            </motion.div>
          </div>

          {/* ══ DESKTOP (≥ xl): composición editorial asimétrica ══ */}
          <div className="hidden flex-1 flex-col xl:flex">

            <div className="grid flex-none grid-cols-12 gap-6 pt-4">
              <div className="col-start-4 col-span-3">
                <motion.div
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
                  style={{ width: "clamp(390px, 25vw, 500px)" }}
                >
                  <MediaBlock />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
                  className="mt-4"
                  style={{ color: NAVY, fontSize: "19px", fontWeight: 500 }}
                >
                  ASHER — TRABAJO DESTACADO
                </motion.p>
              </div>

              <div className="col-start-7 col-span-6">
                <h1
                  className="font-black uppercase"
                  style={{
                    color: NAVY,
                    fontSize: "clamp(68px, 6.4vw, 118px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.055em",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <SplitLines lines={["Construimos", "Marcas Con", "Dirección"]} />
                </h1>
              </div>
            </div>

            <div className="flex-1" style={{ minHeight: "3rem" }} />

            <div className="grid flex-none grid-cols-12 items-end gap-6 pb-16">
              <div className="col-start-1 col-span-5">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
                  style={{
                    color: NAVY,
                    fontSize: "clamp(38px, 3.2vw, 60px)",
                    fontWeight: 400,
                    lineHeight: 1.08,
                    letterSpacing: "-0.04em",
                    maxWidth: "700px",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Estrategia, identidad y crecimiento construidos para mover negocios hacia adelante.
                </motion.p>
              </div>

              <div className="col-start-7 col-span-3">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1.35, ease: EASE }}>
                  <EditorialLink text="SOBRE ASHER" onClick={() => onContact("hero_about")} />
                </motion.div>
              </div>

              <div className="col-start-10 col-span-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.42, ease: EASE }}
                  className="flex justify-end"
                >
                  <EditorialLink text="INICIAR UN PROYECTO" onClick={() => onContact("hero_cta")} align="right" />
                </motion.div>
              </div>
            </div>
          </div>

      </div>
    </section>
  );
};
