"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Zap, Plus } from "lucide-react"

export default function AutomatizacionesPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Automatizaciones"
        description="Configura flujos automaticos para tu aplicacion."
      >
        <Button className="gap-2 bg-foreground text-background">
          <Plus className="h-4 w-4" />
          Nueva Automatizacion
        </Button>
      </PageHeader>

      <Card className="border border-dashed">
        <CardContent className="p-16">
          <Empty>
            <Zap className="h-12 w-12 text-muted-foreground/50" />
            <EmptyTitle>Sin automatizaciones</EmptyTitle>
            <EmptyDescription className="max-w-md mx-auto">
              Crea automatizaciones para ejecutar acciones automaticamente cuando
              ocurran ciertos eventos en tu aplicacion.
            </EmptyDescription>
            <Button className="mt-4 gap-2 bg-foreground text-background">
              <Plus className="h-4 w-4" />
              Crear Automatizacion
            </Button>
          </Empty>
        </CardContent>
      </Card>
    </div>
  )
}
