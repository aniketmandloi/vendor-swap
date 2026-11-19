import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local or the environment, then rerun npm run db:schema.");
  process.exit(1);
}

// The HTTP driver sends one statement per query, so db/schema.sql must hold exactly one.
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
await neon(url).query(schema);
console.log("Applied db/schema.sql.");
