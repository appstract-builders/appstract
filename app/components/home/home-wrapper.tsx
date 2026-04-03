"use client";

import type { ReactNode } from "react";

type HomeWrapperProps = {
  children: ReactNode;
};

export default function HomeWrapper({ children }: HomeWrapperProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center">
        {children}
      </main>
    </div>
  );
}
