import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";

/**
 * Guard for API routes: caller must be signed in AND have role ADMIN or
 * SALES_REP. Returns { user, response: null } on success, or
 * { user: null, response } with the exact NextResponse to return on
 * failure — callers do `if (!user) return response!;`.
 */
export async function requireStaff() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (user.role !== "ADMIN" && user.role !== "SALES_REP") {
    return {
      user: null,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { user, response: null };
}