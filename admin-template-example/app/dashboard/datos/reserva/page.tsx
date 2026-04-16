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

const reservas = [
  {
    alumno_id: "69c1d53066e03d26...",
    alumno_nombre: "Maria Garcia Lopez",
    clase_id: "69c1d53066e03d26...",
    clase_nombre: "Pilates Reformer - Lu...",
    fecha_clase: "2026-03-23",
    sem: "...",
  },
  {
    alumno_id: "69c1d53066e03d26...",
    alumno_nombre: "Maria Garcia Lopez",
    clase_id: "69c1d53066e03d26...",
    clase_nombre: "Pilates Mat - Miercol...",
    fecha_clase: "2026-03-25",
    sem: "...",
  },
  {
    alumno_id: "69c1d53066e03d26...",
    alumno_nombre: "Ana Sofia Martinez",
    clase_id: "69c1d53066e03d26...",
    clase_nombre: "Pilates Reformer - Lu...",
    fecha_clase: "2026-03-23",
    sem: "...",
  },
  {
    alumno_id: "69c1d53066e03d26...",
    alumno_nombre: "Ana Sofia Martinez",
    clase_id: "69c1d53066e03d26...",
    clase_nombre: "Pilates Mat - Miercol...",
    fecha_clase: "2026-03-25",
    sem: "...",
  },
  {
    alumno_id: "69c1d53066e03d26...",
    alumno_nombre: "Ana Sofia Martinez",
    clase_id: "69c1d53066e03d26...",
    clase_nombre: "Pilates Tower - Viern...",
    fecha_clase: "2026-03-27",
    sem: "...",
  },
]

export default function DatosReservaPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Reserva">
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
          searchPlaceholder="Search by alumno_id, alumno_n"
          infoTooltip="Busca por ID o nombre del alumno"
        />
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>alumno_id</TableHead>
              <TableHead>alumno_nombre</TableHead>
              <TableHead>clase_id</TableHead>
              <TableHead>clase_nombre</TableHead>
              <TableHead>fecha_clase</TableHead>
              <TableHead>sem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservas.map((reserva, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-muted-foreground">{reserva.alumno_id}</TableCell>
                <TableCell className="font-medium">{reserva.alumno_nombre}</TableCell>
                <TableCell className="font-mono text-muted-foreground">{reserva.clase_id}</TableCell>
                <TableCell className="text-muted-foreground">{reserva.clase_nombre}</TableCell>
                <TableCell className="text-muted-foreground">{reserva.fecha_clase}</TableCell>
                <TableCell className="text-muted-foreground">{reserva.sem}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
