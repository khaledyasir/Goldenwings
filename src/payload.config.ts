import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { ar } from "@payloadcms/translations/languages/ar";
import { en } from "@payloadcms/translations/languages/en";
import sharp from "sharp";
import { collections } from "./cms/collections";
import { globals } from "./cms/globals";

const dirname = path.dirname(fileURLToPath(import.meta.url));
// Public address of the site, read at runtime (e.g. https://goldenwingsjo.com). Cookie-authenticated requests are
// only accepted from this origin.
const serverURL = process.env.SERVER_URL || "http://localhost:3000";
const trustedOrigins = [serverURL];

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
    // Schema changes reach a database only through committed migrations (npm run migrate). Development machines
    // opt in to pushing the schema directly with PAYLOAD_PUSH=true; the server never does, even for CLI scripts.
    push: process.env.PAYLOAD_PUSH === "true",
  }),
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
