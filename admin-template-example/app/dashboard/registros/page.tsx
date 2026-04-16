"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
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
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, Search, ChevronDown, CheckCircle } from "lucide-react"

const registros = [
  {
    tipo: "app.entity.query",
    usuario: "bmenchaca.cca@gmail.com",
    timestamp: "3/24/2026, 12:14:51 AM",
    success: true,
  },
  {
    tipo: "app.entity.query",
    usuario: "bmenchaca.cca@gmail.com",
    timestamp: "3/24/2026, 12:14:44 AM",
    success: true,
  },
  {
    tipo: "app.entity.query",
    usuario: "bmenchaca.cca@gmail.com",
    timestamp: "3/24/2026, 12:14:38 AM",
    success: true,
  },
  {
    tipo: "app.entity.query",
    usuario: "bmenchaca.cca@gmail.com",
    timestamp: "3/24/2026, 12:14:32 AM",
    success: true,
  },
  {
    tipo: "app.user.query",
    usuario: "bmenchaca.cca@gmail.com",
    timestamp: "3/24/2026, 12:14:22 AM",
    success: true,
  },
  {
    tipo: "app.entity.query",
    usuario: "bmenchaca.cca@gmail.com",
    timestamp: "3/24/2026, 12:14:03 AM",
    success: true,
  },
  {
    tipo: "app.entity.query",
    usuario: "bmenchaca.cca@gmail.com",
    timestamp: "3/24/2026, 12:14:03 AM",
    success: true,
  },
  {
    tipo: "app.entity.query",
    usuario: "bmenchaca.cca@gmail.com",
    timestamp: "3/24/2026, 12:13:54 AM",
    success: true,
  },
]

export default function RegistrosPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Explorador de registros"
        description="Monitorea los registros del sistema de tu aplicacion."
      >
        <Button variant="outline" className="gap-2 h-9">
          <RefreshCw className="h-4 w-4" />
          Actualizar
        </Button>
      </PageHeader>

      <div className="rounded-lg border bg-card">
        <div className="px-4 py-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filtrar por correo..."
              className="pl-9 h-9"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-24 h-9">
              <SelectValue placeholder="All..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All...</SelectItem>
              <SelectItem value="query">Query</SelectItem>
              <SelectItem value="mutation">Mutation</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-time">
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder="Todos los..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">Todos los...</SelectItem>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Checkbox id="errors-only" />
            <label htmlFor="errors-only" className="text-sm">
              Solo errores
            </label>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12"></TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Marca de tiempo</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registros.map((registro, index) => (
              <TableRow key={index}>
                <TableCell>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </TableCell>
                <TableCell className="font-mono">{registro.tipo}</TableCell>
                <TableCell className="text-muted-foreground">{registro.usuario}</TableCell>
                <TableCell className="text-muted-foreground">{registro.timestamp}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronDown className="h-4 w-4" />
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
