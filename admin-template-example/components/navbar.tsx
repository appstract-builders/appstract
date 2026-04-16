"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, LogOut, Settings, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Mock user data
const mockUser = {
  name: "Benjamin Menchaca",
  email: "bmenchaca.cca@gmail.com",
  avatar: null,
  initials: "BM",
  role: "admin"
}

const pathNames: Record<string, string> = {
  "dashboard": "Dashboard",
  "resumen": "Resumen",
  "usuarios": "Usuarios",
  "alumnos": "Alumnos",
  "clases": "Clases",
  "reservas": "Reservas",
  "pagos": "Pagos",
  "datos": "Datos",
  "usuario": "Usuario",
  "clase": "Clase",
  "reserva": "Reserva",
  "pago": "Pago",
  "analiticas": "Analiticas",
  "dominios": "Dominios",
  "integraciones": "Integraciones",
  "seguridad": "Seguridad",
  "agentes": "Agentes",
  "automatizaciones": "Automatizaciones",
  "registros": "Registros",
  "api": "API",
  "configuracion": "Configuracion",
  "app": "Configuracion de App",
  "autenticacion": "Autenticacion",
  "plantilla": "Plantilla de App",
}

export function Navbar() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment, index) => {
              const isLast = index === segments.length - 1
              const href = "/" + segments.slice(0, index + 1).join("/")
              const label = pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

              return (
                <span key={segment} className="contents">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#c4856c]" />
          <span className="sr-only">Notificaciones</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={mockUser.avatar || undefined} alt={mockUser.name} />
                <AvatarFallback className="bg-[#c4856c] text-white text-sm">
                  {mockUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start text-sm">
                <span className="font-medium">{mockUser.name}</span>
                <span className="text-xs text-muted-foreground">{mockUser.role}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground">{mockUser.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/configuracion/app" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Mi Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/configuracion/app" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Configuracion
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesion
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
