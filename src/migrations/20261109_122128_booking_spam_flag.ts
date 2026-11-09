import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "bookings" ADD COLUMN "suspected_spam" boolean;
  ALTER TABLE "_bookings_v" ADD COLUMN "version_suspected_spam" boolean;
  CREATE INDEX "bookings_suspected_spam_idx" ON "bookings" USING btree ("suspected_spam");
  CREATE INDEX "_bookings_v_version_version_suspected_spam_idx" ON "_bookings_v" USING btree ("version_suspected_spam");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "bookings_suspected_spam_idx";
  DROP INDEX "_bookings_v_version_version_suspected_spam_idx";
  ALTER TABLE "bookings" DROP COLUMN "suspected_spam";
  ALTER TABLE "_bookings_v" DROP COLUMN "version_suspected_spam";`)
}
