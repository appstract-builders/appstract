"use client";

import type { MotionValue } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import Brand from "../brand";
import HomeGalaxyBubble from "./home-galaxy-bubble";

const bubbleFrameClass =
  "h-[clamp(15rem,54vw,16.4rem)] w-[clamp(15rem,54vw,16.4rem)] min-[390px]:h-[clamp(16rem,56vw,18rem)] min-[390px]:w-[clamp(16rem,56vw,18rem)] min-[480px]:h-[clamp(18rem,58vw,21rem)] min-[480px]:w-[clamp(18rem,58vw,21rem)] sm:h-[clamp(21rem,58vw,29rem)] sm:w-[clamp(21rem,58vw,29rem)] md:h-[clamp(28rem,62vw,38rem)] md:w-[clamp(28rem,62vw,38rem)] lg:h-[min(69vh,42rem)] lg:w-[min(69vh,42rem)]";

type HomeBackgroundProps = {
  scrollProgress?: MotionValue<number>;
};

export default function HomeBackground({ scrollProgress }: HomeBackgroundProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(2,6,17,0.99)_0%,_rgba(5,10,24,0.97)_46%,_rgba(2,6,17,1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(78,118,141,0.09),transparent_18%),radial-gradient(circle_at_50%_56%,rgba(98,112,124,0.08),transparent_24%),radial-gradient(circle_at_16%_34%,rgba(255,137,4,0.035),transparent_18%),radial-gradient(circle_at_84%_28%,rgba(101,113,125,0.06),transparent_22%)]" />
      <div className="absolute inset-y-0 left-0 w-[42vw] bg-[radial-gradient(circle_at_100%_50%,rgba(69,110,134,0.1),transparent_60%)] blur-3xl" />
      <div className="absolute inset-y-0 right-0 w-[42vw] bg-[radial-gradient(circle_at_0%_50%,rgba(106,116,126,0.08),transparent_60%)] blur-3xl" />
      <div className="absolute inset-x-[-12%] top-1/2 h-[48vh] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(66,109,133,0.05),rgba(255,137,4,0.025)_34%,transparent_70%)] blur-3xl" />

      <motion.div
        className="absolute inset-x-[-10%] top-1/2 z-0 h-[54vh] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(72,116,140,0.07),rgba(97,109,121,0.05)_28%,rgba(255,137,4,0.022)_48%,transparent_68%)] blur-3xl"
        animate={
          shouldReduceMotion
            ? { opacity: 0.64, scale: 1 }
            : {
                opacity: [0.36, 0.46, 0.4, 0.44],
                scaleX: [0.996, 1.006, 1, 1.008],
                scaleY: [1, 1.01, 0.996, 1.004],
                y: [2, -3, -1, 0],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <HomeGalaxyBubble scrollProgress={scrollProgress} />

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 z-20 ${bubbleFrameClass} -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="absolute inset-[20%] min-[390px]:inset-[19%] min-[480px]:inset-[18.5%] sm:inset-[18%] md:inset-[16.8%] lg:inset-[14.8%] xl:inset-[14.2%] flex items-center justify-center">
          <Brand
            size="lg"
            className="relative z-10 origin-center gap-1 sm:gap-2 lg:gap-1.5 scale-[0.42] min-[390px]:scale-[0.47] min-[480px]:scale-[0.54] sm:scale-[0.64] md:scale-[0.76] lg:scale-[0.8] xl:scale-[0.86]"
            planeClassName="[filter:drop-shadow(0_0_18px_rgba(255,137,4,0.46))_drop-shadow(0_0_34px_rgba(150,215,241,0.22))]"
            textClassName="tracking-[0.08em] sm:tracking-[0.1em] lg:tracking-[0.08em] text-[#FF8904] drop-shadow-[0_0_24px_rgba(255,137,4,0.26)]"
          />
        </div>
      </div>
    </>
  );
}
