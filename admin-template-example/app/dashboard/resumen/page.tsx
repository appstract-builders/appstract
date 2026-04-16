"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink, Share2, Globe, Copy, ArrowRight, Pencil, Star } from "lucide-react"

export default function ResumenPage() {
  return (
    <div className="p-6 space-y-6">
      {/* App Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-[#c4856c]/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-[#c4856c] flex items-center justify-center text-white text-lg font-semibold">
              ZP
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">ZenPilates Flow</h1>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Un sistema intuitivo y eficiente para gestionar reservas, planes y pagos de tu
              estudio de Pilates, permitiendote enfocarte en la experiencia de tus alumnos.
            </p>
            <p className="text-xs text-muted-foreground mt-2">Created 10 minutes ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Abrir App
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          <div className="text-left">
            <span>Compartir App</span>
            <span className="text-xs text-muted-foreground ml-1">gana creditos gratis!</span>
          </div>
        </Button>
      </div>

      {/* Settings Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* App Visibility */}
        <Card className="border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Visibilidad de la App</CardTitle>
            <p className="text-sm text-muted-foreground">
              Controla quien puede acceder a tu aplicacion
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="public">
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Checkbox id="require-login" defaultChecked />
              <label htmlFor="require-login" className="text-sm">
                Require login to access
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Invite Users */}
        <Card className="border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-medium">Invitar usuarios</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Haz crecer tu base de usuarios invitando a otros
                </p>
              </div>
              <div className="p-2 rounded-lg bg-muted">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Copy className="h-4 w-4" />
                Copiar enlace
              </Button>
              <Button className="gap-2 bg-[#c4856c] hover:bg-[#b07560] text-white">
                Enviar invitaciones
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Move to Workspace */}
      <Card className="border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Move to Workspace</p>
              <p className="text-sm text-muted-foreground">
                Move this app to another workspace
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <ArrowRight className="h-4 w-4" />
              Move App
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Platform Badge */}
      <Card className="border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Insignia de Plataforma</p>
              <p className="text-sm text-muted-foreground">
                {"La insignia \"Editar con Base44\" es actualmente visible en tu app."}
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Pencil className="h-4 w-4" />
              Ocultar Insignia
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
