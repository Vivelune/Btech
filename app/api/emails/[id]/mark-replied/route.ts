import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireStaff } from "@/lib/requireStaff";
import { logActivity } from "@/lib/activity";

function canAccess(
  user: { role: string; id: number },
  lead: { assignedToId: number | null }
) {
  return user.role === "ADMIN" || lead.assignedToId === user.id;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  const { id } = await params;

  const email = await prisma.email.findUnique({
    where: { id },
    include: { lead: true },
  });

  if (!email) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!canAccess(user, email.lead)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.email.update({
    where: { id },
    data: { status: "REPLIED", repliedAt: new Date() },
  });

  await logActivity({
    leadId: email.leadId,
    userId: user.id,
    type: "email_replied",
    detail: "Marked as replied manually",
  });

  return NextResponse.json({ email: updated });
}