import { NextRequest, NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import prisma from "@/lib/prisma";
import { requireStaff } from "@/lib/requireStaff";
import { logActivity } from "@/lib/activity";

function canAccess(
  user: { role: string; id: number },
  lead: { assignedToId: number | null }
) {
  return user.role === "ADMIN" || lead.assignedToId === user.id;
}

// Google deprecates specific dated model snapshots on a rolling basis
// (gemini-2.5-flash was shut down June 17, 2026, for example). The
// "-latest" alias is maintained by Google to always point at their
// current recommended flash model, so this stays working without
// needing a code change every time a model gets sunset. Pin to a
// specific version instead via GEMINI_MODEL if you need reproducible
// behavior across a model swap.
const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";

export async function POST(req: NextRequest) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  const body = await req.json().catch(() => null);

  if (
    !body ||
    typeof body.leadId !== "string" ||
    typeof body.prompt !== "string" ||
    !body.prompt.trim()
  ) {
    return NextResponse.json(
      { error: "leadId and prompt are required" },
      { status: 400 }
    );
  }

  const lead = await prisma.lead.findUnique({ where: { id: body.leadId } });
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  if (!canAccess(user, lead)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const context = `
Lead name: ${lead.name}
Service interested in: ${lead.service}
Original inquiry message: ${lead.message}
Pipeline status: ${lead.status}
Priority: ${lead.priority}
Tags: ${lead.tags.join(", ") || "none"}
Internal notes: ${lead.notes || "none"}
`.trim();

  const instructions = `You are writing a personalized outreach email on behalf of a business, addressed to the lead described below. Use the lead's context to make the email specific and relevant — do not write anything generic. Follow the sender's custom instructions exactly for tone, angle, and goal.

Lead context:
${context}

Sender's instructions:
${body.prompt.trim()}

Return only the email itself: a subject line and an HTML-formatted body suitable for sending directly. Do not leave placeholders like [Your Name] unfilled — sign off generically as "The Team" unless told otherwise.`;

  let result;
  try {
    result = await gemini.models.generateContent({
      model: MODEL,
      contents: instructions,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            subject: { type: "string" },
            body: { type: "string" },
          },
          required: ["subject", "body"],
        },
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "AI generation failed" },
      { status: 502 }
    );
  }

  let parsed: { subject: string; body: string };
  try {
    parsed = JSON.parse(result.text ?? "");
  } catch {
    return NextResponse.json(
      { error: "AI returned an unexpected format" },
      { status: 502 }
    );
  }

  await logActivity({
    leadId: lead.id,
    userId: user.id,
    type: "ai_email_generated",
    detail: `Prompt: "${body.prompt.trim().slice(0, 200)}"`,
  });

  return NextResponse.json({ subject: parsed.subject, body: parsed.body });
}