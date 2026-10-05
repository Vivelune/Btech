import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/requireStaff";
import { getRepPerformance } from "@/lib/analytics";

export async function GET() {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admins only" }, { status: 403 });
  }

  const reps = await getRepPerformance();

  return NextResponse.json({ reps });
}