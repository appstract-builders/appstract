"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import {
  Users,
  Calendar,
  CreditCard,
  DollarSign,
  type LucideIcon,
} from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { Badge } from "@/components/ui/badge"

type ChartDatum = {
  day: string
  reservas: number
  color: string
}

type Reservation = {
  name: string
  class: string
  date: string
}

type MetricCardProps = {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
}

const chartData = Array<ChartDatum>()
const upcomingReservations = Array<Reservation>()

function MetricCard({ title, value, subtitle, icon: Icon }: MetricCardProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground tracking-wide">
              {title}
            </p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
            <Icon className="h-5 w-5 text-[#c4856c]" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Dashboard"
        description="Semana actual: Semana 13, marzo 2026"
      />

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="ALUMNOS ACTIVOS"
          value="2"
          subtitle="3 totales"
          icon={Users}
        />
        <MetricCard title="CLASES ACTIVAS" value="3" icon={Calendar} />
        <MetricCard title="RESERVAS SEMANA" value="5" icon={CreditCard} />
        <MetricCard title="INGRESOS" value="$3,000 MXN" icon={DollarSign} />
      </div>

      {/* Charts and Upcoming */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Bar Chart */}
        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Reservas por Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="reservas"
                  fill="#c4856c"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Reservations */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Proximas Reservas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingReservations.length > 0 ? (
              upcomingReservations.map((reservation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="font-medium text-sm">{reservation.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {reservation.class}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    {reservation.date}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Sin proximas reservas
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
