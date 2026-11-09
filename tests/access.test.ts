/**
 * Server-side permission and data-integrity checks through Payload's local API, against TEST_DATABASE_URL
 * (default: the goldenwings_test database started by `npm run db:dev`). The schema is pushed automatically.
 */
import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { getPayload, type Payload } from "payload";

process.env.DATABASE_URL = process.env.TEST_DATABASE_URL ?? "postgres://postgres:postgres@127.0.0.1:54329/goldenwings_test";
const { default: config } = await import("../src/payload.config.ts");
const { seed } = await import("../src/seed/run.ts");
const { createBooking } = await import("../src/lib/bookings.ts");
const { createEntry } = await import("../src/lib/entries.ts");

let payload: Payload;
const users: Record<string, { id: number; role: string; collection: "users" }> = {};
const as = (role: string) => ({ overrideAccess: false, user: users[role] as never });

before(async () => {
  payload = await getPayload({ config });
  await seed(payload, () => {});
  for (const role of ["owner", "editor", "staff"]) {
    const email = `${role}@test.local`;
    const found = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });
    const u = found.docs[0] ?? (await payload.create({ collection: "users", data: { email, role: role as never, password: "Test-Passw0rd!" }, context: { trustedSeed: true } }));
    users[role] = { id: u.id, role, collection: "users" };
  }
});
after(() => payload.db.destroy?.()); // close the pool so the process can exit

test("seed is idempotent: running it again creates nothing", async () => {
  const before = await payload.count({ collection: "vehicles" });
  await seed(payload, () => {});
  assert.equal((await payload.count({ collection: "vehicles" })).totalDocs, before.totalDocs);
  assert.equal(before.totalDocs, 10);
  assert.equal((await payload.count({ collection: "partners" })).totalDocs, 16);
});

test("public sign-up is refused without a signed-in owner", async () => {
  await assert.rejects(payload.create({ collection: "users", data: { email: "x@test.local", password: "Test-Passw0rd!", role: "owner" }, overrideAccess: false }));
});

test("editors and staff cannot create users or raise their own role", async () => {
  await assert.rejects(payload.create({ collection: "users", data: { email: "y@test.local", password: "Test-Passw0rd!", role: "editor" }, ...as("editor") }));
  const self = await payload.update({ collection: "users", id: users.editor.id, data: { role: "owner" }, ...as("editor") });
  assert.equal(self.role, "editor");
});

test("bookings: stored with reference and vehicle snapshot; only the owner can read them or their history", async () => {
  const vehicle = (await payload.find({ collection: "vehicles", limit: 1, locale: "ar" })).docs[0];
  const b = await createBooking(
    payload,
    { name: "Test", phone: "+962790000000", email: "", vehicle: vehicle.id, start: "2030-01-01", end: "", from: "A", to: "B", message: "", lang: "ar" },
    `test-${Date.now()}`,
  );
  assert.match(b.reference, /^GW-/);
  assert.equal(b.vehicleLabel, vehicle.name);
  assert.equal(b.statusHistory?.[0]?.status, "new");

  // Renaming the vehicle later does not change what the customer asked for
  await payload.update({ collection: "vehicles", id: vehicle.id, locale: "ar", data: { name: `${vehicle.name} (renamed)` } });
  assert.equal((await payload.findByID({ collection: "bookings", id: b.id })).vehicleLabel, vehicle.name);
  await payload.update({ collection: "vehicles", id: vehicle.id, locale: "ar", data: { name: vehicle.name } });

  for (const role of ["editor", "staff"]) {
    await assert.rejects(payload.find({ collection: "bookings", ...as(role) }), `${role} read bookings`);
    await assert.rejects(payload.findVersions({ collection: "bookings", ...as(role) }), `${role} read booking history`);
  }
  assert.ok((await payload.find({ collection: "bookings", ...as("owner") })).totalDocs >= 1);
});

test("bookings: a vehicle that is not published or not bookable is refused", async () => {
  const v = await payload.create({ collection: "vehicles", draft: true, data: { name: "Draft bus", category: (await payload.find({ collection: "fleet-categories", limit: 1 })).docs[0].id, _status: "draft" } });
  await assert.rejects(
    createBooking(payload, { name: "T", phone: "+962790000000", email: "", vehicle: v.id, start: "2030-01-01", end: "", from: "A", to: "B", message: "", lang: "ar" }, "x"),
    /vehicle/,
  );
  await payload.delete({ collection: "vehicles", id: v.id });
});

test("bookings: one address is rate limited", async () => {
  const ip = `rate-${Date.now()}`;
  const data = { name: "T", phone: "+962790000000", email: "", vehicle: null, start: "2030-01-01", end: "", from: "A", to: "B", message: "", lang: "ar" as const };
  for (let i = 0; i < 5; i++) await createBooking(payload, data, ip);
  await assert.rejects(createBooking(payload, data, ip), /rate/);
});

test("entries: only active options are accepted; staff see only their own; owner sees all", async () => {
  const opts = await payload.find({ collection: "entry-options", limit: 100, locale: "ar" });
  const pick = (list: string) => opts.docs.find((o) => o.list === list)!.id;
  const raw = Object.fromEntries(["movement", "type", "client", "trip", "bus", "driver", "authorization"].map((l) => [l, String(pick(l))]));
  const bad = await createEntry(payload, { ...raw, bus: "999999", date: "2026-11-09" }, users.staff.id);
  assert.deepEqual(bad, { ok: false, fields: ["bus"] });
  const ok = await createEntry(payload, { ...raw, date: "2026-11-09", statement: "s" }, users.staff.id);
  assert.ok(ok.ok);

  const staffView = await payload.find({ collection: "entries", ...as("staff") });
  assert.ok(staffView.docs.every((e) => (typeof e.submittedBy === "object" ? e.submittedBy?.id : e.submittedBy) === users.staff.id));
  assert.equal((await payload.find({ collection: "entries", ...as("editor") })).totalDocs, 0);
  await assert.rejects(payload.update({ collection: "entries", id: ok.id, data: { statement: "changed" }, ...as("staff") }));
});

test("content: editors manage content; staff cannot; visitors only see published", async () => {
  const cat = (await payload.find({ collection: "trip-categories", limit: 1 })).docs[0];
  const trip = await payload.create({ collection: "trips", data: { name: "Draft trip", category: cat.id, _status: "draft" }, draft: true, ...as("editor") });
  await assert.rejects(payload.create({ collection: "trips", data: { name: "x", category: cat.id }, ...as("staff") }));
  const anon = await payload.find({ collection: "trips", overrideAccess: false, where: { id: { equals: trip.id } } });
  assert.equal(anon.totalDocs, 0, "visitor saw a draft trip");
  await payload.delete({ collection: "trips", id: trip.id, ...as("editor") });
});

test("global drafts stay private until published", async () => {
  const before = await payload.findGlobal({ slug: "partners-page", locale: "ar" });
  await payload.updateGlobal({ slug: "partners-page", locale: "ar", draft: true, data: { title: "DRAFT TITLE", _status: "draft" }, ...as("editor") });
  const anon = await payload.findGlobal({ slug: "partners-page", locale: "ar", draft: true, overrideAccess: false });
  assert.equal(anon.title, before.title);
  const editor = await payload.findGlobal({ slug: "partners-page", locale: "ar", draft: true, ...as("editor") });
  assert.equal(editor.title, "DRAFT TITLE");
  await payload.updateGlobal({ slug: "partners-page", locale: "ar", data: { title: before.title, _status: "published" } });
});

test("media still in use cannot be deleted", async () => {
  const settings = await payload.findGlobal({ slug: "settings", depth: 0 });
  await assert.rejects(payload.delete({ collection: "media", id: settings.logo as number }), /still used/);
});
