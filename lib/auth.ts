import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import * as schema from "@/db/auth-schema";
import { db } from "@/db";

const secret =
  process.env.BETTER_AUTH_SECRET ??
  "dev-only-better-auth-secret-change-in-production-min-32-chars";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  secret,
  baseURL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
