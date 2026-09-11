"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NAVY = "#0B1956";
const IVORY = "#F7F4ED";
const SAND = "#DBC8B6";
const SLATE = "#8084B7";
const OLIVE = "#4C5340";

interface CardData {
  heading: string;
  description: string;
  gradient: string;
}

// Sin fotos de stock ni imágenes inventadas — cada tarjeta usa un degradado
// real de la paleta ASHER, que es lo que el efecto saturate-0→100 revela al hover.
const CARDS: CardData[] = [
  {
    heading: "Estrategia",
    description: "Diagnóstico y ruta clara antes de mover un solo elemento de tu marca.",
    gradient: `linear-gradient(135deg, ${NAVY} 0%, ${SLATE} 100%)`,
  },
  {
    heading: "Marca",
    description: "Identidad visual y de negocio que se sostiene en el tiempo.",
    gradient: `linear-gradient(135deg, ${SLATE} 0%, ${SAND} 100%)`,
  },
  {
    heading: "Digital",
    description: "Presencia web, automatizaciones y campañas que sí convierten.",
    gradient: `linear-gradient(135deg, ${SAND} 0%, ${OLIVE} 100%)`,
  },
  {
    heading: "Legal",
    description: "Registro y blindaje para que lo que construyes sea tuyo de verdad.",
    gradient: `linear-gradient(135deg, ${OLIVE} 0%, ${NAVY} 100%)`,
  },
];

export function AsherPhotoCards() {
  return (
    <section id="disciplinas" className="p-4 py-16 md:p-8 md:py-24" style={{ background: IVORY }}>
      <div className="mx-auto mb-12 max-w-6xl md:mb-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8" style={{ background: SLATE }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(11,25,86,0.5)" }}>
            Cuatro disciplinas
          </span>
        </div>
        <h2 className="font-medium tracking-tight" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", color: NAVY, lineHeight: 1.05 }}>
          Una sola marca,
          <br />
          <span style={{ color: "rgba(11,25,86,0.45)" }}>cuatro frentes</span>
        </h2>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        {CARDS.map((card) => (
          <Card key={card.heading} {...card} />
        ))}
      </div>
    </section>
  );
}

function Card({ heading, description, gradient }: CardData) {
  return (
    <motion.div
      transition={{ staggerChildren: 0.035 }}
      whileHover="hover"
      className="group relative h-64 w-full cursor-pointer overflow-hidden"
      style={{ background: SLATE }}
    >
      <div
        className="absolute inset-0 saturate-100 transition-all duration-500 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
        style={{ backgroundImage: gradient }}
      />
      <div
        className="relative z-20 flex h-full flex-col justify-between p-5 transition-colors duration-500"
        style={{ color: "rgba(247,244,237,0.75)" }}
      >
        <ArrowRight className="ml-auto h-7 w-7 transition-transform duration-500 group-hover:-rotate-45" />
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
        <span>{letter === " " ? " " : letter}</span>
        <span>{letter === " " ? " " : letter}</span>
      </motion.span>
    </div>
  );
}
