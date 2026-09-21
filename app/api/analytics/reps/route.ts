import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireStaff } from "@/lib/requireStaff";

function pct(numerator: number, denominator: number) {
  return denominator > 0 ? Math.round((numerator / denominator) * 1000) / 10 : 0;
}

export async function GET() {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admins only" }, { status: 403 });
  }

  const reps = await prisma.user.findMany({
    where: { role: "SALES_REP" },
    select: { id: true, email: true, username: true, name: true },
    orderBy: { email: "asc" },
  });

  const results = await Promise.all(
    reps.map(async (rep) => {
      const [leads, emails] = await Promise.all([
        prisma.lead.findMany({
          where: { assignedToId: rep.id },
          select: {
            id: true,
            name: true,
            email: true,
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

      // Same timestamp-based counting as /api/analytics/overview — see
      // that route for why status alone would undercount.
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

  return NextResponse.json({ reps: results });
}