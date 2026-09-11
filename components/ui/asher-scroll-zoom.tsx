"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAVY = "#0B1956";
const IVORY = "#F7F4ED";
const SLATE = "#8084B7";
const OLIVE = "#4C5340";

// No tenemos el trazo vectorial original del isotipo ASHER (solo PNGs) —
// en vez de fabricar un path, la máscara usa la letra "S" del ambigrama
// de marca (mismo recurso: <text> dentro de un SVG como máscara CSS).
const ASHER_S_MASK_SVG_URI =
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23000000">` +
  `<text x="50" y="82" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="130" text-anchor="middle">S</text>` +
  `</svg>`;

export function AsherScrollZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const getInitialSize = () => {
        if (typeof window === "undefined") return 360;
        if (window.innerWidth < 640) return 260;
        if (window.innerWidth < 1024) return 340;
        return 420;
      };

      const initialSize = getInitialSize();
      if (maskLayerRef.current) {
        maskLayerRef.current.style.setProperty("--maskW", `${initialSize}px`);
        maskLayerRef.current.style.webkitMaskSize = `${initialSize}px`;
        maskLayerRef.current.style.maskSize = `${initialSize}px`;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1.2,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const startSize = getInitialSize();
            const currentSize = startSize + Math.pow(progress, 2.3) * 4200;
            if (maskLayerRef.current) {
              maskLayerRef.current.style.setProperty("--maskW", `${currentSize}px`);
              maskLayerRef.current.style.webkitMaskSize = `${currentSize}px`;
              maskLayerRef.current.style.maskSize = `${currentSize}px`;
            }
          },
        },
      });

      tl.to(sceneRef.current, { scale: 1.2, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full" style={{ background: IVORY, color: NAVY }}>
      {/* 1 — Intro */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-2 text-center sm:px-4">
          <h1
            className="mb-6 font-black uppercase leading-[0.88] tracking-[-0.04em]"
            style={{ fontSize: "clamp(10vw,8vw,7.8rem)", color: NAVY }}
          >
            Una marca
            <br />
            con dirección.
          </h1>
          <p className="max-w-3xl text-xs font-bold uppercase leading-relaxed tracking-wider sm:text-sm md:text-base" style={{ color: "rgba(11,25,86,0.7)" }}>
            Descubre cómo <span style={{ color: SLATE, fontWeight: 900 }}>ASHER</span> construye identidad,
            estrategia y blindaje legal en una sola marca. Nuestro proceso convierte{" "}
            <span style={{ color: SLATE, fontWeight: 900 }}>ideas sueltas</span> en un sistema de crecimiento
            claro, con <span style={{ color: SLATE, fontWeight: 900 }}>un solo equipo</span> detrás.
          </p>
        </div>
      </section>

      {/* 2 — Zoom a través de la "S" */}
      <div ref={containerRef} className="relative w-full" style={{ minHeight: "320vh", background: IVORY }}>
        <div
          ref={pinRef}
          className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
          style={{ background: IVORY }}
        >
          {/* Esquinas decorativas */}
          {[
            { top: 10, left: 10, path: "M10 0V1H1V10H0V0H10Z" },
            { top: 10, right: 10, path: "M10 0V10H9V1H0V0H10Z" },
            { bottom: 10, left: 10, path: "M0 0L1 0L1 9L10 9L10 10L0 10L0 0Z" },
            { bottom: 10, right: 10, path: "M10 10L0 10L0 9L9 9L9 0L10 0L10 10Z" },
          ].map((corner, i) => (
            <div
              key={i}
              className="pointer-events-none absolute z-30 h-4 w-4 sm:h-5 sm:w-5"
              style={{ top: corner.top, left: corner.left, right: corner.right, bottom: corner.bottom, color: NAVY }}
            >
              <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none">
                <path d={corner.path} fill="currentColor" />
              </svg>
            </div>
          ))}

          {/* Marca de agua ambiental */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none opacity-[0.04]">
            <span className="text-[24vw] font-black uppercase tracking-tighter" style={{ color: NAVY }}>ASHER</span>
          </div>

          {/* Portal enmascarado con la "S" */}
          <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
            <div
              ref={maskLayerRef}
              className="relative flex h-full w-full items-center justify-center overflow-hidden"
              style={{
                WebkitMaskImage: `url('${ASHER_S_MASK_SVG_URI}')`,
                maskImage: `url('${ASHER_S_MASK_SVG_URI}')`,
                WebkitMaskPosition: "50% 50%",
                maskPosition: "50% 50%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "var(--maskW, 420px)",
                maskSize: "var(--maskW, 420px)",
                transition: "mask-size 0.04s linear, -webkit-mask-size 0.04s linear",
              }}
            >
              <div
                ref={sceneRef}
                className="h-full w-full"
                style={{
                  transformOrigin: "50% 50%",
                  background: `
                    radial-gradient(circle at 22% 20%, rgba(128,132,183,0.65), transparent 45%),
                    radial-gradient(circle at 80% 75%, rgba(76,83,64,0.5), transparent 50%),
                    linear-gradient(150deg, #0B1956 0%, #16225f 55%, #0B1956 100%)
                  `,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3 — Cierre */}
      <footer className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-16" style={{ background: IVORY }}>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-2 text-center sm:px-4">
          <h2
            className="mb-6 font-black uppercase leading-[0.88] tracking-[-0.04em]"
            style={{ fontSize: "clamp(10vw,8vw,7.8rem)", color: NAVY }}
          >
            El siguiente <span style={{ color: SLATE }}>paso.</span>
          </h2>
          <p className="max-w-3xl text-xs font-bold uppercase leading-relaxed tracking-wider sm:text-sm md:text-base" style={{ color: "rgba(11,25,86,0.7)" }}>
            Storytelling de marca sin relleno, con <span style={{ color: OLIVE, fontWeight: 900 }}>estrategia real</span> detrás
            de cada pieza y <span style={{ color: OLIVE, fontWeight: 900 }}>respaldo legal</span> desde el primer día.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AsherScrollZoom;
