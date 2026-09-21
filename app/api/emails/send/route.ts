import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import prisma from "@/lib/prisma";
import { requireStaff } from "@/lib/requireStaff";
import { logActivity } from "@/lib/activity";

function canAccess(
  user: { role: string; id: number },
  lead: { assignedToId: number | null }
) {
  return user.role === "ADMIN" || lead.assignedToId === user.id;
}

// Resend gives every account a working sender for testing before a
// custom domain is verified. Override with RESEND_FROM_ADDRESS once
// you've verified your own domain in the Resend dashboard.
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS || "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  const body = await req.json().catch(() => null);

  if (
    !body ||
    typeof body.leadId !== "string" ||
    typeof body.subject !== "string" ||
    typeof body.body !== "string"
  ) {
    return NextResponse.json(
      { error: "leadId, subject, and body are required" },
      { status: 400 }
    );
  }

  const lead = await prisma.lead.findUnique({ where: { id: body.leadId } });
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  if (!canAccess(user, lead)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Create the row first as QUEUED so there's a record even if the
  // send call below fails partway through.
  const emailRecord = await prisma.email.create({
    data: {
      leadId: lead.id,
      sentById: user.id,
      subject: body.subject,
      body: body.body,
      status: "QUEUED",
    },
  });

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: lead.email,
    subject: body.subject,
    html: body.body,
  });

  if (error || !data) {
    await prisma.email.update({
      where: { id: emailRecord.id },
      data: { status: "FAILED" },
    });
    return NextResponse.json(
      { error: error?.message ?? "Send failed" },
      { status: 502 }
    );
  }

  const sentEmail = await prisma.email.update({
    where: { id: emailRecord.id },
    data: {
      status: "SENT",
      providerId: data.id,
      sentAt: new Date(),
    },
  });

  await logActivity({
    leadId: lead.id,
    userId: user.id,
    type: "email_sent",
    detail: `Sent: "${body.subject}"`,
  });

  return NextResponse.json({ email: sentEmail }, { status: 201 });
}