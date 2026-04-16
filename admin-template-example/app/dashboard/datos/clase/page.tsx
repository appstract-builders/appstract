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

const clases = [
  {
    nombre: "Pilates Reformer - Lu...",
    dia_semana: "Lunes",
    hora: "07:00",
    cupo_maximo: 10,
    instructor: "Laura Sanchez",
    tipo_c: "...",
  },
  {
    nombre: "Pilates Mat - Miercol...",
    dia_semana: "Miercoles",
    hora: "09:00",
    cupo_maximo: 12,
    instructor: "Patricia Flores",
    tipo_c: "...",
  },
  {
    nombre: "Pilates Tower - Viern...",
    dia_semana: "Viernes",
    hora: "18:00",
    cupo_maximo: 8,
    instructor: "Laura Sanchez",
    tipo_c: "...",
  },
]

export default function DatosClasePage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Clase">
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
          searchPlaceholder="Search by nombre, hora, instruc"
          infoTooltip="Busca por nombre, hora o instructor"
        />
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>nombre</TableHead>
              <TableHead>dia_semana</TableHead>
              <TableHead>hora</TableHead>
              <TableHead>cupo_maximo</TableHead>
              <TableHead>instructor</TableHead>
              <TableHead>tipo_c</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clases.map((clase, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{clase.nombre}</TableCell>
                <TableCell className="text-muted-foreground">{clase.dia_semana}</TableCell>
                <TableCell className="text-muted-foreground">{clase.hora}</TableCell>
                <TableCell className="text-muted-foreground">{clase.cupo_maximo}</TableCell>
                <TableCell className="text-muted-foreground">{clase.instructor}</TableCell>
                <TableCell className="text-muted-foreground">{clase.tipo_c}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
