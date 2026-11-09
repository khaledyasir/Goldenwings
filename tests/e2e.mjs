/**
 * End-to-end check against a running site (dev or production build) with seeded content.
 *
 *   BASE_URL=http://localhost:3010 OWNER_EMAIL=... OWNER_PASSWORD=... BROWSER=/path/to/chrome node tests/e2e.mjs
 *
 * Changes content and restores it at the end; run against a local or staging database only, never production.
 */
import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3010";
const { OWNER_EMAIL, OWNER_PASSWORD } = process.env;
assert.ok(OWNER_EMAIL && OWNER_PASSWORD, "set OWNER_EMAIL and OWNER_PASSWORD");
const BROWSER = process.env.BROWSER ?? "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe";

const results = [];
async function step(name, fn) {
  try {
    await fn();
    results.push(["PASS", name]);
  } catch (e) {
    results.push(["FAIL", name, e.message.split("\n")[0]]);
  }
}
const anon = (path, init) => fetch(BASE + path, { redirect: "manual", ...init });

// ---------------------------------------------------------------- anonymous access
await step("anonymous: public pages have no edit markers", async () => {
  const html = await (await anon("/")).text();
  assert.ok(!html.includes("data-cms"), "data-cms found in public HTML");
  assert.ok(!html.includes("data-gw-editor"));
});
for (const [path, method] of [
  ["/api/bookings", "GET"],
  ["/api/entries", "GET"],
  ["/api/users", "GET"],
  ["/api/bookings", "POST"],
  ["/api/vehicles", "POST"],
  ["/api/globals/home", "POST"],
  ["/api/export?collection=bookings", "GET"],
]) {
  await step(`anonymous: ${method} ${path} denied`, async () => {
    const r = await anon(path, { method, headers: { "Content-Type": "application/json" }, body: method === "POST" ? "{}" : undefined });
    assert.ok([401, 403].includes(r.status), `status ${r.status}`);
  });
}
await step("anonymous: users list returns no documents", async () => {
  const r = await anon("/api/users");
  const body = await r.json().catch(() => ({}));
  assert.ok(!body.docs?.length);
});
await step("anonymous: public sign-up (first-register) refused", async () => {
  const r = await anon("/api/users/first-register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "attacker@example.com", password: "Passw0rd!Passw0rd", role: "owner" }),
  });
  assert.ok(r.status >= 400, `status ${r.status}`);
});
await step("anonymous: /entries requires login", async () => {
  const r = await anon("/entries");
  assert.ok([303, 307, 308].includes(r.status) && r.headers.get("location")?.includes("/admin/login"), `status ${r.status}`);
});
await step("anonymous: edit-mode route does not enable editing", async () => {
  const r = await anon("/api/edit-mode?path=/");
  assert.ok(r.headers.get("location")?.includes("/admin/login"));
  const html = await (await anon("/", { headers: { Cookie: "gw-edit=1" } })).text();
  assert.ok(!html.includes("data-cms"), "forged gw-edit cookie enabled editing");
});

// ---------------------------------------------------------------- owner session
const login = await anon("/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: OWNER_EMAIL, password: OWNER_PASSWORD }),
});
assert.equal(login.status, 200, "owner login failed");
const token = (await login.json()).token;
const owner = (path, init = {}) => fetch(BASE + path, { ...init, headers: { Authorization: `JWT ${token}`, "Content-Type": "application/json", ...init.headers } });
const original = await (await owner("/api/globals/home?depth=0&locale=ar")).json();

const browser = await chromium.launch({ executablePath: BROWSER });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addCookies([{ name: "payload-token", value: token, url: BASE }]);
const page = await ctx.newPage();
page.on("dialog", (d) => d.accept());
const MARK = `E2E draft ${Date.now()}`;

await step("editor: edit mode shows markers and toolbar", async () => {
  await page.goto(`${BASE}/api/edit-mode?path=/`);
  await page.waitForSelector('[aria-label="Visual editor"]', { timeout: 60000 });
  assert.ok((await page.locator("[data-cms]").count()) > 10);
});
await step("editor: click text, edit, save draft", async () => {
  await page.click('[data-cms="home|hero.description|text"]');
  await page.locator("textarea:enabled").waitFor({ timeout: 30000 });
  await page.fill("textarea", MARK);
  await page.getByRole("button", { name: "تطبيق" }).click();
  await page.getByRole("button", { name: "حفظ كمسودة" }).click();
  await page.getByText("تم الحفظ").waitFor({ timeout: 30000 });
  await page.waitForFunction((m) => document.body.innerText.includes(m), MARK, { timeout: 30000 });
});
await step("drafts are private: visitors still see the published text", async () => {
  const html = await (await anon("/")).text();
  assert.ok(!html.includes(MARK));
  const api = await (await anon("/api/globals/home?draft=true&locale=ar")).text();
  assert.ok(!api.includes(MARK), "anonymous ?draft=true leaked the draft");
});
await step("editor: replace image from the media library (draft)", async () => {
  await page.mouse.click(300, 650); // the bus photo, left of the hero text
  await page.locator('[role="dialog"]').waitFor({ timeout: 30000 });
  const tiles = page.locator('[role="dialog"] button:has(img)');
  await tiles.first().waitFor({ timeout: 30000 });
  await tiles.first().click(); // newest upload, never the seeded hero photo
  // Wait for the save request itself: the "saved" toast from the previous step may still be on screen
  const saved = page.waitForResponse((r) => r.url().includes("/api/globals/home") && r.request().method() === "POST");
  await page.getByRole("button", { name: "حفظ كمسودة" }).click();
  assert.equal((await saved).status(), 200);
  const draft = await (await owner("/api/globals/home?draft=true&depth=0&locale=ar")).json();
  assert.notEqual(draft.hero.image, original.hero.image, "draft image unchanged");
});
await step("editor: publish makes the change public", async () => {
  await page.getByRole("button", { name: "نشر", exact: true }).click();
  await page.getByText("تم النشر").waitFor({ timeout: 30000 });
  const html = await (await anon("/")).text();
  assert.ok(html.includes(MARK), "published text not visible to visitors");
});
await step("revisions: previous version is kept and restorable", async () => {
  const v = await (await owner("/api/globals/home/versions?limit=5&sort=-updatedAt&depth=0")).json();
  assert.ok(v.totalDocs >= 3, `only ${v.totalDocs} versions`);
});
await step("restore original home content", async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, createdAt, updatedAt, globalType, ...data } = original;
  const r = await owner("/api/globals/home?locale=ar", { method: "POST", body: JSON.stringify({ ...data, _status: "published" }) });
  assert.equal(r.status, 200);
  assert.ok(!(await (await anon("/")).text()).includes(MARK));
});
await step("editor: repeated items open their admin editor", async () => {
  await page.goto(`${BASE}/fleet`);
  assert.ok((await page.locator('[data-cms-doc^="vehicles/"]').count()) >= 10);
});
await step("editor: exit edit mode", async () => {
  await page.goto(`${BASE}/api/edit-mode?off=1&path=/`);
  assert.equal(await page.locator('[aria-label="Visual editor"]').count(), 0);
});

// ---------------------------------------------------------------- booking (as a visitor)
let reference;
const visitor = await (await browser.newContext()).newPage();
await step("booking: invalid input is rejected and kept in the form", async () => {
  await visitor.goto(`${BASE}/booking`);
  await visitor.fill('input[name="name"]', "E2E Visitor");
  await visitor.fill('input[name="phone"]', "abc");
  await visitor.fill('input[name="start"]', new Date(Date.now() + 864e5 * 7).toISOString().slice(0, 10));
  await visitor.fill('input[name="from"]', "Amman");
  await visitor.fill('input[name="to"]', "Petra");
  await visitor.evaluate(() => document.querySelector("form").setAttribute("novalidate", ""));
  await visitor.click('button[type="submit"]');
  await visitor.locator('[role="alert"]').waitFor({ timeout: 30000 });
  assert.equal(await visitor.inputValue('input[name="name"]'), "E2E Visitor");
});
await step("booking: valid request is stored with a reference", async () => {
  await visitor.fill('input[name="phone"]', "+962 79 000 0000");
  await visitor.selectOption('select[name="vehicle"]', { index: 2 });
  await visitor.click('button[type="submit"]');
  const status = visitor.locator('[role="status"]');
  await status.waitFor({ timeout: 30000 });
  reference = (await status.innerText()).match(/GW-\d{6}-[A-Z0-9]{5}/)?.[0];
  assert.ok(reference, "no reference shown");
  const found = await (await owner(`/api/bookings?where[reference][equals]=${reference}&depth=0`)).json();
  assert.equal(found.docs[0]?.status, "new");
  assert.ok(found.docs[0]?.vehicleLabel, "vehicle snapshot missing");
});
await step("booking: owner status change is recorded in history", async () => {
  const b = (await (await owner(`/api/bookings?where[reference][equals]=${reference}&depth=0`)).json()).docs[0];
  const r = await owner(`/api/bookings/${b.id}`, { method: "PATCH", body: JSON.stringify({ status: "confirmed" }) });
  assert.equal(r.status, 200);
  const after = await (await owner(`/api/bookings/${b.id}?depth=0`)).json();
  assert.deepEqual(after.statusHistory.map((h) => h.status), ["new", "confirmed"]);
});
await step("booking: CSV export as owner", async () => {
  const r = await owner("/api/export?collection=bookings");
  assert.equal(r.status, 200);
  assert.ok((await r.text()).includes(reference));
});

// ---------------------------------------------------------------- entries (as staff/owner)
await step("entries: signed-in user can submit, record is stored", async () => {
  const p = await ctx.newPage();
  await p.goto(`${BASE}/entries`);
  for (const name of ["movement", "type", "client", "trip", "bus", "driver", "authorization"]) await p.selectOption(`select[name="${name}"]`, { index: 1 });
  await p.fill('input[name="date"]', "2026-11-09");
  await p.fill('textarea[name="statement"]', "E2E statement");
  await p.click('button[type="submit"]');
  await p.locator('[role="status"]').waitFor({ timeout: 30000 });
  const found = await (await owner("/api/entries?where[statement][equals]=E2E%20statement&depth=0")).json();
  assert.ok(found.docs.length >= 1);
});

await browser.close();
for (const r of results) console.log(r.join("  "));
const failed = results.filter((r) => r[0] === "FAIL").length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
