import { NextResponse } from "next/server";

import { db } from "@/db";
import { project } from "@/db/project-schema";
import { ensureDefaultProjects } from "@/lib/default-projects";
import { requireAdminSession } from "@/lib/require-admin-session";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }
  await ensureDefaultProjects();
  const rows = await db.select().from(project);
  return NextResponse.json({
    projects: rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
    })),
  });
}
