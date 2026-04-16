"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Copy, Eye, EyeOff, RefreshCw, Plus, Code } from "lucide-react"
import { useState } from "react"

export default function APIPage() {
  const [showKey, setShowKey] = useState(false)

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="API"
        description="Administra las claves de API y endpoints de tu aplicacion."
      >
        <Button className="gap-2 bg-foreground text-background">
          <Plus className="h-4 w-4" />
          Nueva Clave API
        </Button>
      </PageHeader>

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">Claves de API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <FieldGroup>
                <Field>
                  <FieldLabel>Clave de produccion</FieldLabel>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showKey ? "text" : "password"}
                        value="sk_live_abc123xyz789..."
                        readOnly
                        className="pr-20 font-mono"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setShowKey(!showKey)}
                        >
                          {showKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </Field>
              </FieldGroup>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700">Activa</Badge>
        </CardContent>
      </Card>

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">Endpoints Disponibles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { method: "GET", path: "/api/usuarios", description: "Lista usuarios" },
              { method: "POST", path: "/api/usuarios", description: "Crear usuario" },
              { method: "GET", path: "/api/clases", description: "Lista clases" },
              { method: "GET", path: "/api/reservas", description: "Lista reservas" },
              { method: "POST", path: "/api/reservas", description: "Crear reserva" },
              { method: "GET", path: "/api/pagos", description: "Lista pagos" },
            ].map((endpoint, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      endpoint.method === "GET"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }
                  >
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm font-mono">{endpoint.path}</code>
                </div>
                <span className="text-sm text-muted-foreground">
                  {endpoint.description}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">Documentacion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Code className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">API Reference</p>
              <p className="text-sm text-muted-foreground">
                Consulta la documentacion completa de la API
              </p>
            </div>
            <Button variant="outline">Ver Documentacion</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
