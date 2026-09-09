"use client";

import { useState, useCallback } from "react";
import { AsherHero } from "./ui/asher-hero";
import { RutasSection } from "./ui/rutas-section";
import { DiferenciadorSection } from "./ui/diferenciador-section";
import { DiagnosticoSection } from "./ui/diagnostico-section";
import { CinematicFooter } from "./ui/motion-footer";
import { LeadModal } from "./ui/lead-modal";
import { ChatWidget } from "./ui/chat-widget";
import type { RutaId } from "@/types";

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
        <RutasSection onContact={onContactRuta} />
        <DiferenciadorSection />
        <DiagnosticoSection onContact={onContactDiagnostico} />
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
