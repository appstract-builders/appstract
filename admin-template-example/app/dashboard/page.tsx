"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { Users, Calendar, CreditCard, DollarSign } from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { Badge } from "@/components/ui/badge"

const chartData = [
  { day: "Lun", reservas: 3, color: "#c4856c" },
  { day: "Mar", reservas: 10, color: "#c4856c" },
  { day: "Mie", reservas: 12, color: "#c4856c" },
  { day: "Jue", reservas: 2, color: "#c4856c" },
  { day: "Vie", reservas: 8, color: "#c4856c" },
  { day: "Sab", reservas: 1, color: "#c4856c" },
  { day: "Dom", reservas: 0, color: "#c4856c" },
]

const upcomingReservations = [
  {
    name: "Maria Garcia Lopez",
    class: "Pilates Reformer - Lunes 7:00 AM",
    date: "23 mar",
  },
  {
    name: "Ana Sofia Martinez",
    class: "Pilates Reformer - Lunes 7:00 AM",
    date: "23 mar",
  },
  {
    name: "Maria Garcia Lopez",
    class: "Pilates Mat - Miercoles 9:00 AM",
    date: "25 mar",
  },
  {
    name: "Ana Sofia Martinez",
    class: "Pilates Mat - Miercoles 9:00 AM",
    date: "25 mar",
  },
  {
    name: "Ana Sofia Martinez",
    class: "Pilates Tower - Viernes 6:00 PM",
    date: "27 mar",
  },
]

const metrics = [
  {
    title: "ALUMNOS ACTIVOS",
    value: "2",
    subtitle: "3 totales",
    icon: Users,
    iconBg: "bg-orange-50",
    iconColor: "text-[#c4856c]",
  },
  {
    title: "CLASES ACTIVAS",
    value: "3",
    icon: Calendar,
    iconBg: "bg-orange-50",
    iconColor: "text-[#c4856c]",
  },
  {
    title: "RESERVAS SEMANA",
    value: "5",
    icon: CreditCard,
    iconBg: "bg-orange-50",
    iconColor: "text-[#c4856c]",
  },
  {
    title: "INGRESOS",
    value: "$3,000 MXN",
    icon: DollarSign,
    iconBg: "bg-orange-50",
    iconColor: "text-[#c4856c]",
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Dashboard"
        description="Semana actual: Semana 13, marzo 2026"
      />

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground tracking-wide">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  {metric.subtitle && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {metric.subtitle}
                    </p>
                  )}
                </div>
                <div
                  className={`h-10 w-10 rounded-full ${metric.iconBg} flex items-center justify-center`}
                >
                  <metric.icon className={`h-5 w-5 ${metric.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
                  radius={[4, 4, 0, 0]}
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
            {upcomingReservations.map((reservation, index) => (
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
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
