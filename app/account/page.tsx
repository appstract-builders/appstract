import Link from "next/link";

import Brand from "../components/brand";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#020611] px-4 pb-10 text-white sm:px-6 sm:pb-14">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center pt-24 sm:pt-28">
        <section className="w-full rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,7,16,0.98))] px-5 py-8 shadow-[0_24px_90px_rgba(2,8,23,0.28)] sm:px-8 sm:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Brand size="md" />
              <p className="mt-8 text-[0.7rem] uppercase tracking-[0.42em] text-[#8052DD]/72">
                Account
              </p>
              <h1 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
                Crear cuenta o iniciar sesion.
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 tracking-[0.04em] text-white/68 sm:text-base">
                Este apartado ya quedo listo como entrada de autenticacion para
                Appending. El siguiente paso natural es conectar aqui el flujo
                real de acceso y registro.
              </p>
            </div>

            <div className="grid gap-3 sm:min-w-[19rem]">
              <button
                type="button"
                className="rounded-full border border-[#8052DD]/24 bg-[#8052DD]/12 px-5 py-3 text-sm uppercase tracking-[0.26em] text-[#d3c4ff]"
              >
                Crear cuenta
              </button>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm uppercase tracking-[0.26em] text-white/82"
              >
                Iniciar sesion
              </button>
              <Link
                href="/"
                className="pt-3 text-[0.72rem] uppercase tracking-[0.3em] text-white/45 transition hover:text-white/72"
              >
                Volver al home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
