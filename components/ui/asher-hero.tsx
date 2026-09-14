"use client";

import { useState, useRef, useCallback, type ElementType, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GlyphPortal from "./glyph-portal";

interface AsherHeroProps {
  onContact: (origen?: string) => void;
}

// ── Paleta de marca ASHER ──────────────────────────────────────────────────────
const NAVY = "#0B1956";
const IVORY = "#F7F4ED";

// ── Arquitectura de navegación — adaptada de yourcreative.com.au ─────────────
const navItems = [
  { label: "Proyectos", href: "#disciplinas" },
  { label: "Servicios", href: "#rutas" },
  { label: "Estudio",   href: "#diferenciador" },
  { label: "Áreas",     href: "#proceso" },
  { label: "Insights",  href: "#diagnostico" },
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

// ── Link de navegación editorial (para el pill oscuro) ────────────────────────
function PillNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center px-3 py-2 sm:px-4"
    >
      <span
        className="relative text-[13px] font-normal tracking-[0.01em] transition-colors sm:text-[15px]"
        style={{ color: "rgba(247,244,237,0.72)", transitionDuration: "350ms", transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = IVORY)}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247,244,237,0.72)")}
      >
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform group-hover:scale-x-100"
          style={{ background: "currentColor", transitionDuration: "350ms", transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
        />
      </span>
    </a>
  );
}

// ── "Hablemos ↗" — enlace editorial, no botón/CTA SaaS ───────────────────────
function HablemosLink({ onClick, dark }: { onClick: () => void; dark: boolean }) {
  const color = dark ? IVORY : NAVY;
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 text-[13px] font-normal uppercase tracking-[0.06em] transition-colors sm:text-sm"
      style={{ color, transitionDuration: "350ms", transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
    >
      <span className="relative">
        Hablemos
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform group-hover:scale-x-100"
          style={{ background: "currentColor", transitionDuration: "350ms", transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
        />
      </span>
      <span
        aria-hidden
        className="inline-block transition-transform motion-reduce:transform-none"
        style={{ transitionDuration: "350ms", transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
      >
        <span className="inline-block transition-transform duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
      </span>
    </button>
  );
}

// ── Header — arquitectura adaptada de yourcreative.com.au ─────────────────────
// Composición en dos niveles, no una navbar SaaS convencional:
//  1) fila superior fija (logo · Hablemos · Menu), siempre transparente;
//  2) pill de navegación oscuro, fijo, separado y centrado debajo de esa fila.
// El texto de la fila superior cambia de Navy a Ivory cuando el fondo del Hero
// (el Glyph Portal) se vuelve oscuro, para mantener contraste sin agregar
// ninguna cápsula/fondo al header (ver `dark` prop, alimentado por el progreso
// de scroll del portal).
function AsherHeader({ onContact, dark }: { onContact: (o?: string) => void; dark: boolean }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const topColor = dark ? IVORY : NAVY;

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50"
        style={{ paddingBlock: 20, paddingInline: "clamp(20px, 2.6vw, 35px)" }}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 select-none"
            aria-label="Inicio ASHER"
          >
            <AsherMarkIcon size={30} />
            <span
              className="text-sm font-medium tracking-[0.08em] uppercase transition-colors"
              style={{ color: topColor, transitionDuration: "400ms" }}
            >
              Asher
            </span>
          </a>

          <div />

          <div className="flex items-center gap-5 sm:gap-7">
            <HablemosLink onClick={() => onContact("header_hablemos")} dark={dark} />

            <button
              type="button"
              onClick={() => setMenuAbierto((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
              aria-controls="asher-mobile-menu"
              className="text-[13px] font-normal uppercase tracking-[0.06em] transition-colors sm:text-sm"
              style={{ color: topColor, transitionDuration: "400ms" }}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Pill de navegación — fijo, separado del header, centrado */}
      <nav
        aria-label="Navegación principal"
        className="fixed left-1/2 top-[86px] z-40 hidden -translate-x-1/2 md:block"
      >
        <div
          className="flex items-center rounded-full"
          style={{ background: "rgba(11,25,86,0.85)" }}
        >
          {navItems.map((item) => (
            <PillNavLink key={item.label} href={item.href}>{item.label}</PillNavLink>
          ))}
        </div>
      </nav>

      {/* Menú móvil funcional — el fullscreen queda para una fase futura */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            id="asher-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[72px] z-40 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
            style={{ background: "rgba(11,25,86,0.92)", backdropFilter: "blur(10px)" }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuAbierto(false)}
                className="rounded-xl px-4 py-3 text-sm font-normal transition-colors"
                style={{ color: "rgba(247,244,237,0.85)" }}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => { onContact("header_hablemos_mobile"); setMenuAbierto(false); }}
              className="mt-1 rounded-xl px-4 py-3 text-left text-sm font-normal uppercase tracking-[0.06em]"
              style={{ color: IVORY }}
            >
              Hablemos ↗
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
  // El header no lleva fondo/cápsula propia (ver Fase 11-12), así que su texto
  // debe pasar de Navy a Ivory cuando el Glyph Portal revela su campo oscuro.
  // Se lee el progreso ya expuesto por GlyphPortal (onProgress) sin tocar su
  // contenido/comportamiento, y solo se re-renderiza al cruzar el umbral.
  const isDarkRef = useRef(false);
  const [isDark, setIsDark] = useState(false);
  const handlePortalProgress = useCallback((p: number) => {
    const dark = p > 0.55;
    if (dark !== isDarkRef.current) {
      isDarkRef.current = dark;
      setIsDark(dark);
    }
  }, []);

  return (
    <>
      <AsherHeader onContact={onContact} dark={isDark} />

      <div id="inicio" />
      <GlyphPortal
        word="ASHER"
        focusChar="S"
        scrollLength={2.2}
        enterLabel="Entrar"
        onProgress={handlePortalProgress}
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
