"use client";

import { motion, useReducedMotion } from "framer-motion";
import Brand from "../brand";

const sphereSizeClass = "h-[min(82vw,38rem)] w-[min(82vw,38rem)]";
const liquidBorderRadius = [
  "50% 50% 50% 50% / 50% 50% 50% 50%",
  "48% 52% 47% 53% / 56% 44% 53% 47%",
  "53% 47% 52% 48% / 45% 55% 44% 56%",
  "47% 53% 46% 54% / 53% 47% 56% 44%",
  "50% 50% 50% 50% / 50% 50% 50% 50%",
];

export default function HomeBackground() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(2,6,17,0.99)_0%,_rgba(5,10,24,0.97)_46%,_rgba(2,6,17,1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(158,228,255,0.12),transparent_18%),radial-gradient(circle_at_50%_52%,rgba(214,166,255,0.08),transparent_24%),radial-gradient(circle_at_50%_54%,rgba(255,137,4,0.08),transparent_26%)]" />
      <div className="absolute inset-y-0 left-0 w-[34vw] bg-[radial-gradient(circle_at_100%_50%,rgba(119,214,255,0.12),transparent_58%)] blur-3xl" />
      <div className="absolute inset-y-0 right-0 w-[34vw] bg-[radial-gradient(circle_at_0%_50%,rgba(236,150,255,0.12),transparent_58%)] blur-3xl" />

      <motion.div
        className={`absolute left-1/2 top-1/2 ${sphereSizeClass} -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(149,224,255,0.24),rgba(149,224,255,0.09)_32%,rgba(255,137,4,0.05)_48%,transparent_72%)] blur-3xl`}
        animate={
          shouldReduceMotion
            ? { opacity: 0.74, scale: 1 }
            : {
                opacity: [0.56, 0.82, 0.68, 0.78, 0.74],
                scaleX: [1, 0.964, 1.036, 0.986, 1],
                scaleY: [1, 1.078, 0.976, 1.042, 1],
                y: [4, -16, -7, -12, 0],
                borderRadius: liquidBorderRadius,
              }
        }
        transition={{
          duration: 10.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute left-1/2 top-1/2 ${sphereSizeClass} -translate-x-1/2 -translate-y-1/2`}
        animate={
          shouldReduceMotion
            ? { scale: 1, borderRadius: liquidBorderRadius[0] }
            : {
                scaleX: [1, 0.974, 1.024, 0.99, 1],
                scaleY: [1, 1.06, 0.984, 1.034, 1],
                y: [0, -16, -6, -11, 0],
                rotate: [0, -1.6, 0.9, -0.5, 0],
                borderRadius: liquidBorderRadius,
              }
        }
        transition={{
          duration: 10.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.13),rgba(255,255,255,0.045)_48%,rgba(255,137,4,0.04)_66%,transparent_82%)] backdrop-blur-[20px]" />

        <motion.div
          className="absolute inset-[5%] rounded-[inherit] opacity-58 [mask-image:radial-gradient(circle_at_center,black_0%,black_54%,rgba(0,0,0,0.62)_68%,transparent_84%)] blur-[3px]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 40% 38%, rgba(255,255,255,0.14), transparent 13%),
              radial-gradient(circle at 62% 36%, rgba(128,220,255,0.1), transparent 17%),
              radial-gradient(circle at 55% 60%, rgba(255,137,4,0.06), transparent 15%),
              radial-gradient(circle at 47% 54%, rgba(113,172,255,0.06), transparent 20%),
              conic-gradient(
                from 40deg at 50% 50%,
                rgba(117,221,255,0.015) 0deg,
                rgba(117,221,255,0.05) 92deg,
                rgba(255,137,4,0.028) 180deg,
                rgba(214,173,255,0.06) 286deg,
                rgba(117,221,255,0.015) 360deg
              )
            `,
          }}
          animate={
            shouldReduceMotion
              ? { rotate: 0, opacity: 0.5 }
              : {
                  rotate: [0, 180, 360],
                  opacity: [0.42, 0.64, 0.5, 0.6, 0.42],
                  scaleX: [1, 1.026, 0.992, 1.014, 1],
                  scaleY: [1, 0.982, 1.02, 0.99, 1],
                  x: [0, 8, -6, 4, 0],
                  y: [0, -6, 5, -3, 0],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute left-[42%] top-[24%] h-[18%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_42%_42%,rgba(255,255,255,0.38),rgba(255,224,199,0.12)_32%,rgba(255,255,255,0.04)_58%,transparent_78%)] blur-2xl"
          animate={
            shouldReduceMotion
              ? { opacity: 0.34 }
              : {
                  opacity: [0.16, 0.42, 0.24],
                  x: [-6, 14, -3],
                  y: [0, -6, 3],
                  scaleX: [1, 0.92, 1.08, 1],
                  scaleY: [1, 1.08, 0.97, 1],
                }
          }
          transition={{
            duration: 7.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute left-[23%] top-[29%] h-[11%] w-[11%] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.54),rgba(162,232,255,0.18)_44%,rgba(255,137,4,0.08)_62%,transparent_76%)] blur-lg"
          animate={
            shouldReduceMotion
              ? { opacity: 0.34 }
              : {
                  opacity: [0.14, 0.38, 0.2],
                  scale: [0.9, 1.16, 0.97],
                  x: [-4, 8, -2],
                  y: [0, 6, -3],
                }
          }
          transition={{
            duration: 6.9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-[-3%] rounded-[inherit] bg-[radial-gradient(circle_at_50%_50%,transparent_60%,rgba(141,225,255,0.055)_74%,rgba(255,137,4,0.025)_84%,transparent_94%)] blur-3xl" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_10px_22px_rgba(255,255,255,0.06),inset_0_-20px_42px_rgba(2,6,17,0.14),inset_0_-10px_16px_rgba(255,137,4,0.025)]" />
      </motion.div>

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 z-20 ${sphereSizeClass} -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="absolute inset-[26%] flex items-center justify-center">
          <Brand
            size="lg"
            className="relative z-10 scale-[0.64] sm:scale-[0.68] lg:scale-[0.76]"
            planeClassName="drop-shadow-[0_0_32px_rgba(120,225,255,0.2)]"
            textClassName="text-[#FF8904] drop-shadow-[0_0_24px_rgba(255,137,4,0.26)]"
          />
        </div>
      </div>
    </>
  );
}
