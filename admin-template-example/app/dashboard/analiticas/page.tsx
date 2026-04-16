"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { BarChart3 } from "lucide-react"

export default function AnaliticasPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Analiticas">
        <Badge variant="secondary" className="text-xs">
          Beta
        </Badge>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Visitas totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usuarios unicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">456</p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasa de conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3.2%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">Trafico por dia</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          <Empty>
            <BarChart3 className="h-12 w-12 text-muted-foreground/50" />
            <EmptyTitle>No hay datos suficientes</EmptyTitle>
            <EmptyDescription>
              Los graficos apareceran cuando haya mas trafico en tu aplicacion.
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </div>
  )
}
