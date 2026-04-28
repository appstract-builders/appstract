"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"

export default function ServicesPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Services"
        description="Organize offerings, delivery details, and internal ownership."
      />
      <Card className="border">
        <CardContent className="p-12">
          <Empty>
            <EmptyTitle>No services yet</EmptyTitle>
            <EmptyDescription>
              Services will appear here when offerings are added.
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </div>
  )
}
