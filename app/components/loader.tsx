"use client";

import { motion, type Variants } from "framer-motion";
import Brand from "./brand";

const tailLetters = [
  { letter: "a", className: "text-[#589bf9]" },
  { letter: "p", className: "text-[#589bf9]" },
  { letter: "p", className: "text-[#589bf9]" },
  { letter: "s", className: "text-[#414141]" },
  { letter: "t", className: "text-[#414141]" },
  { letter: "r", className: "text-[#414141]" },
  { letter: "a", className: "text-[#414141]" },
  { letter: "c", className: "text-[#414141]" },
  { letter: "t", className: "text-[#414141]" },
];

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
    filter: "blur(10px)",
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
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-100"
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
                  {tailLetters.map(({ letter, className }, index) => (
                    <motion.span
                      key={`${letter}-${index}`}
                      variants={letterVariants}
                      className={`inline-block ${className}`}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              }
            />
          </motion.div>
        </div>

        <div className="h-0.5 overflow-hidden rounded-full bg-slate-100 w-64 md:w-114 bottom-0 right-0 absolute">
          <motion.div
            className="h-full w-1/3 bg-linear-to-r from-transparent via-[#589bf9] to-[#525252]"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
