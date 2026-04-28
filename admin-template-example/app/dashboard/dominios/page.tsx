"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

export default function DominiosPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Dominios"
        description={
          <>
            Compra, conecta y gestiona tus dominios.{" "}
            <a href="#" className="text-[#c4856c] font-medium">
              Learn more
            </a>
          </>
        }
      />

      {/* Integrated Domain */}
      <div className="space-y-2">
        <h2 className="text-base font-medium">Dominio integrado</h2>
        <Card className="border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">tu-negocio.appstract.app</p>
                <p className="text-sm text-muted-foreground">Nunca expira</p>
              </div>
              <Button variant="outline">Editar URL</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Domains */}
      <div className="space-y-2">
        <h2 className="text-base font-medium">Dominios personalizados</h2>
        <Card className="border border-dashed">
          <CardContent className="p-12">
            <Empty>
              <EmptyTitle>Quieres usar tu dominio?</EmptyTitle>
              <EmptyDescription className="max-w-md mx-auto">
                Los dominios personalizados estan disponibles en nuestro plan Builder y
                superiores. Mejora tu plan para conectar tu dominio a esta app.
              </EmptyDescription>
              <Button className="mt-4 bg-foreground text-background">
                Ver Planes
              </Button>
            </Empty>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
