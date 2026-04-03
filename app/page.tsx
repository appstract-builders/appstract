"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { startTransition, useEffect, useState } from "react";
import Brand from "./components/brand";
import HomeAbout from "./components/home/home-about";
import HomeBackground from "./components/home/home-background";
import HomeDevelop from "./components/home/home-develop";
import HomeLifecircle from "./components/home/home-lifecircle";
import HomeText from "./components/home/home-text";
import HomeWrapper from "./components/home/home-wrapper";
import Loader from "./components/loader";
import SiteFooter from "./components/site-footer";

const LOADER_DURATION_MS = 4400;

const bottomCards = [
  {
    label: "Loader",
    value: "Only on home",
  },
  {
    label: "Wrapper",
    value: "Magnetic filings field",
  },
  {
    label: "Navbar",
    value: "Appears on scroll",
  },
];

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 90,
    x: index === 0 ? -70 : index === 2 ? 70 : 0,
    rotate: index === 0 ? -8 : index === 2 ? 8 : -2,
    scale: 0.88,
    filter: "blur(14px)",
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      delay: index * 0.12,
      ease: [0.18, 1, 0.3, 1] as const,
    },
  }),
};

function HomeHeroSection() {
  const { scrollY } = useScroll();
  const brandOpacity = useSpring(useTransform(scrollY, [0, 36, 120], [1, 1, 0]), {
    stiffness: 150,
    damping: 30,
    mass: 0.7,
  });
  const brandY = useSpring(useTransform(scrollY, [0, 120], [0, -24]), {
    stiffness: 150,
    damping: 30,
    mass: 0.7,
  });

  return (
    <motion.section
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <HomeBackground />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.94, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex min-h-screen items-center justify-center px-6"
      >
        <motion.div
          style={{
            opacity: brandOpacity,
            y: brandY,
            willChange: "transform, opacity",
          }}
        >
          <Brand
            size="lg"
            className="scale-[1.08] opacity-[0.32] sm:scale-[1.16] lg:scale-[1.35]"
            planeClassName="drop-shadow-[0_0_34px_rgba(128,82,221,0.22)]"
            textClassName="text-[#A487FF]"
          />
        </motion.div>
      </motion.div>

      <div className="flex min-h-screen w-full items-center justify-center" />
    </motion.section>
  );
}

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

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
    <div className="relative min-h-screen overflow-hidden bg-[#020611] text-white">
      <AnimatePresence>{showLoader ? <Loader key="loader" /> : null}</AnimatePresence>

      {!showLoader ? (
        <div className="relative z-10 flex w-full flex-col items-center">
          <HomeWrapper>
            <HomeHeroSection />
          </HomeWrapper>

          <section
            id="products"
            className="scroll-mt-28 w-full max-w-5xl px-4 py-16 sm:scroll-mt-32 sm:px-0"
          >
            <div className="grid w-full gap-4 sm:grid-cols-3">
              {bottomCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.5 }}
                  className="rounded-[1.75rem] border border-white/10 bg-white/4.5 px-5 py-5 text-left backdrop-blur-sm"
                >
                  <div className="text-[0.62rem] uppercase tracking-[0.42em] text-cyan-100/60">
                    {card.label}
                  </div>
                  <div className="mt-3 text-lg font-light tracking-[0.08em] text-white">
                    {card.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <HomeDevelop />

          <motion.section
            id="imin"
            initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ amount: 0.18 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full pb-12 sm:px-0"
          >
            <HomeText className="w-screen rounded-none border-x-0" />
          </motion.section>

          <HomeAbout />

          <HomeLifecircle />

          <SiteFooter />
        </div>
      ) : null}
    </div>
  );
}
