"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      return;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);

  return null;
}
