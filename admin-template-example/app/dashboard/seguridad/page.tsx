"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Shield, Lock, Plus } from "lucide-react"
import Link from "next/link"

const entities = [
  { name: "Usuario", rls: false },
  { name: "Clase", rls: false },
  { name: "Reserva", rls: false },
  { name: "Pago", rls: false },
]

export default function SeguridadPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Seguridad"
        description="Configura las reglas de seguridad y acceso de tu aplicacion."
      />

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Reglas de Seguridad por Entidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entidad</TableHead>
                <TableHead>Estado RLS</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entities.map((entity) => (
                <TableRow key={entity.name}>
                  <TableCell className="font-medium">{entity.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        entity.rls
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {entity.rls ? "Habilitado" : "Publico"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/seguridad/${entity.name.toLowerCase()}`}>
                        Configurar
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Acceso Publico por Defecto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-green-100">
              <Lock className="h-5 w-5 text-green-700" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Acceso Publico</p>
              <p className="text-sm text-muted-foreground mt-1">
                Actualmente todos los usuarios pueden acceder a todos los registros en esta
                entidad. No hay restricciones de acceso.
              </p>
            </div>
            <Button className="gap-2 bg-foreground text-background">
              <Plus className="h-4 w-4" />
              Crear Reglas de Acceso
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="gap-2 bg-foreground text-background">
          <Shield className="h-4 w-4" />
          Guardar Reglas de Seguridad
        </Button>
      </div>
    </div>
  )
}
