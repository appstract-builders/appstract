"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#c4856c]/10 flex items-center justify-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#c4856c] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          </div>
          <CardTitle className="text-xl font-semibold">Crear cuenta</CardTitle>
          <CardDescription>
            Completa el formulario para registrarte en el panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Juan"
                    className="h-10"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Perez"
                    className="h-10"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Correo electronico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="h-10"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Contrasena</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="h-10"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirmar contrasena</FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  className="h-10"
                />
              </Field>
            </FieldGroup>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-1" />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-relaxed"
              >
                Acepto los{" "}
                <Link href="#" className="text-foreground hover:underline">
                  terminos y condiciones
                </Link>{" "}
                y la{" "}
                <Link href="#" className="text-foreground hover:underline">
                  politica de privacidad
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
            >
              Crear cuenta
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                o registrate con
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full h-10 gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full h-10 gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </Button>
            <Button variant="outline" className="w-full h-10 gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="text-foreground font-medium hover:underline"
            >
              Iniciar sesion
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
