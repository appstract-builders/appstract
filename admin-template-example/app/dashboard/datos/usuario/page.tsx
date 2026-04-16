"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, RefreshCw, MoreHorizontal } from "lucide-react"
import { DataTableHeader } from "@/components/data-table-header"

const usuarios = [
  {
    nombre: "Maria Garcia Lopez",
    correo: "maria.garcia@email...",
    estado_plan: "Activo",
    tipo_plan: "3 dias/semana",
    fecha_renovacion: "2026-04-15",
    telefono: "...",
  },
  {
    nombre: "Ana Sofia Martinez",
    correo: "ana.martinez@email...",
    estado_plan: "Activo",
    tipo_plan: "5 dias/semana",
    fecha_renovacion: "2026-04-01",
    telefono: "...",
  },
  {
    nombre: "Carlos Rodriguez",
    correo: "carlos.rdz@email.com",
    estado_plan: "Expirado",
    tipo_plan: "3 dias/semana",
    fecha_renovacion: "2026-03-10",
    telefono: "...",
  },
]

export default function DatosUsuarioPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Usuario">
        <Button variant="outline" size="icon" className="h-9 w-9">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          <Plus className="h-4 w-4" />
          Agregar
        </Button>
      </PageHeader>

      <div className="rounded-lg border bg-card">
        <DataTableHeader 
          searchPlaceholder="Search by nombre, telefono"
          infoTooltip="Busca por nombre o telefono del usuario"
        />
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>nombre</TableHead>
              <TableHead>correo</TableHead>
              <TableHead>estado_plan</TableHead>
              <TableHead>tipo_plan</TableHead>
              <TableHead>fecha_renovacion</TableHead>
              <TableHead>telefon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{usuario.nombre}</TableCell>
                <TableCell className="text-muted-foreground">{usuario.correo}</TableCell>
                <TableCell className="text-muted-foreground">{usuario.estado_plan}</TableCell>
                <TableCell className="text-muted-foreground">{usuario.tipo_plan}</TableCell>
                <TableCell className="text-muted-foreground">{usuario.fecha_renovacion}</TableCell>
                <TableCell className="text-muted-foreground">{usuario.telefono}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
