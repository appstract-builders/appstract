"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"

export default function PipelinePage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Pipeline"
        description="Track opportunities, stages, owners, and next actions."
      />
      <Card className="border">
        <CardContent className="p-12">
          <Empty>
            <EmptyTitle>No opportunities yet</EmptyTitle>
            <EmptyDescription>
              Pipeline items will appear here when opportunities are created.
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </div>
  )
}
