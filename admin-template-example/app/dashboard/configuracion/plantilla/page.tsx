"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"

export default function PlantillaPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Plantilla de App" />

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">Informacion de la Plantilla</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel>Nombre de la Plantilla</FieldLabel>
              <Input defaultValue="Sistema de Reservas de Pilates" />
            </Field>
            <Field>
              <FieldLabel>Categoria</FieldLabel>
              <Input defaultValue="Fitness & Wellness" />
            </Field>
            <Field>
              <FieldLabel>Descripcion</FieldLabel>
              <Textarea
                rows={4}
                defaultValue="Un sistema completo para gestionar reservas, alumnos, clases y pagos de un estudio de Pilates."
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">Publicar como Plantilla</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Comparte tu aplicacion como una plantilla para que otros usuarios puedan usarla como
            punto de partida para sus propios proyectos.
          </p>
          <div className="flex items-center gap-3">
            <Button className="bg-foreground text-background">
              Publicar Plantilla
            </Button>
            <Badge variant="secondary" className="text-xs">
              Proximamente
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
