"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Users } from "lucide-react"

const clases = [
  {
    id: 1,
    nombre: "Pilates Reformer - Lunes 7:00 AM",
    instructor: "Laura Sanchez",
    diaSemana: "Lunes",
    tipo: "Pilates Reformer",
    hora: "07:00",
    disponibles: 8,
    total: 10,
  },
  {
    id: 2,
    nombre: "Pilates Mat - Miercoles 9:00 AM",
    instructor: "Patricia Flores",
    diaSemana: "Miercoles",
    tipo: "Pilates Mat",
    hora: "09:00",
    disponibles: 10,
    total: 12,
  },
  {
    id: 3,
    nombre: "Pilates Tower - Viernes 6:00 PM",
    instructor: "Laura Sanchez",
    diaSemana: "Viernes",
    tipo: "Pilates Tower",
    hora: "18:00",
    disponibles: 7,
    total: 8,
  },
]

export default function ClasesPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Clases / Horarios"
        description="3 clases configuradas"
      >
        <Button className="gap-2 bg-[#c4856c] hover:bg-[#b07560] text-white">
          <Plus className="h-4 w-4" />
          Nueva Clase
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clases.map((clase) => (
          <Card key={clase.id} className="border shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-base">{clase.nombre}</h3>
                  <p className="text-sm text-muted-foreground">
                    {clase.instructor}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-normal">
                    {clase.diaSemana}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="font-normal bg-orange-50 text-[#c4856c] hover:bg-orange-100"
                  >
                    {clase.tipo}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{clase.hora}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {clase.disponibles} / {clase.total} disponibles
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
