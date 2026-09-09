"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { RutaId } from "@/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: color-mix(in oklch, var(--foreground) 5%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 12%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--primary) 45%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--primary) 25%, transparent);
}

@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);    opacity: 0.45; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.85; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes footer-pulse-dot {
  0%, 100% { opacity: 1;   transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.4); }
}

.animate-footer-breathe        { animation: footer-breathe        9s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 36s linear infinite; }
.animate-footer-pulse-dot      { animation: footer-pulse-dot      2s ease-in-out infinite; }

/* Grid más visible en mobile */
.footer-bg-grid {
  background-size: 44px 44px;
  background-image:
    linear-gradient(to right,  color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

/* Aurora más intensa en mobile */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 22%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 12%, transparent) 45%,
    transparent 70%
  );
}

/* Glass pills */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 8px 24px -8px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover,
.footer-glass-pill:active {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 16px 32px -8px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
}

/* Texto grande de fondo */
.footer-giant-bg-text {
  font-size: clamp(80px, 26vw, 340px);
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--primary) 18%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 20%, transparent) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Heading con glow slate */
.footer-text-glow {
  background: linear-gradient(160deg, #0B1956 0%, color-mix(in oklch, var(--primary) 80%, var(--foreground)) 55%, color-mix(in oklch, var(--foreground) 50%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 28px color-mix(in oklch, var(--primary) 30%, transparent));
}

/* CTA primario */
.footer-cta-primary {
  background: linear-gradient(135deg, #0B1956 0%, #2b3a7a 100%) !important;
  color: #F7F4ED !important;
  border: none !important;
  box-shadow: 0 8px 24px -4px rgba(11,25,86,0.35) !important;
}
.footer-cta-primary:hover,
.footer-cta-primary:active {
  box-shadow: 0 12px 32px -4px rgba(11,25,86,0.5) !important;
  transform: translateY(-1px);
}

/* Divisor */
.footer-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(128,132,183,0.35), transparent);
}
`;

// ── Magnetic Button (solo desktop — mobile usa click normal) ────────────────
type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      // Desactivar magnetic en touch
      if (window.matchMedia("(hover: none)").matches) return;

      const el = localRef.current;
      if (!el) return;

      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(el, { x: x * 0.3, y: y * 0.3, scale: 1.03, ease: "power2.out", duration: 0.4 });
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, scale: 1, ease: "elastic.out(1,0.3)", duration: 1.1 });
        };
        el.addEventListener("mousemove", onMove as EventListener);
        el.addEventListener("mouseleave", onLeave);
        return () => {
          el.removeEventListener("mousemove", onMove as EventListener);
          el.removeEventListener("mouseleave", onLeave);
        };
      }, el);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer select-none", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// ── Marquee ──────────────────────────────────────────────────────────────────
const MarqueeItem = () => (
  <div className="flex items-center gap-8 px-4 whitespace-nowrap">
    {["Branding Integral", "Publicidad Digital", "Identidad de Marca", "Digitalización", "Blindaje Legal", "Crecimiento"].map((txt, i) => (
      <React.Fragment key={txt}>
        <span>{txt}</span>
        <span className="text-[8px]" style={{ color: "rgba(128,132,183,0.7)" }}>✦</span>
      </React.Fragment>
    ))}
  </div>
);

// ── Props ─────────────────────────────────────────────────────────────────────
interface CinematicFooterProps {
  onContact?: (rutaId: RutaId, origen?: string) => void;
}

// ── Componente principal ──────────────────────────────────────────────────────
export function CinematicFooter({ onContact }: CinematicFooterProps) {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", opacity: 0 },
        { y: "0vh", opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 90%", end: "bottom bottom", scrub: 1.5 } }
      );
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 50%", end: "center bottom", scrub: 1 } }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const ctaLinks = [
    { label: "Política de Privacidad", origen: "footer_privacidad" },
    { label: "Términos de Uso",        origen: "footer_terminos"   },
    { label: "Contacto",               origen: "footer_contacto"   },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Curtain reveal */}
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ height: "100svh", clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer
          className="fixed bottom-0 left-0 flex w-full flex-col overflow-hidden cinematic-footer-wrapper"
          style={{ height: "100svh", background: "var(--background)", color: "var(--foreground)" }}
        >
          {/* Aurora — más visible en mobile */}
          <div className="footer-aurora absolute left-1/2 top-[35%] h-[55vmax] w-[90vmax] max-h-[500px] max-w-[700px] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[70px] pointer-events-none z-0" />

          {/* Grid */}
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant text — posición ajustada para no tapar botones */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            ASHER
          </div>

          {/* ── Marquee ── */}
          <div
            className="relative z-10 w-full overflow-hidden py-3 flex-shrink-0"
            style={{
              marginTop: "env(safe-area-inset-top, 0px)",
              borderBottom: "1px solid rgba(11,25,86,0.1)",
              background: "rgba(247,244,237,0.75)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="flex w-max animate-footer-scroll-marquee text-[9px] sm:text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{ color: "rgba(11,25,86,0.4)" }}
            >
              <MarqueeItem /><MarqueeItem />
            </div>
          </div>

          {/* ── Contenido central ── */}
          <div
            ref={contentRef}
            className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 sm:px-8 overflow-hidden"
          >
            {/* Heading */}
            <h2 className="footer-text-glow text-center font-black tracking-tighter mb-7 sm:mb-10"
              style={{ fontSize: "clamp(2.8rem, 11vw, 6rem)", lineHeight: 1 }}
            >
              ¿Empezamos?
            </h2>

            {/* CTA Principal — full width en mobile */}
            <MagneticButton
              as="button"
              onClick={() => onContact?.("contacto_general", "footer_whatsapp")}
              className="footer-glass-pill footer-cta-primary w-full max-w-sm rounded-2xl py-4 px-6 mb-3 flex items-center justify-center gap-3 font-bold text-sm sm:text-base"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hablar por WhatsApp
            </MagneticButton>

            {/* CTAs secundarios — 2 columnas en mobile */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-5">
              <MagneticButton
                as="button"
                onClick={() => onContact?.("contacto_general", "footer_asesoria")}
                className="footer-glass-pill rounded-2xl py-3.5 px-4 flex flex-col items-center justify-center gap-1.5 font-semibold text-xs sm:text-sm"
                style={{ color: "var(--foreground)" }}
              >
                <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                <span>Agendar<br/>asesoría</span>
              </MagneticButton>

              <MagneticButton
                as="button"
                onClick={() => onContact?.("contacto_general", "footer_propuesta")}
                className="footer-glass-pill rounded-2xl py-3.5 px-4 flex flex-col items-center justify-center gap-1.5 font-semibold text-xs sm:text-sm"
                style={{ color: "var(--foreground)" }}
              >
                <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <span>Solicitar<br/>propuesta</span>
              </MagneticButton>
            </div>

            {/* Links terciarios — fila horizontal compacta */}
            <div className="flex items-center gap-1 flex-wrap justify-center">
              {ctaLinks.map((lnk, i) => (
                <React.Fragment key={lnk.label}>
                  <button
                    onClick={() => onContact?.("contacto_general", lnk.origen)}
                    className="text-[10px] sm:text-xs font-medium transition-colors px-2 py-1"
                    style={{ color: "rgba(11,25,86,0.42)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(11,25,86,0.85)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(11,25,86,0.42)")}
                  >
                    {lnk.label}
                  </button>
                  {i < ctaLinks.length - 1 && (
                    <span className="text-[8px]" style={{ color: "rgba(128,132,183,0.4)" }}>·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="relative z-20 flex-shrink-0 px-5 sm:px-8 pb-6 sm:pb-8"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
          >
            <div className="footer-divider mb-4" />

            <div className="flex items-center justify-between gap-3">
              {/* Copyright */}
              <p
                className="text-[9px] sm:text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: "rgba(11,25,86,0.38)" }}
              >
                © {new Date().getFullYear()} ASHER
              </p>

              {/* Badge centrado */}
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(11,25,86,0.4)" }}>by</span>
                <span
                  className="animate-footer-pulse-dot h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#8084B7" }}
                />
                <span className="text-[11px] sm:text-sm font-black" style={{ color: "#0B1956" }}>ASHER</span>
              </div>

              {/* Scroll to top */}
              <MagneticButton
                as="button"
                onClick={scrollToTop}
                className="footer-glass-pill h-9 w-9 rounded-full flex items-center justify-center group flex-shrink-0"
                style={{ color: "rgba(11,25,86,0.55)" }}
              >
                <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                </svg>
              </MagneticButton>
            </div>
          </div>

        </footer>
      </div>
    </>
  );
}
