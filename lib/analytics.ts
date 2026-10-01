import prisma from "@/lib/prisma";

export function pct(numerator: number, denominator: number) {
  return denominator > 0 ? Math.round((numerator / denominator) * 1000) / 10 : 0;
}

/**
 * Every sales rep, their assigned leads, and their email performance.
 * Shared by GET /api/analytics/reps and app/admin/sales-reps/page.tsx —
 * a Server Component should call this directly rather than fetching its
 * own API route.
 */
export async function getRepPerformance() {
  const reps = await prisma.user.findMany({
    where: { role: "SALES_REP" },
    select: { id: true, email: true, username: true, name: true },
    orderBy: { email: "asc" },
  });

  return Promise.all(
    reps.map(async (rep) => {
      const [leads, emails] = await Promise.all([
        prisma.lead.findMany({
          where: { assignedToId: rep.id },
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            status: true,
            priority: true,
            estimatedValue: true,
          },
        }),
        prisma.email.findMany({
          where: { sentById: rep.id },
          select: {
            sentAt: true,
            deliveredAt: true,
            openedAt: true,
            bouncedAt: true,
            repliedAt: true,
          },
        }),
      ]);

      // Timestamp-based counting, not the `status` column — status only
      // reflects an email's most advanced stage, so an OPENED email no
      // longer reads as DELIVERED even though it was. Timestamps don't
      // get overwritten as an email progresses, so they give accurate
      // funnel totals.
      const sent = emails.filter((e) => e.sentAt).length;
      const delivered = emails.filter((e) => e.deliveredAt).length;
      const opened = emails.filter((e) => e.openedAt).length;
      const bounced = emails.filter((e) => e.bouncedAt).length;
      const replied = emails.filter((e) => e.repliedAt).length;

      const won = leads.filter((l) => l.status === "CONVERTED").length;
      const pipelineValue = leads.reduce(
        (sum, l) => sum + (l.estimatedValue ?? 0),
        0
      );

      return {
        rep,
        leads: {
          total: leads.length,
          won,
          pipelineValue,
          list: leads,
        },
        emailPerformance: {
          sent,
          delivered,
          opened,
          bounced,
          replied,
          openRate: pct(opened, delivered || sent),
          replyRate: pct(replied, sent),
          bounceRate: pct(bounced, sent),
        },
      };
    })
  );
}