"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { startTransition, useEffect, useState } from "react";
import HomeAbout from "./components/home/home-about";
import HomeDevelop from "./components/home/home-develop";
import HomeLifecircle from "./components/home/home-lifecircle";
import HomeText from "./components/home/home-text";
import Loader from "./components/loader";
import SiteFooter from "./components/site-footer";

const LOADER_DURATION_MS = 4400;

const bottomCards = [
  {
    label: "Crea Tu Entorno",
    value: "Muestra tus ideas en tu sito web, sin necesidad de instalaciones extra.",
  },
  {
    label: "Escala tu proyecto",
    value: "Puedes escalar tu proyecto y actualizarlo cuando quieras con nosotros.",
  },
  {
    label: "Modifica tu proyecto",
    value: "con IMIN puedes modificar y actualizar tu proyecto, en cualquier momento.",
  },
];

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      startTransition(() => {
        setShowLoader(false);
      });
    }, LOADER_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="app-min-h-screen relative overflow-hidden bg-white text-[#111827]">
      <AnimatePresence>{showLoader ? <Loader key="loader" /> : null}</AnimatePresence>

      {!showLoader ? (
        <div className="relative z-10 flex w-full flex-col items-center ">
          <section
            id="products"
            className="scroll-mt-28 w-full max-w-5xl px-4 pb-5 pt-28 sm:scroll-mt-32 sm:px-5 sm:pt-32"
          >
            <div className="grid w-full gap-4 md:grid-cols-3">
              {bottomCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 20,
                    scale: shouldReduceMotion ? 1 : 0.985,
                    filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  viewport={{ amount: 0.35, once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-[1.75rem] border border-slate-200 hover:shadow-blue-300/30 hover:shadow cursor-pointer ease-in-out bg-white hover:bg-blue-50/10 px-5 py-5 text-left backdrop-blur-sm"
                >
                  <div className="text-[0.62rem] uppercase font-extrabold tracking-[0.42em] text-[#0C6CC6]">
                    {card.label}
                  </div>
                  <div className="mt-3 text-lg font-light tracking-[0.08em] text-[#222325]">
                    {card.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          <HomeDevelop />
          <HomeAbout />
          <HomeLifecircle />
          <motion.section
            id="imin"
            initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ amount: 0.18 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full sm:px-0"
          >
            <HomeText className="w-screen rounded-none border-x-0" />
          </motion.section>
          <SiteFooter />
        </div>
      ) : null}
    </div>
  );
}
