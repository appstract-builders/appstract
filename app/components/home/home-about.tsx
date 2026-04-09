"use client";

import { motion } from "framer-motion";

const aboutPoints = [
  {
    title: "Contrata tu paquete",
    description:
      "Construyamos un sitio web a tu medida, el diseño de tu marca es el punto de partida, no el limite. Elige el paquete que se adapte a tus necesidades y presupuesto. ¡Mejora tu sitio en cualquier momento!",
  },
  {
    title: "Asesoramiento personalizado",
    description:
      "Nos aseguraremos de que tu sitio web refleje la esencia de tu marca y cumpla con tus objetivos. Nuestro equipo de expertos te guiará en cada paso del proceso, desde el diseño hasta la implementación.",
  },
  {
    title: "Escala con IMIN",
    description:
      "Despues del lanzamiento puedes seguir editando textos, imagenes y contenido sin friccion, escalar tu sitio web nunca fue tan facil.",
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
            <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#FF8904]">
              appstract
            </p>
            <h2 className="mt-4 max-w-[12ch] text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
              Somos tu Destino Digital.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 tracking-[0.04em] text-white/72 sm:text-base">
              Enfoque en el pequeño detalle, impacto en el resultado. Sitios web a tu medida, sin complicaciones ni plantillas predefinidas. Diseñamos y construimos tu presencia digital con identidad propia, cuidando cada aspecto para que refleje la esencia de tu marca.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.6rem] border border-[#FF8904]/16 bg-[#FF8904]/6 px-4 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[#e69e0d]">
                  Enfoque
                </p>
                <p className="mt-3 text-lg font-light tracking-[0.08em] text-white">
                  Crecer tu marca y acompañarte en el vuelo.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-amber-300/14 bg-amber-300/5 px-4 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-amber-100/70">
                  Creación
                </p>
                <p className="mt-3 text-lg font-light tracking-[0.08em] text-white">
                  Productos digitales que tienen intención.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-slate-700 bg-slate-800/30 px-4 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-slate-600">
                  Presencia
                </p>
                <p className="mt-3 text-lg font-light tracking-[0.08em] text-white">
                  Obten crecimiento y resultados reales.
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
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[#cfbef2]">
                  {index + 1}
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
