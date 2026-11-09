/**
 * Creates the site owner account. There is no public sign-up and no default password.
 *
 *   npm run owner:create -- owner@example.com "Owner Name"
 *
 * Prints a random password once; the owner should change it after first login (Account page), or use
 * "Forgot password" once SMTP is configured.
 */
import { randomBytes } from "node:crypto";
import config from "@payload-config";
import { getPayload } from "payload";

const [email, name = "Owner"] = process.argv.slice(2).filter((a) => !a.endsWith(".ts"));
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Usage: npm run owner:create -- owner@example.com "Owner Name"');
  process.exit(1);
}

const payload = await getPayload({ config });
const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });
if (existing.docs.length) {
  console.error(`A user with ${email} already exists. Use "Forgot password" or ask another owner to reset it.`);
  process.exit(1);
}
const password = randomBytes(12).toString("base64url");
await payload.create({ collection: "users", data: { email, name, role: "owner", password }, context: { trustedSeed: true } });
console.log(`Owner created: ${email}\nTemporary password (shown once): ${password}`);
process.exit(0);
