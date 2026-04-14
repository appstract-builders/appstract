"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { CiLogin } from "react-icons/ci";
import { FaUserCircle, FaRegEdit } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";

import Brand from "./brand";

const navItems = [
  { label: "IMIN", href: "/imin", icon: FaRegEdit },
  { label: "ABOUT", href: "/about", icon: TfiWrite },
  { label: "PRODUCTS", href: "/products", icon: AiFillProduct },
];

type NavbarContentProps = {
  pathname: string;
};

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });

  return () => {
    window.removeEventListener("scroll", callback);
  };
}

function getScrollSnapshot() {
  return window.scrollY;
}

function getServerScrollSnapshot() {
  return 0;
}

function NavbarContent({ pathname }: NavbarContentProps) {
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const scrollY = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );
  const isHome = pathname === "/";
  const homeHero =
    typeof document === "undefined"
      ? null
      : (document.querySelector("[data-home-hero]") as HTMLElement | null);
  const homeRevealThreshold = homeHero
    ? Math.max(homeHero.offsetHeight * 0.58, window.innerHeight * 0.54, 260)
    : typeof window === "undefined"
      ? 260
      : Math.max(window.innerHeight * 0.54, 260);
  const showNavbar = !isHome || scrollY > homeRevealThreshold;
  const isOpen = openPathname === pathname;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: showNavbar ? 1 : 0,
        y: showNavbar ? 0 : -18,
        filter: showNavbar ? "blur(0px)" : "blur(8px)",
        pointerEvents: showNavbar ? "auto" : "none",
      }}
      transition={{
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden={!showNavbar}
      className="fixed left-1/2 top-4 z-40 w-[min(94vw,58rem)] -translate-x-1/2 sm:top-5"
    >
      <div className="flex items-center justify-between gap-3 rounded-full border border-white/12 bg-[#071122]/92 px-3 py-2.5 backdrop-blur-sm sm:gap-4 sm:px-4 sm:py-3">
        <Link
          href="/?from=logo"
          className="flex min-w-0 flex-none items-center justify-center"
        >
          <Brand size="sm" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setOpenPathname((current) => (current === pathname ? null : pathname))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 sm:h-11 sm:w-11"
          >
            <span className="relative flex h-4 w-5 flex-col items-center justify-center">
              <span
                className={`absolute block h-px w-4 bg-current transition-transform duration-300 sm:w-5 ${
                  isOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute block h-px w-4 bg-current transition-opacity duration-200 sm:w-5 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block h-px w-4 bg-current transition-transform duration-300 sm:w-5 ${
                  isOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </span>
          </button>

          <Link
            href="/account"
            aria-label="Crear cuenta o iniciar sesion"
            className="flex h-9 items-center gap-2 rounded-full border border-[#FF8904]/20 bg-[#FF8904]/10 px-3 text-[#ffebb8] transition hover:border-[#FF8904]/38 hover:bg-[#FF8904]/16 sm:h-11 sm:px-4"
          >
            <FaUserCircle className="h-4 w-4 shrink-0 sm:h-[1.05rem] sm:w-[1.05rem]" />
            <span className="hidden text-[0.68rem] uppercase tracking-[0.24em] sm:inline-block">
              Cuenta
            </span>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(10px)" }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-3 rounded-[1.75rem] border border-white/12 bg-[#071122]/96 p-3 backdrop-blur-sm"
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenPathname(null)}
                  className="flex min-h-11 items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-left text-sm uppercase tracking-[0.24em] text-white/78 transition-colors hover:bg-white/[0.08]"
                >
                  <span>{item.label}</span>
                  <span className="text-white/35">
                    <item.icon className="h-4 w-4" />
                  </span>
                </Link>
              ))}

              <Link
                href="/account"
                onClick={() => setOpenPathname(null)}
                className="flex min-h-11 items-center justify-between rounded-2xl border border-[#FF8904]/18 bg-[#FF8904]/10 px-4 py-3 text-left text-sm uppercase tracking-[0.24em] text-[#ffebb8] transition-colors hover:bg-[#FF8904]/16"
              >
                <span className="flex items-center gap-3">
                  <FaUserCircle className="h-[1.05rem] w-[1.05rem] shrink-0" />
                  <span>Cuenta</span>
                </span>
                <span className="text-[#d3c4ff]/45">
                  <CiLogin className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return <NavbarContent pathname={pathname} />;
}
