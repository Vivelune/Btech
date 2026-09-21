import prisma from "@/lib/prisma";

/**
 * Records one entry in a lead's activity history. `type` is intentionally
 * a free-form string (not an enum) since new activity kinds will keep
 * appearing (lead_created, lead_updated, assigned, email_sent,
 * ai_email_generated, ...) — validate against a known list at the call
 * site if a route needs to restrict which types it can log.
 */
export async function logActivity({
  leadId,
  userId,
  type,
  detail,
}: {
  leadId: string;
  userId?: number | null;
  type: string;
  detail?: string;
}) {
  await prisma.activity.create({
    data: {
      leadId,
      userId: userId ?? null,
      type,
      detail: detail ?? null,
    },
  });
}