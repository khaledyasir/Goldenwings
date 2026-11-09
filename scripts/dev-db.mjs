/**
 * Local PostgreSQL for development and tests, no Docker or system install needed.
 * Data lives in ./.data/pg (git-ignored). Production uses a hosted Postgres via DATABASE_URL instead.
 *
 *   npm run db:dev     -> postgres://postgres:postgres@127.0.0.1:54329/goldenwings
 */
import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";

const dir = ".data/pg";
const pg = new EmbeddedPostgres({ databaseDir: dir, user: "postgres", password: "postgres", port: 54329, persistent: true, initdbFlags: ["--encoding=UTF8", "--locale=C"] });

if (!existsSync(`${dir}/PG_VERSION`)) await pg.initialise();
await pg.start();
for (const name of ["goldenwings", "goldenwings_test"]) await pg.createDatabase(name).catch(() => {});
console.log("Postgres ready on 127.0.0.1:54329 (databases: goldenwings, goldenwings_test). Ctrl+C to stop.");

const stop = async () => {
  await pg.stop();
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
setInterval(() => {}, 1 << 30);
