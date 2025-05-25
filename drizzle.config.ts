import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables from .env.local file
dotenv.config({ path: ".env.local" });

/**
 * Drizzle Configuration
 *
 * This file configures Drizzle ORM to work with our Neon PostgreSQL database.
 * It's used by the Drizzle CLI for schema migrations and generating SQL.
 */

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env.local");
}

export default defineConfig({
  schema: "./lib//db//schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Configure migrations table
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
  // Additional options
  verbose: true,
  strict: true,
});
