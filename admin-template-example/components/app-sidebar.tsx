"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Database,
  BarChart3,
  Globe,
  Plug,
  Shield,
  Bot,
  Zap,
  FileText,
  Code,
  Settings,
  ChevronDown,
  Search,
  Calendar,
  CreditCard,
  BookOpen,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const mainNavItems = [
  {
    title: "Resumen",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Usuarios",
    url: "/dashboard/usuarios",
    icon: Users,
  },
]

const dataNavItems = [
  {
    title: "Usuario",
    url: "/dashboard/datos/usuario",
  },
  {
    title: "Clase",
    url: "/dashboard/datos/clase",
  },
  {
    title: "Reserva",
    url: "/dashboard/datos/reserva",
  },
  {
    title: "Pago",
    url: "/dashboard/datos/pago",
  },
]

const secondaryNavItems = [
  {
    title: "Analiticas",
    url: "/dashboard/analiticas",
    icon: BarChart3,
    badge: "Beta",
  },
  {
    title: "Dominios",
    url: "/dashboard/dominios",
    icon: Globe,
  },
  {
    title: "Integraciones",
    url: "/dashboard/integraciones",
    icon: Plug,
  },
  {
    title: "Seguridad",
    url: "/dashboard/seguridad",
    icon: Shield,
  },
  {
    title: "Agentes",
    url: "/dashboard/agentes",
    icon: Bot,
  },
  {
    title: "Automatizaciones",
    url: "/dashboard/automatizaciones",
    icon: Zap,
  },
  {
    title: "Registros",
    url: "/dashboard/registros",
    icon: FileText,
  },
  {
    title: "API",
    url: "/dashboard/api",
    icon: Code,
  },
]

const configNavItems = [
  {
    title: "Configuracion de App",
    url: "/dashboard/configuracion/app",
  },
  {
    title: "Autenticacion",
    url: "/dashboard/configuracion/autenticacion",
  },
  {
    title: "Plantilla de App",
    url: "/dashboard/configuracion/plantilla",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [dataOpen, setDataOpen] = React.useState(true)
  const [configOpen, setConfigOpen] = React.useState(false)

  React.useEffect(() => {
    if (pathname.includes("/datos/")) {
      setDataOpen(true)
    }
    if (pathname.includes("/configuracion/")) {
      setConfigOpen(true)
    }
  }, [pathname])

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="text-sm font-medium text-muted-foreground mb-4">Panel</div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="pl-9 h-9 bg-background"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "w-full justify-start",
                      pathname === item.url && "bg-sidebar-accent"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Data Section */}
              <Collapsible open={dataOpen} onOpenChange={setDataOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-start">
                      <Database className="h-4 w-4" />
                      <span>Datos</span>
                      <ChevronDown
                        className={cn(
                          "ml-auto h-4 w-4 transition-transform",
                          dataOpen && "rotate-180"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {dataNavItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === item.url}
                          >
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "w-full justify-start",
                      pathname === item.url && "bg-sidebar-accent"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Configuration Section */}
              <Collapsible open={configOpen} onOpenChange={setConfigOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-start">
                      <Settings className="h-4 w-4" />
                      <span>Configuracion</span>
                      <ChevronDown
                        className={cn(
                          "ml-auto h-4 w-4 transition-transform",
                          configOpen && "rotate-180"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {configNavItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === item.url}
                          >
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">v1.0 MVP</div>
      </SidebarFooter>
    </Sidebar>
  )
}
