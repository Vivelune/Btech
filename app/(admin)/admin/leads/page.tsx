import prisma from "@/lib/prisma";
import LeadStatusForm from "../LeadStatusForm";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { submittedAt: "desc" },
  });

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#65FFAD]">Admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8]">
            Leads ({leads.length})
          </h1>
        </div>

        {leads.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/50">
            No leads yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[14.5px] font-bold text-[#F5F1E8]">
                      {lead.name}
                    </p>
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
                    </p>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}