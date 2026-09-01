import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  checkPassword,
  isConfigured,
  mintToken,
} from "@/lib/admin";

export async function POST(request: Request) {
  if (!isConfigured()) {
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  // A uniform delay on failure so the endpoint is not a fast password oracle.
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ ok: false, reason: "wrong-password" }, { status: 401 });
  }

  const token = mintToken();
  if (!token) {
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
