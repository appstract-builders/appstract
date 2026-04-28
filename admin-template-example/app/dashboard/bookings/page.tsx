"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"

export default function BookingsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Bookings"
        description="Review scheduled work, customer commitments, and follow-ups."
      />
      <Card className="border">
        <CardContent className="p-12">
          <Empty>
            <EmptyTitle>No bookings yet</EmptyTitle>
            <EmptyDescription>
              Bookings will appear here when commitments are scheduled.
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </div>
  )
}
