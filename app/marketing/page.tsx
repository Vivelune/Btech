import prisma from "@/lib/prisma";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-[28px] font-bold text-[#F5F1E8]">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-white/40">
        {label}
      </p>
    </div>
  );
}

function BreakdownCard({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/40">
        {title}
      </p>
      {entries.length === 0 ? (
        <p className="text-sm text-white/40">No data yet.</p>
      ) : (
        <div className="space-y-2">
          {entries.map(([key, count]) => (
            <div
              key={key}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-white/70">{key}</span>
              <span className="font-bold text-[#65FFAD]">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function MarketingDashboard() {
  const leads = await prisma.lead.findMany({
    select: { status: true, tags: true, estimatedValue: true },
  });

  const totalLeads = leads.length;
  const totalPipelineValue = leads.reduce(
    (sum, l) => sum + (l.estimatedValue ?? 0),
    0
  );

  const statusCounts: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};

  for (const lead of leads) {
    statusCounts[lead.status] = (statusCounts[lead.status] ?? 0) + 1;
    for (const tag of lead.tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#65FFAD]">Marketing</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8]">
            Dashboard
          </h1>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Total Leads" value={totalLeads} />
          <StatCard
            label="Pipeline Value"
            value={`$${totalPipelineValue.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`}
          />
          <StatCard label="Won" value={statusCounts["WON"] ?? 0} />
          <StatCard label="Lost" value={statusCounts["LOST"] ?? 0} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BreakdownCard title="Leads by Status" data={statusCounts} />
          <BreakdownCard title="Leads by Tag" data={tagCounts} />
        </div>
      </div>
    </section>
  );
}