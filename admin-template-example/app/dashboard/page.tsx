import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"

const metrics = [
  {
    title: "ALUMNOS ACTIVOS",
    value: "--",
    subtitle: "Placeholder",
  },
  {
    title: "CLASES ACTIVAS",
    value: "--",
    subtitle: "Placeholder",
  },
  {
    title: "RESERVAS SEMANA",
    value: "--",
    subtitle: "Placeholder",
  },
  {
    title: "INGRESOS",
    value: "--",
    subtitle: "Placeholder",
  },
]

export default async function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Dashboard"
        description="Resumen general"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground tracking-wide">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
