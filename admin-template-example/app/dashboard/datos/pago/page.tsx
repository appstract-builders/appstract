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

const pagos = [
  {
    alumno_id: "69c1d53066e03d26...",
    alumno_nombre: "Maria Garcia Lopez",
    monto: 1200,
    estatus_pago: "Exitoso",
    fecha_pago: "2026-03-15",
    concep: "...",
  },
  {
    alumno_id: "69c1d53066e03d26...",
    alumno_nombre: "Ana Sofia Martinez",
    monto: 1800,
    estatus_pago: "Exitoso",
    fecha_pago: "2026-03-01",
    concep: "...",
  },
  {
    alumno_id: "69c1d53066e03d26...",
    alumno_nombre: "Carlos Rodriguez",
    monto: 1200,
    estatus_pago: "Pendiente",
    fecha_pago: "2026-03-20",
    concep: "...",
  },
]

export default function DatosPagoPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Pago">
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
              <TableHead>monto</TableHead>
              <TableHead>estatus_pago</TableHead>
              <TableHead>fecha_pago</TableHead>
              <TableHead>concep</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagos.map((pago, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-muted-foreground">{pago.alumno_id}</TableCell>
                <TableCell className="font-medium">{pago.alumno_nombre}</TableCell>
                <TableCell className="text-muted-foreground">{pago.monto}</TableCell>
                <TableCell className="text-muted-foreground">{pago.estatus_pago}</TableCell>
                <TableCell className="text-muted-foreground">{pago.fecha_pago}</TableCell>
                <TableCell className="text-muted-foreground">{pago.concep}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
