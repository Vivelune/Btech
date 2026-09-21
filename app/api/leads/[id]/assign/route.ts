import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireStaff } from "@/lib/requireStaff";
import { logActivity } from "@/lib/activity";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Only admins can assign leads" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);

  if (!body || (body.assignedToId !== null && typeof body.assignedToId !== "number")) {
    return NextResponse.json(
      { error: "assignedToId must be a number or null" },
      { status: 400 }
    );
  }

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let assigneeLabel = "Unassigned";

  if (body.assignedToId !== null) {
    const assignee = await prisma.user.findUnique({
      where: { id: body.assignedToId },
    });

    if (!assignee) {
      return NextResponse.json({ error: "Assignee not found" }, { status: 400 });
    }

    assigneeLabel = assignee.username ?? assignee.email;
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: { assignedToId: body.assignedToId },
  });

  await logActivity({
    leadId: id,
    userId: user.id,
    type: "assigned",
    detail: `Assigned to ${assigneeLabel}`,
  });

  return NextResponse.json({ lead: updated });
}