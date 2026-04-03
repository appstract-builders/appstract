import Image from "next/image";

import IminParallax from "../components/imin/imin-parallax";
import IminTutorial from "../components/imin/imin-tutorial";
import SiteFooter from "../components/site-footer";

export default function IminPage() {
  return (
    <main className="min-h-screen bg-[#020611] text-white">
      <section className="relative overflow-hidden border-b border-white/8 px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(128,82,221,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(103,232,249,0.08),transparent_28%)]" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#8052DD]/72">
                IMIN
              </p>
              <h1 className="mt-4 text-4xl font-light tracking-[0.08em] text-white sm:text-6xl">
                El editor visual que mantiene vivo el sitio de tus clientes.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
                IMIN funciona como una capa mensual de cambio visual: permite
                actualizar textos, imagenes y presentacion para que la web del
                cliente no se quede estatica despues del lanzamiento.
              </p>
            </div>

            <div className="relative mx-auto h-[18rem] w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,13,26,0.96),rgba(5,8,18,0.98))] shadow-[0_24px_80px_rgba(2,8,23,0.28)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,82,221,0.16),transparent_44%)]" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative h-32 w-32 sm:h-36 sm:w-36">
                  <Image
                    src="/IMIN.png"
                    alt="IMIN logo"
                    fill
                    className="object-contain drop-shadow-[0_20px_40px_rgba(128,82,221,0.2)]"
                    sizes="(max-width: 640px) 128px, 144px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <IminParallax />
        <IminTutorial />
      </div>

      <SiteFooter />
    </main>
  );
}
