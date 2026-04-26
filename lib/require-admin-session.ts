import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function requireAdminSession() {
  const authDisabled =
    process.env.NODE_ENV !== "production" && process.env.DISABLE_AUTH !== "0";
  if (authDisabled) {
    return {
      user: {
        id: "dev-admin",
        email: "dev@local.test",
        name: "Dev Admin",
      },
    } as any;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }
  return session;
}
