"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NAVY = "#0B1956";
const IVORY = "#F7F4ED";
const SLATE = "#8084B7";

interface CardData {
  heading: string;
  description: string;
  imgSrc: string;
  wide?: boolean;
}

// Fotos reales del isotipo ASHER en cada color de división, provistas por el cliente.
const CARDS: CardData[] = [
  {
    heading: "Estrategia",
    description: "Diagnóstico y ruta clara antes de mover un solo elemento de tu marca.",
    imgSrc: "/disciplinas/estrategia-maroon.png",
  },
  {
    heading: "Marca",
    description: "Identidad visual y de negocio que se sostiene en el tiempo.",
    imgSrc: "/disciplinas/marca-branding.png",
  },
  {
    heading: "Digital",
    description: "Presencia web, automatizaciones y campañas que sí convierten.",
    imgSrc: "/disciplinas/digital-verde.png",
  },
  {
    heading: "Publicidad",
    description: "Campañas que se miden en clientes, no en likes.",
    imgSrc: "/disciplinas/publicidad-naranja.png",
  },
  {
    heading: "Legal",
    description: "Registro y blindaje para que lo que construyes sea tuyo de verdad.",
    imgSrc: "/disciplinas/legal-navy.png",
    wide: true,
  },
];

export function AsherPhotoCards() {
  return (
    <section id="disciplinas" className="p-4 py-16 md:p-8 md:py-24" style={{ background: IVORY }}>
      <div className="mx-auto mb-12 max-w-6xl md:mb-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8" style={{ background: SLATE }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.5)" }}>
            Cinco disciplinas
          </span>
        </div>
        <h2 className="font-medium tracking-tight" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", color: NAVY, lineHeight: 1.05 }}>
          Una sola marca,
          <br />
          <span style={{ color: "rgba(11,25,86,0.45)" }}>cinco frentes</span>
        </h2>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {CARDS.map((card) => (
          <Card key={card.heading} {...card} />
        ))}
      </div>
    </section>
  );
}

function Card({ heading, description, imgSrc, wide }: CardData) {
  return (
    <motion.div
      transition={{ staggerChildren: 0.035 }}
      whileHover="hover"
      className={`group relative h-64 w-full cursor-pointer overflow-hidden ${wide ? "sm:col-span-2" : ""}`}
      style={{ background: IVORY }}
    >
      <div
        className="absolute inset-0 saturate-100 transition-all duration-500 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
        style={{ backgroundImage: `url(${imgSrc})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(11,25,86,0.78) 0%, rgba(11,25,86,0.15) 45%, transparent 70%)" }}
      />
      <div className="relative z-20 flex h-full flex-col justify-between p-5 transition-colors duration-500" style={{ color: "rgba(247,244,237,0.8)" }}>
        <ArrowRight className="ml-auto h-7 w-7 transition-transform duration-500 group-hover:-rotate-45" style={{ color: IVORY }} />
        <div>
          <h4 className="flex text-3xl font-semibold" style={{ color: IVORY }}>
            {heading.split("").map((letter, index) => (
              <AnimatedLetter letter={letter} key={index} />
            ))}
          </h4>
          <p className="mt-2 max-w-xs text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

const letterVariants: Variants = {
  hover: { y: "-50%" },
};

function AnimatedLetter({ letter }: { letter: string }) {
  return (
    <div className="inline-block h-[36px] overflow-hidden">
      <motion.span
        className="flex min-w-[4px] flex-col"
        style={{ y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.5 }}
      >
        <span>{letter === " " ? " " : letter}</span>
        <span>{letter === " " ? " " : letter}</span>
      </motion.span>
    </div>
  );
}
