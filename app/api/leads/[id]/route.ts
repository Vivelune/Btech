import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireStaff } from "@/lib/requireStaff";
import { logActivity } from "@/lib/activity";
import type { LeadStatus, Priority } from "@/app/generated/prisma/client";

const VALID_STATUSES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "REPLIED",
  "INTERESTED",
  "MEETING_BOOKED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
];
const VALID_PRIORITIES: Priority[] = ["LOW", "MEDIUM", "HIGH"];
const VALID_TAGS = ["Web Development", "SEO", "E-commerce", "Maintenance"];

function canAccess(
  user: { role: string; id: number },
  lead: { assignedToId: number | null }
) {
  return user.role === "ADMIN" || lead.assignedToId === user.id;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      assignedTo: { select: { id: true, email: true, username: true } },
      activities: {
        orderBy: { createdAt: "desc" },
        include: { user: { select: { id: true, email: true, username: true } } },
      },
      emails: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!canAccess(user, lead)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ lead });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  const { id } = await params;
  const existing = await prisma.lead.findUnique({ where: { id } });

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!canAccess(user, existing)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const data: {
    status?: LeadStatus;
    priority?: Priority;
    notes?: string | null;
    followUpDate?: Date | null;
    estimatedValue?: number | null;
    tags?: string[];
    company?: string | null;
    phone?: string | null;
    website?: string | null;
    service?: string | null;
    name?: string;
    email?: string;
  } = {};
  const changes: string[] = [];

  if (
    typeof body.status === "string" &&
    VALID_STATUSES.includes(body.status as LeadStatus) &&
    body.status !== existing.status
  ) {
    data.status = body.status as LeadStatus;
    changes.push(`status: ${existing.status} → ${body.status}`);
  }

  if (
    typeof body.priority === "string" &&
    VALID_PRIORITIES.includes(body.priority as Priority) &&
    body.priority !== existing.priority
  ) {
    data.priority = body.priority as Priority;
    changes.push(`priority: ${existing.priority} → ${body.priority}`);
  }

  if (typeof body.notes === "string") {
    data.notes = body.notes.trim() || null;
  }

  if (typeof body.followUpDate === "string" || body.followUpDate === null) {
    data.followUpDate = body.followUpDate ? new Date(body.followUpDate) : null;
  }

  if (typeof body.estimatedValue === "number" || body.estimatedValue === null) {
    data.estimatedValue = body.estimatedValue;
  }

  if (Array.isArray(body.tags)) {
    data.tags = body.tags.filter(
      (t: unknown) => typeof t === "string" && VALID_TAGS.includes(t)
    );
  }

  if (typeof body.name === "string" && body.name.trim()) {
    data.name = body.name.trim();
  }

  if (typeof body.email === "string" && body.email.trim()) {
    data.email = body.email.trim();
  }

  if (typeof body.company === "string" || body.company === null) {
    data.company = body.company?.trim() || null;
  }

  if (typeof body.phone === "string" || body.phone === null) {
    data.phone = body.phone?.trim() || null;
  }

  if (typeof body.website === "string" || body.website === null) {
    data.website = body.website?.trim() || null;
  }

  if (typeof body.service === "string" || body.service === null) {
    data.service = body.service?.trim() || null;
  }

  const lead = await prisma.lead.update({ where: { id }, data });

  if (changes.length > 0) {
    await logActivity({
      leadId: id,
      userId: user.id,
      type: "lead_updated",
      detail: changes.join("; "),
    });
  }

  return NextResponse.json({ lead });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Only admins can delete leads" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const deleted = await prisma.lead.delete({ where: { id } }).catch(() => null);

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}