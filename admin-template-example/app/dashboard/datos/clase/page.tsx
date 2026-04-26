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

const clases = []

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
        </Table>
        <div className="border-t p-10">
          <Empty>
            <EmptyTitle>No hay clases</EmptyTitle>
            <EmptyDescription>
              Aun no existen clases registradas para mostrar en esta tabla.
            </EmptyDescription>
          </Empty>
        </div>
      </div>
    </div>
  )
}
