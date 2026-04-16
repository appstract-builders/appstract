"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { SlidersHorizontal, Search, UserPlus } from "lucide-react"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"

const usuarios = [
  {
    id: 1,
    nombre: "Benjamin Menchaca",
    subtitulo: "Owner",
    rol: "admin",
    email: "bmenchaca.cca@gmail.com",
  },
]

export default function UsuariosPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Usuarios"
        description="Gestiona los usuarios de la app y sus roles"
      >
        <Button variant="outline" size="icon" className="h-9 w-9">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
        <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          <UserPlus className="h-4 w-4" />
          Invitar Usuario
        </Button>
      </PageHeader>

      <Tabs defaultValue="usuarios" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="pendientes">Solicitudes pendientes</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-4">
          <div className="rounded-lg border">
            <div className="px-4 py-4 flex items-center justify-between border-b">
              <h3 className="font-medium text-sm">Usuarios</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por correo o nombre"
                    className="pl-9 w-64 h-9 border-muted"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-28 h-9">
                    <SelectValue placeholder="all roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">all roles</SelectItem>
                    <SelectItem value="admin">admin</SelectItem>
                    <SelectItem value="user">user</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="text-muted-foreground font-normal text-sm">name</TableHead>
                  <TableHead className="text-muted-foreground font-normal text-sm">role</TableHead>
                  <TableHead className="text-muted-foreground font-normal text-sm">email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id} className="border-b last:border-0">
                    <TableCell className="py-4">
                      <div>
                        <p className="font-medium text-foreground">{usuario.nombre}</p>
                        <p className="text-xs text-muted-foreground">{usuario.subtitulo}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground py-4">{usuario.rol}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{usuario.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pendientes" className="space-y-4">
          <div className="rounded-lg border">
            <div className="px-4 py-4 flex items-center justify-between border-b">
              <h3 className="font-medium text-sm">Solicitudes pendientes</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por correo o nombre"
                  className="pl-9 w-64 h-9 border-muted"
                />
              </div>
            </div>
            <div className="p-16">
              <Empty>
                <EmptyTitle>No hay solicitudes pendientes</EmptyTitle>
                <EmptyDescription>
                  Actualmente no hay solicitudes de acceso esperando aprobacion
                </EmptyDescription>
              </Empty>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
