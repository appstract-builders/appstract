"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import Brand from "../brand";

const sharedIncludes = [
  "Introduccion - Home",
  "Informacion relevante - About",
  "Formulario de contacto - Contact",
  "Productos relevantes - Products",
  "Redes sociales - Footer",
];

const tiers = [
  {
    id: "beginner",
    name: "Beginner",
    price: "$10,000 MXN",
    accent:
      "border-[#FF8904]/18 bg-[linear-gradient(180deg,rgba(15,16,32,0.92),rgba(8,10,22,0.86))]",
    extras: null,
  },
  {
    id: "super",
    name: "Super",
    price: "$28,000 MXN",
    accent:
      "border-[#FF8904]/18 bg-[linear-gradient(180deg,rgba(15,16,32,0.92),rgba(8,10,22,0.86))]",
    extras: ["1 Extra *"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$35,000 MXN",
    accent:
      "border-[#FF8904]/18 bg-[linear-gradient(180deg,rgba(15,16,32,0.92),rgba(8,10,22,0.86))]",
    extras: [
      "3 Extras *",
      "3 Meses de IMIN gratuitos",
      "3 Consultas personalizadas gratuitas",
    ],
  },
] as const;

function PremiumTierName({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const letters = Array.from(text);
  const goldStyle = {
    backgroundImage:
      "linear-gradient(120deg,#fff7d6 0%,#f6d977 22%,#ffbe55 38%,#fff0b8 54%,#d2911f 72%,#ffe29a 100%)",
    backgroundSize: "220% 220%",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    WebkitTextFillColor: "transparent",
    color: "transparent",
  };

  return (
    <span className="inline-flex whitespace-nowrap filter-[drop-shadow(0_0_10px_rgba(255,190,84,0.2))]">
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className="inline-block"
          style={goldStyle}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: [0.94, 1, 0.96, 1, 0.94],
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }
          }
          transition={{
            duration: 3.8,
            delay: index * 0.08,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

export default function HomeDevelop() {
  const [selectedTierId, setSelectedTierId] = useState<(typeof tiers)[number]["id"]>("beginner");
  const selectedTier = tiers.find((tier) => tier.id === selectedTierId) ?? tiers[0];

  return (
    <section className="w-full px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#FF8904]/70">
            Productos
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
            Elige tu paquete ideal
          </h2>
        </div>

        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-[#FF8904]/22 bg-white/3 px-6 py-3 text-sm uppercase tracking-[0.28em] text-[#ffe4af] transition hover:border-[#FF8904]/40 hover:bg-[#FF8904]/10 cursor-pointer"
          >
            Comprar paquete {selectedTier.name}
          </button>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-3">
          {tiers.map((tier) => {
            const isSelected = tier.id === selectedTierId;

            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`group flex w-full flex-col items-start justify-start rounded-4xl border p-6 text-left shadow-[0_18px_60px_rgba(2,8,23,0.28)] backdrop-blur-xl transition duration-300 cursor-pointer ${
                  tier.accent
                } ${
                  isSelected
                    ? "scale-[1.01] border-[#FF8904]/50 shadow-slate-400/30"
                    : "hover:border-[#18224c] hover:bg-white/6"
                }`}
              >
                <div className="flex w-full items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.42em] text-[#FF8904]/65">
                      Paquete
                    </p>
                    <h3 className={`mt-3 whitespace-nowrap text-2xl font-light tracking-[0.08em] ${tier.id === "super" ? "text-amber-100" : "text-slate-300"}`}>
                      {tier.id === "premium" ? <PremiumTierName text={tier.name} /> : tier.name}
                    </h3>
                  </div>

                  <div className="shrink-0 origin-top-right scale-[0.68] sm:scale-[0.78]">
                    <Brand size="sm" textClassName="text-[#FF8904]" />
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-[#FF8904]/12 bg-black/10 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.36em] text-white/45">
                    Precio
                  </p>
                  <p className="mt-3 text-3xl font-light tracking-[0.08em] text-[#FF8904]">
                    {tier.price}
                  </p>
                </div>

                <div className="mt-5 rounded-3xl border border-white/8 bg-black/10 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.36em] text-white/45">
                    Includes
                  </p>
                  <div className="mt-4 grid gap-3">
                    {sharedIncludes.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/6 bg-white/3 px-4 py-3 text-sm leading-6 text-white/82"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {tier.extras ? (
                  <div className="mt-5 rounded-3xl border border-dashed border-[#FF8904]/20 bg-[#FF8904]/5 px-4 py-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.36em] text-white/45">
                      Además el paquete incluye:
                    </p>
                    <div className="mt-3 grid gap-2">
                      {tier.extras.map((extra) => (
                        <p
                          key={extra}
                          className="text-sm font-light leading-6 tracking-[0.04em] text-[#ffe1b8]"
                        >
                          {extra}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
