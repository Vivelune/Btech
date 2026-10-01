import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// ---------------------------------------------------------------------------
// GET /api/role
//
// Returns the signed-in user's role so the navbar can decide between
// "Account", "Admin", and "Sales" links. Returns { role: null } for
// signed-out visitors or users with no matching row, rather than a
// non-2xx status — the navbar treats any non-ok response as "unknown",
// so keeping this a 200 avoids it silently swallowing real errors.
// ---------------------------------------------------------------------------

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ role: null });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    });

    return NextResponse.json({ role: user?.role ?? null });
  } catch (error) {
    console.error("[/api/role] failed to load role", error);

    return NextResponse.json({ role: null }, { status: 500 });
  }
}
