'use client';

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
    id: "beginners",
    name: "Beginners",
    price: "$10,000 MXN",
    accent:
      "border-[#8052DD]/18 bg-[linear-gradient(180deg,rgba(15,16,32,0.92),rgba(8,10,22,0.86))]",
    extras: null,
  },
  {
    id: "super",
    name: "Super",
    price: "$28,000 MXN",
    accent:
      "border-[#8052DD]/18 bg-[linear-gradient(180deg,rgba(15,16,32,0.92),rgba(8,10,22,0.86))]",
    extras: ["1 Extra *"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$35,000 MXN",
    accent:
      "border-[#8052DD]/18 bg-[linear-gradient(180deg,rgba(15,16,32,0.92),rgba(8,10,22,0.86))]",
    extras: [
      "3 Extras *",
      "3 meses de IMIN gratuitos",
      "3 consultas personalizadas gratuitas",
    ],
  },
] as const;

export default function HomeDevelop() {
  const [selectedTierId, setSelectedTierId] = useState<(typeof tiers)[number]["id"]>("beginners");
  const selectedTier = tiers.find((tier) => tier.id === selectedTierId) ?? tiers[0];

  return (
    <section className="w-full px-4 py-12 sm:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#8052DD]/70">
            Products
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
            Appending tiers for every stage.
          </h2>
        </div>

        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-[#8052DD]/22 bg-white/3 px-6 py-3 text-sm uppercase tracking-[0.28em] text-[#c3afff] transition hover:border-[#8052DD]/40 hover:bg-[#8052DD]/10 cursor-pointer"
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
                    ? "scale-[1.01] border-[#8052DD]/50 shadow-[0_24px_80px_rgba(128,82,221,0.2)]"
                    : "hover:border-[#8052DD]/32 hover:bg-white/6"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.42em] text-[#8052DD]/65">
                      Paquete
                    </p>
                    <h3 className="mt-3 text-2xl font-light tracking-[0.08em] text-white">
                      {tier.name}
                    </h3>
                    <div className="mt-3 origin-left scale-[0.92] sm:scale-100">
                      <Brand size="sm" textClassName="text-[#8052DD]" />
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="flex justify-center items-center">
                      <span className="rounded-full border border-[#8052DD]/30 bg-[#1b024b] p-1 text-[0.62rem] uppercase tracking-[0.3em] text-[#c3afff]">
                        Seleccionado
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 rounded-3xl border border-[#8052DD]/12 bg-black/10 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.36em] text-white/45">
                    Precio
                  </p>
                  <p className="mt-3 text-3xl font-light tracking-[0.08em] text-[#8052DD]">
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
                  <div className="mt-5 rounded-3xl border border-dashed border-[#8052DD]/20 bg-[#8052DD]/5 px-4 py-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.36em] text-white/45">
                      Además el paquete incluye:
                    </p>
                    <div className="mt-3 grid gap-2">
                      {tier.extras.map((extra) => (
                        <p
                          key={extra}
                          className="text-sm font-light leading-6 tracking-[0.04em] text-[#cbb8ff]"
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
