"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plug, Mail, CreditCard, MessageSquare, Calendar, Database } from "lucide-react"

const integraciones = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Procesa pagos y suscripciones",
    icon: CreditCard,
    connected: true,
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Envia correos transaccionales",
    icon: Mail,
    connected: false,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Notificaciones en tiempo real",
    icon: MessageSquare,
    connected: false,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sincroniza eventos y reservas",
    icon: Calendar,
    connected: false,
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Base de datos y autenticacion",
    icon: Database,
    connected: true,
  },
]

export default function IntegracionesPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Integraciones"
        description="Conecta tu aplicacion con servicios externos."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {integraciones.map((integration) => (
          <Card key={integration.id} className="border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <integration.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{integration.name}</p>
                      {integration.connected && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Conectado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant={integration.connected ? "outline" : "default"}
                  size="sm"
                  className={
                    integration.connected
                      ? ""
                      : "bg-foreground text-background"
                  }
                >
                  {integration.connected ? "Configurar" : "Conectar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
