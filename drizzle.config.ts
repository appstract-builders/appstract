import path from "node:path";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/auth-schema.ts",
  out: "./db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.LOCAL_DATABASE_PATH ?? path.join(process.cwd(), "local.db"),
  },
});
