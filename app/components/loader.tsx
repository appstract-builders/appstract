"use client";

import { motion, type Variants } from "framer-motion";
import Brand from "./brand";

const tailLetters = Array.from("ppending");

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.82,
      staggerChildren: 0.06,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020611]"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(14px)",
        transition: {
          duration: 0.45,
          ease: "easeInOut",
        },
      }}
    >
      <div className="relative flex flex-col items-center gap-7 px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div
            initial={{
              opacity: 0,
              y: 280,
              x: -18,
              rotate: -20,
              scale: 0.62,
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Brand
              size="lg"
              planeClassName="drop-shadow-[0_18px_45px_rgba(56,189,248,0.3)]"
              textContent={
                <motion.div
                  className="flex"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {tailLetters.map((letter, index) => (
                    <motion.span
                      key={`${letter}-${index}`}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              }
            />
          </motion.div>
        </div>

        <div className="h-px w-44 overflow-hidden rounded-full bg-white/10 sm:w-56">
          <motion.div
            className="h-full w-1/2 bg-linear-to-r from-transparent via-cyan-300 to-fuchsia-300"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 1.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
