"use client";

import { useState, useCallback, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AsherHero } from "./ui/asher-hero";
import { AsherScrollZoom } from "./ui/asher-scroll-zoom";
import { AsherStoryScroll } from "./ui/asher-story-scroll";
import { AsherPhotoCards } from "./ui/asher-photo-cards";
import { RutasSection } from "./ui/rutas-section";
import HowItWorks from "./ui/how-it-works";
import { DiferenciadorSection } from "./ui/diferenciador-section";
import { AsherPricing } from "./ui/asher-pricing";
import { DiagnosticoSection } from "./ui/diagnostico-section";
import { AsherDisciplinasSlider } from "./ui/asher-disciplinas-slider";
import { CinematicFooter } from "./ui/motion-footer";
import { LeadModal } from "./ui/lead-modal";
import { ChatWidget } from "./ui/chat-widget";
import type { RutaId } from "@/types";

gsap.registerPlugin(ScrollTrigger);

/** Scroll suave estilo Habito Studio, sincronizado con el ticker de GSAP/ScrollTrigger. */
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);
}

interface ModalState {
  open: boolean;
  rutaId: RutaId;
  desdeDiagnostico: boolean;
  resultadoDiagnostico?: string;
  seccionOrigen?: string;
}

const MODAL_INIT: ModalState = {
  open: false,
  rutaId: "contacto_general",
  desdeDiagnostico: false,
};

export const AsherLanding = () => {
  useSmoothScroll();
  const [modal, setModal] = useState<ModalState>(MODAL_INIT);

  const abrirModal = useCallback(
    (
      rutaId: RutaId = "contacto_general",
      origen?: string,
      desdeDiagnostico = false,
      resultadoDiagnostico?: string
    ) => {
      setModal({ open: true, rutaId, desdeDiagnostico, resultadoDiagnostico, seccionOrigen: origen });
    },
    []
  );

  const cerrarModal = useCallback(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);

  const onContactRuta = useCallback(
    (rutaId: RutaId, origen?: string) => abrirModal(rutaId, origen, false),
    [abrirModal]
  );

  const onContactDiagnostico = useCallback(
    (rutaId: RutaId, desdeDiagnostico: boolean, resultado: string) =>
      abrirModal(rutaId, "diagnostico", desdeDiagnostico, resultado),
    [abrirModal]
  );

  const onContactGeneral = useCallback(
    (origen?: string) => abrirModal("contacto_general", origen ?? "hero", false),
    [abrirModal]
  );

  return (
    <>
      <main style={{ background: "#F7F4ED" }}>
        <AsherHero onContact={onContactGeneral} />
        <AsherScrollZoom />
        <AsherStoryScroll onContact={onContactGeneral} />
        <AsherPhotoCards />
        <RutasSection onContact={onContactRuta} />
        <HowItWorks />
        <DiferenciadorSection />
        <AsherPricing onContact={onContactGeneral} />
        <DiagnosticoSection onContact={onContactDiagnostico} />
        <AsherDisciplinasSlider />
      </main>

      {/* CinematicFooter vive fuera del <main> para que el clip-path funcione */}
      <CinematicFooter onContact={onContactRuta} />

      <LeadModal
        isOpen={modal.open}
        onClose={cerrarModal}
        rutaId={modal.rutaId}
        desdeDiagnostico={modal.desdeDiagnostico}
        resultadoDiagnostico={modal.resultadoDiagnostico}
        seccionOrigen={modal.seccionOrigen}
      />

      <ChatWidget />
    </>
  );
};
