"use client";

import { motion } from "framer-motion";

const tutorialSteps = [
  {
    step: "01",
    label: "Texto",
    title: "Actualiza titulares y mensajes clave.",
    description:
      "IMIN permite modificar el copy principal para adaptar la oferta o la temporada sin rehacer la página.",
    accent: "bg-[#FF8904]/14 text-[#d4c6ff]",
  },
  {
    step: "02",
    label: "Visual",
    title: "Cambia imagenes, tonos y foco de marca.",
    description:
      "La presentación visual se renueva para mantener el sitio alineado con cada cliente o campaña mensual.",
    accent: "bg-cyan-300/12 text-cyan-100",
  },
  {
    step: "03",
    label: "Publica",
    title: "El sitio queda vivo sin intervenir desarrollo.",
    description:
      "Los ajustes se reflejan rápido y el usuario conserva una web actualizada sin pedir una reconstrucción completa.",
    accent: "bg-white/[0.07] text-white/84",
  },
];

export default function IminTutorial() {
  return (
    <section className="w-full max-w-6xl px-4 pb-16 sm:px-0 sm:pb-20 pt-20">
      <div className="mb-8 max-w-3xl">
        <p className="text-[0.68rem] uppercase tracking-[0.42em] text-[#bca8ff]">
          IMIN Tutorial
        </p>
        <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
          Un preview rápido de cómo cambia el sitio de un usuario.
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.94),rgba(4,7,16,0.96))] p-4 shadow-[0_24px_90px_rgba(2,8,23,0.28)]">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff7f96]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd76a]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#76ffb0]/80" />
          </div>

          <div className="grid gap-4 rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,14,28,0.98),rgba(5,8,18,1))] p-4">
            <motion.div
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(128,82,221,0.18), rgba(5,8,18,0.2))",
                  "linear-gradient(135deg, rgba(103,232,249,0.16), rgba(5,8,18,0.24))",
                  "linear-gradient(135deg, rgba(128,82,221,0.18), rgba(5,8,18,0.2))",
                ],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-[1.3rem] border border-white/8 p-5"
            >
              <motion.div
                animate={{
                  width: ["34%", "56%", "42%"],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="h-3 rounded-full bg-white/14"
              />
              <motion.div
                animate={{
                  width: ["78%", "62%", "84%"],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="mt-3 h-10 rounded-[0.9rem] bg-white/8"
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                <motion.div
                  animate={{
                    opacity: [0.58, 0.92, 0.68],
                  }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                  className="min-h-[12rem] rounded-[1rem] bg-[radial-gradient(circle_at_top_left,rgba(128,82,221,0.26),transparent_34%),linear-gradient(180deg,rgba(11,17,34,0.96),rgba(7,11,24,0.98))]"
                />
                <div className="grid gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-[1rem] bg-white/[0.06] p-3"
                  >
                    <div className="h-2.5 w-14 rounded-full bg-white/16" />
                    <div className="mt-3 h-8 rounded-[0.8rem] bg-[#FF8904]/20" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.45,
                    }}
                    className="rounded-[1rem] bg-white/[0.06] p-3"
                  >
                    <div className="h-2.5 w-12 rounded-full bg-white/16" />
                    <div className="mt-3 h-8 rounded-[0.8rem] bg-cyan-300/16" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid gap-4">
          {tutorialSteps.map((step, index) => (
            <motion.article
              key={step.step}
              initial={{ opacity: 0, x: 24, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.62rem] uppercase tracking-[0.38em] text-[#bca8ff]">
                  {step.step}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] ${step.accent}`}
                >
                  {step.label}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-light tracking-[0.08em] text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-7 tracking-[0.04em] text-white/70">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
