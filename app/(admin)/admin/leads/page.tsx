import prisma from "@/lib/prisma";
import LeadStatusForm from "../LeadStatusForm";
import LeadDetailsForm from "../LeadDetailsForm";

const PRIORITY_STYLES: Record<string, string> = {
  LOW: "bg-white/[0.06] text-white/50 border-white/10",
  MEDIUM: "bg-amber-400/10 text-amber-300 border-amber-400/30",
  HIGH: "bg-red-400/10 text-red-300 border-red-400/30",
};

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();

  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { email: { contains: query, mode: "insensitive" as const } },
          { service: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [leads, admins] = await Promise.all([
    prisma.lead.findMany({ where, orderBy: { submittedAt: "desc" } }),
    prisma.user.findMany({
      where: { role: "ADMIN" },
      orderBy: { email: "asc" },
      select: { id: true, email: true, username: true },
    }),
  ]);

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-[#65FFAD]">Admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8]">
            Leads ({leads.length})
          </h1>
        </div>

        <form method="GET" className="mb-6">
          <input
            type="text"
            name="q"
            defaultValue={query ?? ""}
            placeholder="Search by name, email, or service…"
            className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-[#F5F1E8] placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          />
        </form>

        {leads.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/50">
            {query ? `No leads match "${query}".` : "No leads yet."}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[14.5px] font-bold text-[#F5F1E8]">
                        {lead.name}
                      </p>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${
                          PRIORITY_STYLES[lead.priority]
                        }`}
                      >
                        {lead.priority}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-white/50">
                      {lead.email} · {lead.service}
                    </p>
                    <p className="mt-0.5 text-[12px] text-white/30">
                      Submitted{" "}
                      {lead.submittedAt.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {lead.followUpDate && (
                        <>
                          {" · "}Follow up{" "}
                          {lead.followUpDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </>
                      )}
                      {typeof lead.estimatedValue === "number" && (
                        <>
                          {" · "}$
                          {lead.estimatedValue.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </>
                      )}
                    </p>
                    {lead.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {lead.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10.5px] text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <LeadStatusForm leadId={lead.id} status={lead.status} />
                </div>

                <details className="mt-3">
                  <summary className="cursor-pointer list-none text-[12.5px] font-semibold text-[#4ade80] transition hover:text-[#65FFAD]">
                    View message
                  </summary>
                  <p className="mt-2 whitespace-pre-wrap rounded-xl bg-black/20 p-4 text-[13.5px] leading-relaxed text-white/70">
                    {lead.message}
                  </p>
                </details>

                <details className="mt-2">
                  <summary className="cursor-pointer list-none text-[12.5px] font-semibold text-[#4ade80] transition hover:text-[#65FFAD]">
                    Manage lead
                  </summary>
                  <LeadDetailsForm
                    leadId={lead.id}
                    priority={lead.priority}
                    notes={lead.notes ?? ""}
                    followUpDate={
                      lead.followUpDate
                        ? lead.followUpDate.toISOString().slice(0, 10)
                        : ""
                    }
                    assignedToId={
                      lead.assignedToId ? String(lead.assignedToId) : ""
                    }
                    estimatedValue={
                      typeof lead.estimatedValue === "number"
                        ? String(lead.estimatedValue)
                        : ""
                    }
                    tags={lead.tags}
                    admins={admins}
                  />
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}