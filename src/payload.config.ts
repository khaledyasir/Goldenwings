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
// Read at runtime (not NEXT_PUBLIC_*, which is frozen at build time). Vercel's own URLs are trusted too so preview
// deployments and the production alias work without rebuilding.
const vercel = [process.env.VERCEL_PROJECT_PRODUCTION_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_URL]
  .filter(Boolean)
  .map((host) => `https://${host}`);
const serverURL = process.env.SERVER_URL || vercel[0] || "http://localhost:3000";
const trustedOrigins = [...new Set([serverURL, ...vercel])];

if (!process.env.PAYLOAD_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("PAYLOAD_SECRET is required in production");
}

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || "dev-only-secret-change-me",
  // Cookie-authenticated requests are only accepted from the site itself
  csrf: trustedOrigins,
  cors: trustedOrigins,
  admin: {
    user: "users",
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " | الأجنحة الذهبية",
      icons: [{ rel: "icon", type: "image/png", url: "/icon.png" }],
    },
    components: {
      graphics: { Logo: "@/cms/admin/Brand#Logo", Icon: "@/cms/admin/Brand#Icon" },
      // Top bar: view site, Arabic/English (menu follows the language side), light/dark
      actions: ["@/cms/admin/HeaderActions#HeaderActions"],
      beforeNavLinks: ["@/cms/admin/EditSiteLink#EditSiteLink"],
      // Task-oriented home instead of Payload's generic list of collections
      views: { dashboard: { Component: "@/cms/admin/Dashboard#Dashboard" } },
    },
  },
  i18n: {
    supportedLanguages: { ar, en },
    fallbackLanguage: "ar",
    // The top-bar locale picker chooses which language of the *content* is being edited; the interface language
    // has its own button, so the two must not both read "Language"
    // Also: no "Payload" branding in the owner's UI, and a fix for Payload's broken Arabic "restoring" string
    translations: {
      ar: { general: { locale: "لغة المحتوى", payloadSettings: "إعدادات العرض", restoring: "جارٍ الاسترجاع..." } },
      en: { general: { locale: "Content language", payloadSettings: "Display settings" } },
    },
  },
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
