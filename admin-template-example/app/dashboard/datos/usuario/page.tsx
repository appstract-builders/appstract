"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, RefreshCw, MoreHorizontal } from "lucide-react"
import { DataTableHeader } from "@/components/data-table-header"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"

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
        </Table>
        <div className="border-t p-10">
          <Empty>
            <EmptyTitle>No hay usuarios</EmptyTitle>
            <EmptyDescription>
              Aun no existen usuarios registrados para mostrar en esta tabla.
            </EmptyDescription>
          </Empty>
        </div>
      </div>
    </div>
  )
}
