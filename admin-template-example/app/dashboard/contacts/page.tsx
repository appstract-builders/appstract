"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"

export default function ContactsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Contacts"
        description="Manage customer profiles, owners, and relationship context."
      />
      <Card className="border">
        <CardContent className="p-12">
          <Empty>
            <EmptyTitle>No contacts yet</EmptyTitle>
            <EmptyDescription>
              Contacts will appear here when customer records are connected.
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </div>
  )
}
