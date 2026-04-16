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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

const reservas = [
  {
    id: 1,
    alumno: "Maria Garcia Lopez",
    clase: "Pilates Reformer - Lunes 7:00 AM",
    fecha: "23 mar 2026",
    semana: "2026-W13",
    estado: "Confirmada",
  },
  {
    id: 2,
    alumno: "Maria Garcia Lopez",
    clase: "Pilates Mat - Miercoles 9:00 AM",
    fecha: "25 mar 2026",
    semana: "2026-W13",
    estado: "Confirmada",
  },
  {
    id: 3,
    alumno: "Ana Sofia Martinez",
    clase: "Pilates Reformer - Lunes 7:00 AM",
    fecha: "23 mar 2026",
    semana: "2026-W13",
    estado: "Confirmada",
  },
  {
    id: 4,
    alumno: "Ana Sofia Martinez",
    clase: "Pilates Mat - Miercoles 9:00 AM",
    fecha: "25 mar 2026",
    semana: "2026-W13",
    estado: "Confirmada",
  },
  {
    id: 5,
    alumno: "Ana Sofia Martinez",
    clase: "Pilates Tower - Viernes 6:00 PM",
    fecha: "27 mar 2026",
    semana: "2026-W13",
    estado: "Confirmada",
  },
]

export default function ReservasPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Reservas"
        description="5 reservas totales"
      >
        <Button className="gap-2 bg-[#c4856c] hover:bg-[#b07560] text-white">
          <Plus className="h-4 w-4" />
          Nueva Reserva
        </Button>
      </PageHeader>

      <div className="rounded-lg border bg-card">
        <div className="px-4 py-4">
          <Select defaultValue="todos">
            <SelectTrigger className="w-48 h-9">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Alumno</TableHead>
              <TableHead>Clase</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Semana</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservas.map((reserva) => (
              <TableRow key={reserva.id}>
                <TableCell className="font-medium">{reserva.alumno}</TableCell>
                <TableCell className="text-muted-foreground">{reserva.clase}</TableCell>
                <TableCell className="text-muted-foreground">{reserva.fecha}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {reserva.semana}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select defaultValue={reserva.estado.toLowerCase()}>
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmada">Confirmada</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
