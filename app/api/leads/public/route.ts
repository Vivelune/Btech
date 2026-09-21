import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/activity";

/**
 * Public lead-intake endpoint — no authentication required. This is what
 * the site's own contact form (app/contactform/page.tsx) should call.
 *
 * Deliberately separate from POST /api/leads, which is staff-only and
 * accepts CRM-management fields (priority, tags, assignedToId) that a
 * random site visitor should never be able to set on their own
 * submission.
 */
export async function POST(req: NextRequest) {
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

  const lead = await prisma.lead.create({
    data: {
      name: body.name.trim(),
      email: body.email.trim(),
      company:
        typeof body.company === "string" ? body.company.trim() || null : null,
      phone: typeof body.phone === "string" ? body.phone.trim() || null : null,
      website:
        typeof body.website === "string" ? body.website.trim() || null : null,
      service:
        typeof body.service === "string" ? body.service.trim() || null : null,
      message: typeof body.message === "string" ? body.message : "",
    },
  });

  await logActivity({
    leadId: lead.id,
    type: "lead_created",
    detail: "Submitted via public contact form",
  });

  return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
}