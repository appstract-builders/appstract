import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function AccountForgotPasswordPage() {
  return (
    <main className="app-min-h-screen bg-[#020611] px-4 pb-10 text-white sm:px-6 sm:pb-14">
      <div className="app-min-h-screen-nav-offset mx-auto flex w-full max-w-md items-center justify-center pt-24 sm:pt-28">
        <Card className="w-full border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Recuperar acceso</CardTitle>
            <CardDescription>
              Este flujo todavia no esta conectado. Por ahora contacta al equipo si necesitas ayuda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Link
              href="/account/login"
              className="block text-center text-[0.72rem] uppercase tracking-[0.3em] text-white/45 transition hover:text-white/72"
            >
              Volver a iniciar sesion
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
