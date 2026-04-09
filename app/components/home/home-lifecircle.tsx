"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    step: "1",
    title: "Definicion de necesidades",
    description:
      "Aterrizamos necesidades, objetivos y comportamiento esperado del sitio antes de diseñar cualquier pantalla.",
  },
  {
    step: "2",
    title: "Identidad digital y diseño",
    description:
      "Reunimos toda la materia visual y narrativa para que la presencia digital tenga identidad y consistencia como tu marca.",
  },
  {
    step: "3",
    title: "Soluciones satisfactorias",
    description:
      "Cuidamos la experiencia comercial de tu sitio, asegurando que cubra tus necesidades y las de tus clientes, sin complicaciones ni fricciones innecesarias.",
  },
  {
    step: "4",
    title: "Mantenimiento y soporte",
    description:
      "Despues del lanzamiento acompañamos el sitio con soporte, sesiones de seguimiento y claridad operativa.",
  },
];

export default function HomeLifecircle() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ amount: 0.18 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full max-w-6xl px-4 pb-20 pt-10 sm:px-0"
    >
      <div className="max-w-3xl">
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#FF8904]/72">
          Ciclo de vida.
        </p>
        <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
          Crecemos contigo.
        </h2>
        <p className="mt-5 text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
          Nuestro flujo de trabajo te acompaña en cada etapa, desde el diseño inicial hasta el mantenimiento continuo. Nos aseguramos de que tu sitio web evolucione contigo, adaptándose a tus necesidades y objetivos a medida que creces.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="absolute left-5 top-0 h-full w-px bg-linear-to-b from-[#FF8904]/70 via-cyan-300/28 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

        <div className="grid gap-6">
          {processSteps.map((step, index) => {
            const isRight = index % 2 === 1;

            return (
              <motion.article
                key={step.step}
                initial={{
                  opacity: 0,
                  y: 28,
                  x: isRight ? 28 : -28,
                  filter: "blur(12px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  filter: "blur(0px)",
                }}
                viewport={{ amount: 0.35 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative grid gap-4 sm:grid-cols-2 ${isRight ? "sm:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="hidden sm:block" />

                <div
                  className={`relative ml-14 rounded-[1.9rem] border border-white/10 bg-white/[0.035] px-5 py-5 backdrop-blur-sm sm:ml-0 sm:max-w-120 ${
                    isRight ? "sm:mr-auto" : "sm:ml-auto"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 min-h-8 min-w-8 shrink-0 aspect-square items-center justify-center rounded-full border border-[#FF8904]/22 bg-[#1f1d19]/10 text-[0.62rem] uppercase tracking-[0.16em] text-[#ffe9ca] shadow-slate-300 sm:left-auto sm:right-[-2.85rem] sm:h-10 sm:w-10 sm:min-h-10 sm:min-w-10 pt-1">
                      {step.step}
                    </div>
                    <h6 className="text-2xl font-light tracking-[0.08em] text-white">
                      {step.title}
                    </h6>
                  </div>

                  <p className="mt-4 text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
