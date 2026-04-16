"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Bot, Plus } from "lucide-react"

export default function AgentesPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Agentes"
        description="Configura agentes de IA para automatizar tareas."
      >
        <Button className="gap-2 bg-foreground text-background">
          <Plus className="h-4 w-4" />
          Nuevo Agente
        </Button>
      </PageHeader>

      <Card className="border border-dashed">
        <CardContent className="p-16">
          <Empty>
            <Bot className="h-12 w-12 text-muted-foreground/50" />
            <EmptyTitle>Sin agentes configurados</EmptyTitle>
            <EmptyDescription className="max-w-md mx-auto">
              Crea tu primer agente de IA para automatizar tareas repetitivas y
              mejorar la experiencia de tus usuarios.
            </EmptyDescription>
            <Button className="mt-4 gap-2 bg-foreground text-background">
              <Plus className="h-4 w-4" />
              Crear Agente
            </Button>
          </Empty>
        </CardContent>
      </Card>
    </div>
  )
}
