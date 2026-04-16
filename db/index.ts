import Database from "better-sqlite3";
import path from "node:path";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./auth-schema";

const dbPath = process.env.LOCAL_DATABASE_PATH ?? path.join(process.cwd(), "local.db");
const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });
