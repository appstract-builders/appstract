"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const textRows = [
  "IMIN  PERSONALIZA  TEXTO  MENSAJES  IDENTIDAD",
  "TIPOGRAFIA  IMIN  CONTENIDO  TEXTO  APPENDING",
  "EDITOR  IMIN  COPY  TEXTO  PERSONALIZA",
  "IMIN  MENSAJES  IDENTIDAD  TEXTO  UI",
  "APPENDING  IMIN  IDENTIDAD  COPY  TEXTO",
  "MENSAJES  CONTENIDO  IMIN  DISENO  WEB",
  "IMIN  PRODUCTO  PERSONALIZA  TEXTO  UI",
  "EDITOR  APPENDING  MENSAJES  TEXTO  MARCA",
];

type TextStripProps = {
  text: string;
  duration: number;
  reverse?: boolean;
  opacityClass: string;
  className?: string;
};

type HomeTextProps = {
  showMessageCard?: boolean;
  className?: string;
};

function TextStrip({
  text,
  duration,
  reverse = false,
  opacityClass,
  className = "",
}: TextStripProps) {
  const words = text.trim().split(/\s+/);
  const repeated = Array.from({ length: 4 }, (_, index) => (
    <span
      key={`${text}-${index}`}
      className="mr-8 inline-flex shrink-0 items-center gap-8 whitespace-nowrap"
    >
      {words.map((item, itemIndex) => (
        <span
          key={`${item}-${itemIndex}`}
          className="inline-block text-[clamp(2.4rem,7vw,6.5rem)] font-light uppercase tracking-[0.32em]"
        >
          {item}
        </span>
      ))}
    </span>
  ));

  return (
    <div className={`w-full overflow-hidden ${opacityClass} ${className}`.trim()}>
      <div
        className="home-text-marquee flex w-max"
        style={{
          animationDuration: `${duration}s`,
          animationName: reverse
            ? "home-text-marquee-reverse"
            : "home-text-marquee-forward",
        }}
      >
        {repeated}
      </div>
    </div>
  );
}

export default function HomeText({
  showMessageCard = true,
  className = "",
}: HomeTextProps) {
  return (
    <section
      className={`relative flex min-h-[144vh] w-full max-w-none items-center justify-center overflow-hidden rounded-[2.25rem] bg-[#050a18]/35 px-4 py-12 backdrop-blur-sm sm:px-10 ${className}`.trim()}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.08),transparent_34%),radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_58%)]" />

      <div className="absolute inset-0 flex w-full flex-col justify-center gap-3 sm:gap-5">
        <TextStrip
          text={textRows[0]}
          duration={30}
          opacityClass="text-cyan-100/10"
        />
        <TextStrip
          text={textRows[1]}
          duration={36}
          reverse
          opacityClass="text-violet-200/10"
        />
        <TextStrip
          text={textRows[2]}
          duration={32}
          opacityClass="text-fuchsia-100/10"
        />
        <TextStrip
          text={textRows[3]}
          duration={38}
          reverse
          opacityClass="text-cyan-50/8"
        />
        <TextStrip
          text={textRows[4]}
          duration={34}
          opacityClass="text-violet-100/9 sm:hidden"
          className="sm:hidden"
        />
        <TextStrip
          text={textRows[5]}
          duration={40}
          reverse
          opacityClass="text-cyan-100/8 sm:hidden"
          className="sm:hidden"
        />
        <TextStrip
          text={textRows[6]}
          duration={35}
          opacityClass="text-fuchsia-100/8 sm:hidden"
          className="sm:hidden"
        />
        <TextStrip
          text={textRows[7]}
          duration={42}
          reverse
          opacityClass="text-white/6 sm:hidden"
          className="sm:hidden"
        />
      </div>

      {showMessageCard ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ amount: 0.4, once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 mx-4 w-[calc(100%-2rem)] max-w-4xl rounded-[1.75rem] border border-white/12 bg-[#081121]/78 px-4 py-5 shadow-[0_18px_80px_rgba(2,8,23,0.42)] backdrop-blur-xl sm:mx-0 sm:w-full sm:px-6 sm:py-6"
        >
          <div className="grid gap-4 text-center sm:grid-cols-[auto_1fr] sm:items-center sm:gap-5 sm:text-left">
            <div className="relative mx-auto h-14 w-14 shrink-0 sm:mx-0 sm:h-20 sm:w-20">
              <Image
                src="/IMIN.png"
                alt="IMIN logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 56px, 80px"
              />
            </div>
            <p className="mx-auto max-w-[34ch] text-sm leading-6 tracking-[0.03em] text-white/88 sm:mx-0 sm:max-w-2xl sm:text-base sm:leading-7 sm:tracking-[0.04em]">
              Administra tu contenido, personaliza tu identidad y da vida a tus
              mensajes con IMIN, la herramienta para diseñar tu página web sin
              programar y gestionar tamaños, imágenes y textos.
            </p>
          </div>
        </motion.div>
      ) : null}
    </section>
  );
}
