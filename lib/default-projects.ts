import { eq } from "drizzle-orm";

import { db } from "@/db";
import { project } from "@/db/project-schema";

export const DEFAULT_APPSTRACT_PROJECTS = [
  { slug: "lake-sport-club", name: "Lake Sport Club" },
  { slug: "pilates-reformer", name: "Pilates Reformer" },
  { slug: "pulsety", name: "Pulsety" },
  { slug: "refautomex", name: "Refautomex" },
] as const;

export async function ensureDefaultProjects() {
  for (const row of DEFAULT_APPSTRACT_PROJECTS) {
    const existing = await db.select().from(project).where(eq(project.slug, row.slug)).limit(1);
    if (existing.length > 0) {
      continue;
    }
    await db.insert(project).values({
      id: crypto.randomUUID(),
      slug: row.slug,
      name: row.name,
    });
  }
}
