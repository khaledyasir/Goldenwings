import { NextResponse, type NextRequest } from "next/server";
import { cms, EDIT_COOKIE } from "@/lib/cms";

/** Same-site relative paths only: one leading slash, no `//host`, no backslash tricks */
function safePath(p: string | null) {
  return p && /^\/(?![/\\])[^\\\u0000-\u001f]*$/.test(p) ? p : "/";
}

/** Relative Location: behind IIS, request.url is the internal 127.0.0.1:3000 address, not the public domain */
function redirectTo(path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const path = safePath(searchParams.get("path"));

  if (searchParams.get("off") === "1") {
    const res = redirectTo(path);
    res.cookies.delete(EDIT_COOKIE);
    return res;
  }

  const { user } = await (await cms()).auth({ headers: request.headers });
  const role = (user as { role?: string } | null)?.role;
  if (role !== "owner" && role !== "editor") {
    const back = request.nextUrl.pathname + request.nextUrl.search;
    return redirectTo(`/admin/login?redirect=${encodeURIComponent(back)}`);
  }

  const res = redirectTo(path);
  res.cookies.set(EDIT_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
