"use client";

import type { ReactNode } from "react";

type HomeWrapperProps = {
  children: ReactNode;
};

export default function HomeWrapper({ children }: HomeWrapperProps) {
  return (
    <div className="app-min-h-screen relative w-full overflow-x-hidden">
      <main className="app-min-h-screen relative z-10 flex w-full flex-col items-center">
        {children}
      </main>
    </div>
  );
}
