import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const [totalLeads, totalUsers, statusCounts, roleCounts] =
    await Promise.all([
      prisma.lead.count(),
      prisma.user.count(),
      prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.user.groupBy({ by: ["role"], _count: { _all: true } }),
    ]);

  const newLeads =
    statusCounts.find((s) => s.status === "NEW")?._count._all ?? 0;
  const admins = roleCounts.find((r) => r.role === "ADMIN")?._count._all ?? 0;

  const stats = [
    { label: "Total Leads", value: totalLeads },
    { label: "New Leads", value: newLeads },
    { label: "Total Users", value: totalUsers },
    { label: "Admins", value: admins },
  ];

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#65FFAD]">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8]">
            Overview
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-[28px] font-bold text-[#F5F1E8]">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-white/40">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}