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

export async function GET(req: NextRequest) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const tag = searchParams.get("tag");
  const assignedToIdParam = searchParams.get("assignedToId");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize")) || 25));

  const where: Record<string, unknown> = {};

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { company: { contains: q, mode: "insensitive" } },
      { service: { contains: q, mode: "insensitive" } },
    ];
  }
  if (status && VALID_STATUSES.includes(status as LeadStatus)) where.status = status;
  if (priority && VALID_PRIORITIES.includes(priority as Priority)) where.priority = priority;
  if (tag) where.tags = { has: tag };

  if (user.role === "SALES_REP") {
    // Sales reps only ever see their own leads — override whatever
    // assignedToId (if any) was passed in the query string.
    where.assignedToId = user.id;
  } else if (assignedToIdParam) {
    const id = Number(assignedToIdParam);
    if (!Number.isNaN(id)) where.assignedToId = id;
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { submittedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        assignedTo: { select: { id: true, email: true, username: true } },
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({ leads, total, page, pageSize });
}

export async function POST(req: NextRequest) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  const body = await req.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    !body.name.trim() ||
    !body.email.trim()
  ) {
    return NextResponse.json(
      { error: "name and email are required" },
      { status: 400 }
    );
  }

  // Sales reps can create leads, but only assigned to themselves.
  const assignedToId =
    user.role === "SALES_REP"
      ? user.id
      : typeof body.assignedToId === "number"
      ? body.assignedToId
      : null;

  const tags = Array.isArray(body.tags)
    ? body.tags.filter((t: unknown) => typeof t === "string")
    : [];

  const priority = VALID_PRIORITIES.includes(body.priority)
    ? body.priority
    : "MEDIUM";

  const lead = await prisma.lead.create({
    data: {
      name: body.name.trim(),
      email: body.email.trim(),
      company: typeof body.company === "string" ? body.company.trim() || null : null,
      phone: typeof body.phone === "string" ? body.phone.trim() || null : null,
      website: typeof body.website === "string" ? body.website.trim() || null : null,
      service: typeof body.service === "string" ? body.service.trim() || null : null,
      message: typeof body.message === "string" ? body.message : "",
      priority,
      tags,
      estimatedValue:
        typeof body.estimatedValue === "number" ? body.estimatedValue : null,
      assignedToId,
    },
  });

  await logActivity({
    leadId: lead.id,
    userId: user.id,
    type: "lead_created",
    detail: "Created manually via API",
  });

  return NextResponse.json({ lead }, { status: 201 });
}