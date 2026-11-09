import { cms } from "@/lib/cms";
import { csvCell } from "@/lib/csv";

const COLUMNS = {
  bookings: ["reference", "status", "createdAt", "name", "phone", "email", "vehicleLabel", "startDate", "endDate", "from", "to", "message", "notes"],
  entries: ["createdAt", "date", "movement", "type", "client", "trip", "bus", "driver", "authorization", "statement", "submittedBy"],
} as const;

/**
 * GET /api/export?collection=bookings|entries[&status=new][&since=2026-01-01]
 * Owner only. Downloads the records as CSV (UTF-8 with BOM so Excel shows Arabic correctly).
 */
export async function GET(request: Request) {
  const payload = await cms();
  const { user } = await payload.auth({ headers: request.headers });
  if ((user as { role?: string } | null)?.role !== "owner") return new Response("Forbidden", { status: 403 });

  const url = new URL(request.url);
  const collection = url.searchParams.get("collection");
  if (collection !== "bookings" && collection !== "entries") return new Response("Unknown collection", { status: 400 });
  const status = url.searchParams.get("status");
  const since = url.searchParams.get("since");

  const { docs } = await payload.find({
    collection,
    depth: 1,
    limit: 10_000,
    pagination: false,
    sort: "-createdAt",
    overrideAccess: false,
    user,
    where: {
      and: [
        ...(status && collection === "bookings" ? [{ status: { equals: status } }] : []),
        ...(since && /^\d{4}-\d{2}-\d{2}$/.test(since) ? [{ createdAt: { greater_than_equal: since } }] : []),
      ],
    },
  });

  const cols = COLUMNS[collection];
  const rows = docs.map((d) =>
    cols
      .map((c) => {
        const v = (d as unknown as Record<string, unknown>)[c];
        return csvCell(v && typeof v === "object" ? ((v as { email?: string }).email ?? "") : v);
      })
      .join(","),
  );
  const body = "﻿" + [cols.join(","), ...rows].join("\r\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${collection}-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
