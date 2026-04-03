"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const imageCards = [
  {
    label: "Antes",
    title: "Una presencia fija y dificil de ajustar.",
    description:
      "El sitio mantiene una sola identidad visual y cada cambio depende de editarlo manualmente.",
    imageSrc: "/Appending.png",
    imageAlt: "Vista base del sitio Appending",
    accent: "from-[#8052DD]/28 via-transparent to-cyan-300/10",
  },
  {
    label: "Con IMIN",
    title: "Una web que evoluciona con la mensualidad.",
    description:
      "IMIN permite cambiar imagenes, textos y tono visual para adaptar el sitio segun cada cliente o temporada.",
    imageSrc: "/IMIN.png",
    imageAlt: "Vista editable de IMIN para personalizar un sitio",
    accent: "from-cyan-300/22 via-transparent to-[#8052DD]/18",
  },
];

type ParallaxCardProps = {
  card: (typeof imageCards)[number];
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  className?: string;
};

function ParallaxCard({ card, y, rotate, className = "" }: ParallaxCardProps) {
  return (
    <motion.article
      style={{ y, rotate }}
      className={`relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(8,12,24,0.94),rgba(4,7,16,0.96))] p-4 shadow-[0_24px_90px_rgba(2,8,23,0.34)] backdrop-blur-xl ${className}`.trim()}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent}`} />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.36em] text-[#bfaeff]">
              {card.label}
            </p>
            <h3 className="mt-3 text-xl font-light tracking-[0.08em] text-white sm:text-2xl">
              {card.title}
            </h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-white/55">
            Visual Shift
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-white/8 bg-[#040916]/92 p-3">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff7f96]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd76a]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#76ffb0]/80" />
          </div>

          <div className="grid gap-3 rounded-[1.3rem] border border-white/6 bg-[linear-gradient(180deg,rgba(11,17,34,0.96),rgba(7,11,24,0.98))] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="h-2.5 w-24 rounded-full bg-white/12" />
                <div className="h-2.5 w-16 rounded-full bg-white/8" />
              </div>
              <div className="rounded-full border border-[#8052DD]/18 bg-[#8052DD]/10 px-3 py-1 text-[0.56rem] uppercase tracking-[0.26em] text-[#cfbfff]">
                monthly
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[15rem] overflow-hidden rounded-[1.25rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(128,82,221,0.2),transparent_36%),linear-gradient(180deg,rgba(10,14,28,0.98),rgba(5,8,18,1))]">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/6 to-transparent" />
                <div className="absolute left-4 top-4 h-14 w-32 rounded-[1rem] border border-white/8 bg-white/[0.05]" />
                <div className="absolute bottom-4 left-4 right-4 h-20 rounded-[1rem] border border-white/8 bg-white/[0.04]" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      className="object-contain drop-shadow-[0_18px_30px_rgba(128,82,221,0.18)]"
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[1.2rem] border border-white/8 bg-white/[0.035] p-3">
                  <div className="text-[0.56rem] uppercase tracking-[0.28em] text-white/44">
                    Cambio
                  </div>
                  <p className="mt-3 text-sm leading-6 tracking-[0.03em] text-white/78">
                    {card.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-3">
                    <div className="text-[0.56rem] uppercase tracking-[0.28em] text-white/44">
                      Texto
                    </div>
                    <div className="mt-3 h-2.5 w-full rounded-full bg-white/12" />
                    <div className="mt-2 h-2.5 w-3/4 rounded-full bg-white/8" />
                  </div>
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-3">
                    <div className="text-[0.56rem] uppercase tracking-[0.28em] text-white/44">
                      Imagen
                    </div>
                    <div className="mt-3 h-12 rounded-[0.9rem] bg-gradient-to-br from-[#8052DD]/24 to-cyan-300/12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function IminParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const firstCardY = useTransform(scrollYProgress, [0, 1], [72, -54]);
  const secondCardY = useTransform(scrollYProgress, [0, 1], [-40, 84]);
  const firstCardRotate = useTransform(scrollYProgress, [0, 1], [-4, 3]);
  const secondCardRotate = useTransform(scrollYProgress, [0, 1], [3, -4]);

  return (
    <section ref={sectionRef} className="w-full max-w-6xl px-4 py-16 sm:px-0">
      <div className="max-w-3xl">
        <p className="text-[0.68rem] uppercase tracking-[0.42em] text-[#bca8ff]">
          IMIN Parallax
        </p>
        <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
          Un cambio visual mensual para que el sitio de tus clientes siga vivo.
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-7 tracking-[0.04em] text-white/72 sm:text-base">
          Con IMIN puedes intervenir el aspecto del sitio sin rehacerlo:
          actualizar textos, mover tono visual y renovar la presentacion para
          que cada cliente conserve una web actualizada durante su mensualidad.
        </p>
      </div>

      <div className="relative mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <ParallaxCard
          card={imageCards[0]}
          y={firstCardY}
          rotate={firstCardRotate}
        />
        <ParallaxCard
          card={imageCards[1]}
          y={secondCardY}
          rotate={secondCardRotate}
          className="lg:mt-20"
        />
      </div>
    </section>
  );
}
