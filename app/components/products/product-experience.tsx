"use client";

import { motion } from "framer-motion";

const prototypeSites = [
  {
    name: "Studio Landing",
    type: "Brand Website",
    description:
      "Una landing editorial para servicios creativos, con narrativa clara, CTA comercial y una identidad sobria.",
    accent: "from-[#8052DD]/24 via-transparent to-cyan-300/12",
  },
  {
    name: "Wellness Profile",
    type: "Personal Site",
    description:
      "Un sitio de presentacion para marca personal con servicios, about, contacto y una capa visual flexible.",
    accent: "from-cyan-300/18 via-transparent to-[#8052DD]/16",
  },
  {
    name: "Product Showcase",
    type: "Catalog Website",
    description:
      "Un prototipo orientado a negocio que organiza productos, mensajes clave y puntos de contacto sin ruido.",
    accent: "from-fuchsia-300/16 via-transparent to-[#8052DD]/18",
  },
];

export default function ProductExperience() {
  return (
    <section className="w-full max-w-6xl px-4 pb-20 pt-6 sm:px-0 sm:pb-24">
      <div className="mb-8 max-w-3xl">
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#8052DD]/72">
          Product Experience
        </p>
        <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
          Sitios web prototipo que respaldan la experiencia.
        </h2>
        <p className="mt-5 text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
          Estos prototipos representan la forma en la que estructuramos una
          presencia digital: claridad comercial, ritmo visual y una base lista
          para crecer con el producto o con IMIN.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {prototypeSites.map((site, index) => (
          <motion.article
            key={site.name}
            initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ amount: 0.35 }}
            transition={{
              duration: 0.65,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,7,16,0.98))] shadow-[0_20px_80px_rgba(2,8,23,0.24)]"
          >
            <div className={`h-52 bg-gradient-to-br ${site.accent} p-4`}>
              <div className="h-full rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,14,28,0.98),rgba(5,8,18,1))] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff7f96]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd76a]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#76ffb0]/80" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-24 rounded-full bg-white/14" />
                  <div className="h-8 rounded-[0.8rem] bg-white/[0.06]" />
                  <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
                    <div className="h-24 rounded-[1rem] bg-[radial-gradient(circle_at_top_left,rgba(128,82,221,0.24),transparent_34%),linear-gradient(180deg,rgba(11,17,34,0.96),rgba(7,11,24,0.98))]" />
                    <div className="grid gap-3">
                      <div className="h-10 rounded-[0.9rem] bg-white/[0.05]" />
                      <div className="h-10 rounded-[0.9rem] bg-white/[0.05]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-[0.62rem] uppercase tracking-[0.36em] text-[#bca8ff]">
                {site.type}
              </p>
              <h3 className="mt-4 text-2xl font-light tracking-[0.08em] text-white">
                {site.name}
              </h3>
              <p className="mt-4 text-sm leading-7 tracking-[0.04em] text-white/70">
                {site.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
