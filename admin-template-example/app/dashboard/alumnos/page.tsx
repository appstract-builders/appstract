"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { DataTableHeader } from "@/components/data-table-header"

const alumnos = [
  {
    id: 1,
    nombre: "Maria Garcia Lopez",
    correo: "maria.garcia@email.com",
    plan: "3 dias/semana",
    estado: "Activo",
    reservasSemana: "2 / 3",
    renovacion: "15 abr 2026",
  },
  {
    id: 2,
    nombre: "Ana Sofia Martinez",
    correo: "ana.martinez@email.com",
    plan: "5 dias/semana",
    estado: "Activo",
    reservasSemana: "3 / 5",
    renovacion: "1 abr 2026",
  },
  {
    id: 3,
    nombre: "Carlos Rodriguez",
    correo: "carlos.rdz@email.com",
    plan: "3 dias/semana",
    estado: "Expirado",
    reservasSemana: "0 / 3",
    renovacion: "10 mar 2026",
  },
]

export default function AlumnosPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Alumnos"
        description="3 alumnos registrados"
      >
        <Button className="gap-2 bg-[#c4856c] hover:bg-[#b07560] text-white">
          <Plus className="h-4 w-4" />
          Nuevo Alumno
        </Button>
      </PageHeader>

      <div className="rounded-lg border bg-card">
        <DataTableHeader 
          searchPlaceholder="Buscar por nombre o correo..."
          showFilters={false}
        />
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Reservas Semana</TableHead>
              <TableHead>Renovacion</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alumnos.map((alumno) => (
              <TableRow key={alumno.id}>
                <TableCell className="font-medium">{alumno.nombre}</TableCell>
                <TableCell className="text-muted-foreground">{alumno.correo}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {alumno.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={alumno.estado === "Activo" ? "default" : "destructive"}
                    className={
                      alumno.estado === "Activo"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {alumno.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{alumno.reservasSemana}</TableCell>
                <TableCell className="text-muted-foreground">{alumno.renovacion}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
