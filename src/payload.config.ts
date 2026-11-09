import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { ar } from "@payloadcms/translations/languages/ar";
import { en } from "@payloadcms/translations/languages/en";
import sharp from "sharp";
import { collections } from "./cms/collections";
import { globals } from "./cms/globals";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

if (!process.env.PAYLOAD_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("PAYLOAD_SECRET is required in production");
}

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || "dev-only-secret-change-me",
  // Cookie-authenticated requests are only accepted from the site itself
  csrf: [serverURL],
  cors: [serverURL],
  admin: {
    user: "users",
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " | الأجنحة الذهبية" },
    components: {
      beforeDashboard: ["@/cms/admin/Dashboard#Dashboard"],
      beforeNavLinks: ["@/cms/admin/EditSiteLink#EditSiteLink"],
    },
  },
  i18n: { supportedLanguages: { ar, en }, fallbackLanguage: "ar" },
  localization: {
    locales: [
      { code: "ar", label: "العربية", rtl: true },
      { code: "en", label: "English" },
    ],
    defaultLocale: "ar",
    fallback: true,
  },
  collections,
  globals,
  upload: { limits: { fileSize: 10 * 1024 * 1024 } },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    migrationDir: path.resolve(dirname, "migrations"),
    // Dev pushes the schema straight to the local database; production only changes through committed migrations
    push: process.env.NODE_ENV !== "production" && process.env.PAYLOAD_PUSH !== "false",
  }),
  plugins: [
    // Uploads go to Vercel Blob when the token is set (production). Without it, files go to ./media (local dev only).
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  // Password-reset and booking emails go out only when SMTP is configured; otherwise Payload logs them to the console
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM || "no-reply@goldenwingsjo.com",
        defaultFromName: "Golden Wings",
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
});
