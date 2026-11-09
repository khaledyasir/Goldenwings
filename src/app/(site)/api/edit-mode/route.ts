import { NextResponse, type NextRequest } from "next/server";
import { cms, EDIT_COOKIE } from "@/lib/cms";

/** Same-site relative paths only: one leading slash, no `//host`, no backslash tricks */
function safePath(p: string | null) {
  return p && /^\/(?![/\\])[^\\\u0000-\u001f]*$/.test(p) ? p : "/";
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const path = safePath(searchParams.get("path"));

  if (searchParams.get("off") === "1") {
    const res = NextResponse.redirect(new URL(path, request.url), 303);
    res.cookies.delete(EDIT_COOKIE);
    return res;
  }

  const { user } = await (await cms()).auth({ headers: request.headers });
  const role = (user as { role?: string } | null)?.role;
  if (role !== "owner" && role !== "editor") {
    const back = request.nextUrl.pathname + request.nextUrl.search;
    return NextResponse.redirect(new URL(`/admin/login?redirect=${encodeURIComponent(back)}`, request.url), 303);
  }

  const res = NextResponse.redirect(new URL(path, request.url), 303);
  res.cookies.set(EDIT_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
