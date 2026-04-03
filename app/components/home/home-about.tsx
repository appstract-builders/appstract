"use client";

import { motion } from "framer-motion";

const aboutPoints = [
  {
    title: "Diseno con identidad",
    description:
      "Construimos una presencia digital que se siente propia, cuidando estructura, tono y ritmo visual.",
  },
  {
    title: "Desarrollo ad hoc",
    description:
      "Cada sitio se adapta al flujo real de tu negocio, sin plantillas rigidas ni secciones de relleno.",
  },
  {
    title: "Escala con IMIN",
    description:
      "Despues del lanzamiento puedes seguir editando textos, imagenes y contenido sin friccion.",
  },
];

export default function HomeAbout() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ amount: 0.2 }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full max-w-6xl px-4 py-16 sm:px-0"
    >
      <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,11,25,0.92),rgba(5,8,19,0.94))] shadow-[0_24px_90px_rgba(2,8,23,0.28)]">
        <div className="grid gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#8052DD]/72">
              About
            </p>
            <h2 className="mt-4 max-w-[12ch] text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
              Appending desarrolla sitios que si parecen tuyos.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 tracking-[0.04em] text-white/72 sm:text-base">
              El objetivo no es solo lanzar una pagina. Diseñamos un sistema
              visual claro, con narrativa, estructura comercial y una base que
              luego puedas operar con IMIN para mantener tu contenido vivo.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.6rem] border border-[#8052DD]/16 bg-[#8052DD]/[0.06] px-4 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[#bda7ff]">
                  Focus
                </p>
                <p className="mt-3 text-lg font-light tracking-[0.08em] text-white">
                  Branding
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-cyan-300/14 bg-cyan-300/[0.05] px-4 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-cyan-100/70">
                  Build
                </p>
                <p className="mt-3 text-lg font-light tracking-[0.08em] text-white">
                  Product
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] px-4 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-white/45">
                  Outcome
                </p>
                <p className="mt-3 text-lg font-light tracking-[0.08em] text-white">
                  Presence
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {aboutPoints.map((point, index) => (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, x: 24, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ amount: 0.45 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] px-5 py-5 backdrop-blur-sm"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[#8052DD]/68">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-light tracking-[0.08em] text-white">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-7 tracking-[0.04em] text-white/68">
                  {point.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
