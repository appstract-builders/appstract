"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "01",
    label: "Lectura",
    title: "Diagnostico visual",
    description:
      "Leemos la marca, el contexto y el momento del producto para definir una presencia digital con criterio real.",
  },
  {
    year: "02",
    label: "Narrativa",
    title: "Narrativa y estructura",
    description:
      "Traducimos la propuesta a secciones claras, ritmos de lectura y jerarquias que convierten mejor.",
  },
  {
    year: "03",
    label: "Construccion",
    title: "Diseno y desarrollo",
    description:
      "Construimos una experiencia sobria, con movimiento intencional y una identidad coherente en cada pantalla.",
  },
  {
    year: "04",
    label: "Escala",
    title: "Entrega escalable",
    description:
      "La pagina queda lista para crecer, conectarse a nuevas piezas y ser administrada despues del lanzamiento.",
  },
];

export default function AboutTimeline() {
  return (
    <section className="w-full max-w-6xl px-4 py-16 sm:px-0">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,12,25,0.96),rgba(5,8,18,0.98))] px-5 py-6 shadow-[0_24px_90px_rgba(2,8,23,0.24)] sm:px-7 sm:py-8">
            <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#8052DD]/72">
              Timeline
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
              Como se construye una presencia digital con criterio.
            </h2>
            <p className="mt-6 text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
              Este recorrido no se trata solo de “hacer una web”. Es una
              secuencia de decisiones visuales, narrativas y tecnicas que le
              dan estructura a la presencia digital de una marca.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-[1.4rem] border border-[#8052DD]/16 bg-[#8052DD]/[0.06] px-4 py-4">
                <p className="text-[0.58rem] uppercase tracking-[0.32em] text-[#cebfff]">
                  Presence
                </p>
                <p className="mt-3 text-lg font-light tracking-[0.08em] text-white">
                  Visual
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-cyan-300/14 bg-cyan-300/[0.05] px-4 py-4">
                <p className="text-[0.58rem] uppercase tracking-[0.32em] text-cyan-100/70">
                  Structure
                </p>
                <p className="mt-3 text-lg font-light tracking-[0.08em] text-white">
                  Narrative
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pl-12 sm:pl-16">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[#8052DD]/75 via-cyan-300/30 to-transparent sm:left-6" />

          <div className="grid gap-5">
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone.year}
                initial={{ opacity: 0, y: 28, x: 18, filter: "blur(14px)" }}
                whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                viewport={{ amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,13,26,0.96),rgba(5,8,18,0.98))] px-5 py-5 shadow-[0_18px_70px_rgba(2,8,23,0.22)] sm:px-6 sm:py-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(128,82,221,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(103,232,249,0.08),transparent_28%)]" />

                <div className="absolute left-[-2.35rem] top-7 flex h-8 w-8 items-center justify-center rounded-full border border-[#8052DD]/24 bg-[#0b1120] text-[0.6rem] uppercase tracking-[0.16em] text-[#d7caff] shadow-[0_10px_30px_rgba(128,82,221,0.18)] sm:left-[-2.8rem] sm:h-10 sm:w-10">
                  {milestone.year}
                </div>

                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[#8052DD]/68">
                      {milestone.label}
                    </p>
                    <h3 className="mt-3 text-2xl font-light tracking-[0.08em] text-white">
                      {milestone.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
                      {milestone.description}
                    </p>
                  </div>

                  <div className="grid min-w-[10rem] gap-3 sm:justify-items-end">
                    <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-white/52">
                      Presence step
                    </div>
                    <div className="w-full max-w-[10rem] rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-3">
                      <div className="h-2.5 w-16 rounded-full bg-white/14" />
                      <div className="mt-3 h-8 rounded-[0.8rem] bg-[#8052DD]/18" />
                      <div className="mt-3 h-14 rounded-[0.9rem] bg-[radial-gradient(circle_at_top_left,rgba(128,82,221,0.22),transparent_34%),linear-gradient(180deg,rgba(11,17,34,0.96),rgba(7,11,24,0.98))]" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
