import Image from "next/image";
import type { ReactNode } from "react";

type BrandSize = "sm" | "md" | "lg";

type BrandProps = {
  className?: string;
  planeClassName?: string;
  textClassName?: string;
  textContent?: ReactNode;
  size?: BrandSize;
};

const sizeStyles: Record<BrandSize, { wrapper: string; plane: string; text: string }> = {
  sm: {
    wrapper: "gap-1",
    plane: "h-[34px] w-[30px] sm:h-[42px] sm:w-[36px]",
    text: "text-[1.05rem] tracking-[0.12em] sm:text-[1.35rem]",
  },
  md: {
    wrapper: "gap-1.5",
    plane: "h-[64px] w-[54px] sm:h-[84px] sm:w-[72px]",
    text: "text-[1.8rem] tracking-[0.12em] sm:text-[2.75rem]",
  },
  lg: {
    wrapper: "gap-1.5 sm:gap-2.5",
    plane: "h-[96px] w-[82px] sm:h-[140px] sm:w-[120px]",
    text: "text-[2.4rem] tracking-[0.12em] sm:text-[4.5rem]",
  },
};

export default function Brand({
  className = "",
  planeClassName = "",
  textClassName = "",
  textContent,
  size = "md",
}: BrandProps) {
  const styles = sizeStyles[size];

  return (
    <div className={`flex items-center ${styles.wrapper} ${className}`.trim()}>
      <div className={`relative shrink-0 ${styles.plane} ${planeClassName}`.trim()}>
        <Image
          src="/Appending.png"
          alt="Appending"
          fill
          priority
          className="object-contain [backface-visibility:hidden] [transform:translateZ(0)]"
          sizes="(max-width: 640px) 82px, 120px"
        />
      </div>

      <div
        className={`flex overflow-hidden font-light text-[#8052DD] ${styles.text} ${textClassName}`.trim()}
      >
        {textContent ?? (
          <>
            <span className="inline-block">p</span>
            <span className="inline-block">p</span>
            <span className="inline-block">e</span>
            <span className="inline-block">n</span>
            <span className="inline-block">d</span>
            <span className="inline-block">i</span>
            <span className="inline-block">n</span>
            <span className="inline-block">g</span>
          </>
        )}
      </div>
    </div>
  );
}
