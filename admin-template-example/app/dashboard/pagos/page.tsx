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

const pagos = [
  {
    id: 1,
    alumno: "Maria Garcia Lopez",
    concepto: "Plan 3 dias/semana - Marzo 2026",
    monto: "$1,200 MXN",
    metodo: "Tarjeta",
    estatus: "Exitoso",
    fecha: "15 mar 2026",
  },
  {
    id: 2,
    alumno: "Ana Sofia Martinez",
    concepto: "Plan 5 dias/semana - Marzo 2026",
    monto: "$1,800 MXN",
    metodo: "Transferencia",
    estatus: "Exitoso",
    fecha: "1 mar 2026",
  },
  {
    id: 3,
    alumno: "Carlos Rodriguez",
    concepto: "Plan 3 dias/semana - Abril 2026",
    monto: "$1,200 MXN",
    metodo: "Efectivo",
    estatus: "Pendiente",
    fecha: "20 mar 2026",
  },
]

export default function PagosPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Pagos y Suscripciones"
        description="Total recaudado: $3,000 MXN"
      >
        <Button className="gap-2 bg-[#c4856c] hover:bg-[#b07560] text-white">
          <Plus className="h-4 w-4" />
          Registrar Pago
        </Button>
      </PageHeader>

      <div className="rounded-lg border bg-card">
        <div className="px-4 py-4">
          <Select defaultValue="todos">
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="exitoso">Exitoso</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="fallido">Fallido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Alumno</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Metodo</TableHead>
              <TableHead>Estatus</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagos.map((pago) => (
              <TableRow key={pago.id}>
                <TableCell className="font-medium">{pago.alumno}</TableCell>
                <TableCell className="text-muted-foreground">{pago.concepto}</TableCell>
                <TableCell className="font-medium">{pago.monto}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {pago.metodo}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={pago.estatus === "Exitoso" ? "default" : "secondary"}
                    className={
                      pago.estatus === "Exitoso"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                    }
                  >
                    {pago.estatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{pago.fecha}</TableCell>
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
