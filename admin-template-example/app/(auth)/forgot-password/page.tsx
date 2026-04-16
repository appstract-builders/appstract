"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#c4856c]/10 flex items-center justify-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#c4856c] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          </div>
          <CardTitle className="text-xl font-semibold">Recuperar contrasena</CardTitle>
          <CardDescription>
            Ingresa tu correo electronico y te enviaremos un enlace para restablecer tu contrasena
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Correo electronico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="h-10"
                />
              </Field>
            </FieldGroup>
            <Button
              type="submit"
              className="w-full h-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
            >
              Enviar enlace de recuperacion
            </Button>
          </form>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio de sesion
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
