import assert from "node:assert/strict";
import { test } from "node:test";
import { newReference, validateBooking } from "../src/lib/bookings.ts";
import { csvCell } from "../src/lib/csv.ts";

const TODAY = new Date("2026-11-09T10:00:00Z");
const valid = { name: "سامي", phone: "+962 79 629 0390", email: "", vehicle: "3", start: "2026-11-20", end: "", from: "عمّان", to: "البتراء", message: "", lang: "ar" };

test("valid booking passes and is normalized", () => {
  const r = validateBooking({ ...valid, name: "  سامي  " }, TODAY);
  assert.ok(r.ok);
  assert.equal(r.data.name, "سامي");
  assert.equal(r.data.vehicle, 3);
});

test("invalid booking fields are reported", () => {
  const r = validateBooking({ ...valid, phone: "abc", email: "x@", start: "2020-01-01", end: "2019-01-01", from: "" }, TODAY);
  assert.ok(!r.ok);
  assert.deepEqual([...r.fields].sort(), ["email", "end", "from", "phone", "start"]);
});

test("end date before start is rejected, same day accepted", () => {
  assert.ok(!validateBooking({ ...valid, end: "2026-11-19" }, TODAY).ok);
  assert.ok(validateBooking({ ...valid, end: "2026-11-20" }, TODAY).ok);
});

test("honeypot marks spam", () => {
  const r = validateBooking({ ...valid, website: "http://spam" }, TODAY);
  assert.ok(!r.ok && r.spam);
});

test("over-long input is rejected, not silently truncated", () => {
  assert.ok(!validateBooking({ ...valid, name: "x".repeat(101) }, TODAY).ok);
  assert.ok(!validateBooking({ ...valid, message: "x".repeat(2001) }, TODAY).ok);
});

test("non-numeric vehicle id is ignored", () => {
  const r = validateBooking({ ...valid, vehicle: "1 OR 1=1" }, TODAY);
  assert.ok(r.ok && r.data.vehicle === null);
});

test("booking references are readable and unique enough", () => {
  const refs = new Set(Array.from({ length: 2000 }, () => newReference(TODAY)));
  assert.ok(refs.size > 1990);
  for (const r of refs) assert.match(r, /^GW-261109-[A-HJ-NP-Z2-9]{5}$/);
});

test("CSV cells are quoted and formulas defused", () => {
  assert.equal(csvCell('a "b"'), '"a ""b"""');
  assert.equal(csvCell("=HYPERLINK(1)"), `"'=HYPERLINK(1)"`);
  assert.equal(csvCell("+962"), `"'+962"`);
  assert.equal(csvCell(null), '""');
});
