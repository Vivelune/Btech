import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireStaff } from "@/lib/requireStaff";

function pct(numerator: number, denominator: number) {
  return denominator > 0 ? Math.round((numerator / denominator) * 1000) / 10 : 0;
}

type DayCounts = {
  sent: number;
  delivered: number;
  opened: number;
  bounced: number;
  replied: number;
};

export async function GET(req: NextRequest) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  const { searchParams } = new URL(req.url);
  const days = Math.min(365, Math.max(1, Number(searchParams.get("days")) || 30));
  const since = new Date();
  since.setDate(since.getDate() - days);

  const where: Record<string, unknown> = { createdAt: { gte: since } };

  // Sales reps only ever see their own send performance; admins see all.
  if (user.role === "SALES_REP") {
    where.sentById = user.id;
  }

  const emails = await prisma.email.findMany({
    where,
    select: {
      sentAt: true,
      deliveredAt: true,
      openedAt: true,
      bouncedAt: true,
      repliedAt: true,
    },
  });

  // Counted from the individual timestamp fields, not the `status`
  // column — status only reflects an email's most advanced stage, so
  // an email that's now OPENED no longer reads as DELIVERED even
  // though it was. The timestamps don't get overwritten as an email
  // progresses, so they give accurate funnel totals.
  const totalSent = emails.filter((e) => e.sentAt).length;
  const totalDelivered = emails.filter((e) => e.deliveredAt).length;
  const totalOpened = emails.filter((e) => e.openedAt).length;
  const totalBounced = emails.filter((e) => e.bouncedAt).length;
  const totalReplied = emails.filter((e) => e.repliedAt).length;

  const timelineMap = new Map<string, DayCounts>();

  function bump(date: Date | null, key: keyof DayCounts) {
    if (!date) return;
    const day = date.toISOString().slice(0, 10);
    const entry =
      timelineMap.get(day) ?? {
        sent: 0,
        delivered: 0,
        opened: 0,
        bounced: 0,
        replied: 0,
      };
    entry[key]++;
    timelineMap.set(day, entry);
  }

  for (const e of emails) {
    bump(e.sentAt, "sent");
    bump(e.deliveredAt, "delivered");
    bump(e.openedAt, "opened");
    bump(e.bouncedAt, "bounced");
    bump(e.repliedAt, "replied");
  }

  const timeline = Array.from(timelineMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, counts]) => ({ date, ...counts }));

  return NextResponse.json({
    rangeDays: days,
    totalSent,
    totalDelivered,
    totalOpened,
    totalBounced,
    totalReplied,
    openRate: pct(totalOpened, totalDelivered || totalSent),
    replyRate: pct(totalReplied, totalSent),
    bounceRate: pct(totalBounced, totalSent),
    timeline,
  });
}