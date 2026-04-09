"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "appstract aterrizo nuestra idea en una pagina clara, elegante y lista para presentar el proyecto con seriedad.",
    author: "Jaime Fragozo",
    role: "Lake Sport Club",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "El proceso se sintio muy guiado. No solo diseñaron el sitio, tambien ordenaron como debiamos contar lo que hacemos.",
    author: "Rosa Falcón",
    role: "Pulsety",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "IMIN nos dio independencia para actualizar mensajes y visuales sin tocar codigo despues de la entrega.",
    author: "Francisco Ortega",
    role: "Ingeniero de desarrollo web",
  },
];

export default function ProductTestimonial() {
  return (
    <motion.section
      id="testimonial"
      initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ amount: 0.18 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full max-w-6xl px-4 pb-20 pt-10 sm:px-0"
    >
      <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,10,22,0.96),rgba(5,8,18,0.94))] px-5 py-8 shadow-[0_24px_90px_rgba(2,8,23,0.24)] sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#FF8904]/72">
            Testimoniales
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
            Orgullo que nos acompaña
          </h2>
          <p className="mt-5 text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
            brindamos un servicio que se adapta a las necesidades de cada cliente, por eso nos enorgullece compartir lo que nuestros clientes dicen sobre nosotros.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.author}
              initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ amount: 0.35 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex min-h-68 flex-col justify-between rounded-[1.85rem] border border-white/10 bg-white/[0.035] px-5 py-5 backdrop-blur-sm"
            >
              <div>
                <div
                  aria-hidden="true"
                  className="text-[1.9rem] font-light leading-none text-[#FF8904]/84"
                >
                  Testimonio
                </div>
                <p className="mt-4 text-sm leading-7 tracking-[0.04em] text-white/82 sm:text-base">
                  {testimonial.quote}
                </p>
              </div>

              <div className="mt-8 border-t border-white/8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#0a1020] shadow-[0_10px_30px_rgba(0,0,0,0.28)] ring-1 ring-white/6">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      sizes="48px"
                      className="object-cover object-center scale-[1.08]"
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-white/84">
                      {testimonial.author}
                    </p>
                    <p className="mt-2 text-[0.72rem] uppercase tracking-[0.3em] text-[#cfc6a5]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
