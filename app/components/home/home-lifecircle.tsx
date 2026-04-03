"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    step: "1",
    title: "Obtener requerimientos e historias de usuario",
    description:
      "Aterrizamos necesidades, objetivos y comportamiento esperado del sitio antes de diseñar cualquier pantalla.",
  },
  {
    step: "2",
    title: "Obtener multimedia, colores, imagenes y textos",
    description:
      "Reunimos la materia visual y narrativa para que la presencia digital tenga identidad y consistencia real.",
  },
  {
    step: "3",
    title: "Desarrollo especializado a las necesidades del cliente",
    description:
      "Construimos una solucion ad hoc, cuidando jerarquia visual, interaccion y estructura comercial.",
  },
  {
    step: "4",
    title: "Mantenimiento y sesiones de consulta para dudas",
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
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#8052DD]/72">
          Lifecycle
        </p>
        <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
          Los 4 pasos que seguimos para crear sitios web.
        </h2>
        <p className="mt-5 text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
          Este es el flujo base con el que organizamos cada proyecto, desde
          descubrimiento hasta mantenimiento posterior al lanzamiento.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="absolute left-5 top-0 h-full w-px bg-linear-to-b from-[#8052DD]/70 via-cyan-300/28 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

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
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8052DD]/22 bg-[#0b1120] text-[0.62rem] uppercase tracking-[0.16em] text-[#d7caff] shadow-[0_10px_30px_rgba(128,82,221,0.18)] sm:left-auto sm:right-[-2.85rem] sm:h-10 sm:w-10">
                      {step.step}
                    </div>
                    <h6 className="mt-3 text-2xl font-light tracking-[0.08em] text-white">
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
