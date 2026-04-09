import IminMark from "../components/imin/imin-mark";
import IminParallax from "../components/imin/imin-parallax";
import IminTutorial from "../components/imin/imin-tutorial";
import SiteFooter from "../components/site-footer";

export default function IminPage() {
  return (
    <main className="app-min-h-screen bg-[#020611] text-white">
      <section className="relative overflow-hidden border-b border-white/8 px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(128,82,221,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(103,232,249,0.08),transparent_28%)]" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#FF8904]/72">
                Tu web siempre fresca.
              </p>
              <h1 className="mt-4 text-4xl font-light tracking-[0.08em] text-white sm:text-6xl">
                IMIN
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
                Actualiza textos, imagenes y cuida de la presentacion de tu sitio web para que tus
                clientes no se queden desactualizados.
              </p>
            </div>

            <div className="relative mx-auto h-72 w-full max-w-88 overflow-hidden rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,13,26,0.96),rgba(5,8,18,0.98))] shadow-slate-900/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,82,221,0.16),transparent_44%)]" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <IminMark
                  className="h-32 w-32 sm:h-36 sm:w-36"
                  imageClassName="drop-shadow-slate-900/40"
                />
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
