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
      "border-[#589bf9]/18 bg-stone-50",
    extras: null,
  },
  {
    id: "super",
    name: "Super",
    price: "$28,000 MXN",
    accent:
      "border-[#589bf9]/18 bg-stone-50",
    extras: ["1 Servicio *"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$35,000 MXN",
    accent:
      "border-[#589bf9]/18 bg-stone-50",
    extras: [
      "3 Servicios *",
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
      "linear-gradient(120deg, #f7e314 0%,#e8e5df 22%,#e6b40e 38%,#e3cca8 54%,#f0eeeb 72%,#fab305 100%)",
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
          <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#071E9C]">
            Productos
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-[#111827] sm:text-5xl">
            Elige tu paquete ideal
          </h2>
        </div>

        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-[#589bf9]/22 bg-slate-50 px-6 py-3 text-sm uppercase tracking-[0.28em] text-[#0C6CC6] transition hover:border-[#589bf9]/40 hover:bg-[#589bf9]/10 cursor-pointer"
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
                className={`group flex w-full flex-col items-start justify-start rounded-4xl border p-6 text-left shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 cursor-pointer ${
                  tier.accent
                } ${
                  isSelected
                    ? "scale-[1.01] border-[#589bf9]/50 shadow-slate-400/30"
                    : "hover:border-slate-300 hover:bg-blue-50"
                }`}
              >
                <div className="flex w-full items-start justify-between gap-4 bg-blue">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.42em] text-[#0C6CC6] font-extrabold">
                      Paquete
                    </p>
                    <h3 className={`mt-3 whitespace-nowrap text-2xl font-bold tracking-[0.08em] ${tier.id === "super" ? "text-amber-400" : "text-slate-700"}`}>
                      {tier.id === "premium" ? <PremiumTierName text={tier.name} /> : tier.name}
                    </h3>
                  </div>

                  <div className="shrink-0 origin-top-right scale-[0.68] sm:scale-[0.78]">
                    <Brand size="sm" textClassName="text-[#589bf9]" />
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-[#589bf9]/12 bg-blue-50 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.36em] text-slate-600">
                    Precio
                  </p>
                  <p className="mt-3 text-3xl font-light tracking-[0.08em] text-[#589bf9]">
                    {tier.price}
                  </p>
                </div>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-100 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.36em] text-slate-600">
                    Includes
                  </p>
                  <div className="mt-4 grid gap-3">
                    {sharedIncludes.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {tier.extras ? (
                  <div className="mt-5 rounded-3xl border border-dashed border-[#589bf9]/20 bg-[#589bf9]/5 px-4 py-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.36em] text-slate-600">
                      Además el paquete incluye:
                    </p>
                    <div className="mt-3 grid gap-2">
                      {tier.extras.map((extra) => (
                        <p
                          key={extra}
                          className="text-sm font-light leading-6 tracking-[0.04em] text-[#0C6CC6]"
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
