import prisma from "@/lib/prisma";
import { getRepPerformance } from "@/lib/analytics";
import ReassignLeadForm from "./ReassignLeadForm";
import { Users, UserRound, Search } from "lucide-react";

export default async function SalesRepsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; rep?: string }>;
}) {
  const { q, rep: repFilter } = await searchParams;
  const query = q?.trim();

  const [repsPerformance, allReps] = await Promise.all([
    getRepPerformance(),
    prisma.user.findMany({
      where: { role: "SALES_REP" },
      select: { id: true, email: true, username: true },
      orderBy: { email: "asc" },
    }),
  ]);

  const leadWhere: Record<string, unknown> = {};

  if (query) {
    leadWhere.OR = [
      { name: { contains: query, mode: "insensitive" as const } },
      { company: { contains: query, mode: "insensitive" as const } },
      { email: { contains: query, mode: "insensitive" as const } },
    ];
  }

  if (repFilter) {
    leadWhere.assignedToId =
      repFilter === "unassigned" ? null : Number(repFilter);
  }

  const leads = await prisma.lead.findMany({
    where: leadWhere,
    orderBy: { submittedAt: "desc" },
    include: {
      assignedTo: { select: { id: true, email: true, username: true } },
    },
  });

  const totalAssignedLeads = repsPerformance.reduce(
    (sum, r) => sum + r.leads.total,
    0
  );
  const totalPipelineValue = repsPerformance.reduce(
    (sum, r) => sum + r.leads.pipelineValue,
    0
  );

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#65FFAD]">
            Admin Management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8]">
            Sales Reps
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
            View Sales Representatives and manage lead assignments from one
            place.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  Sales Reps
                </p>
                <p className="mt-3 text-3xl font-bold text-[#F5F1E8]">
                  {repsPerformance.length}
                </p>
              </div>
              <div className="rounded-xl bg-[#65FFAD]/10 p-3">
                <Users size={21} className="text-[#65FFAD]" />
              </div>
            </div>
            <p className="mt-3 text-xs text-white/40">
              Registered sales representatives
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  Assigned Leads
                </p>
                <p className="mt-3 text-3xl font-bold text-[#F5F1E8]">
                  {totalAssignedLeads}
                </p>
              </div>
              <div className="rounded-xl bg-[#65FFAD]/10 p-3">
                <UserRound size={21} className="text-[#65FFAD]" />
              </div>
            </div>
            <p className="mt-3 text-xs text-white/40">
              Leads currently assigned to reps
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  Pipeline Value
                </p>
                <p className="mt-3 text-3xl font-bold text-[#F5F1E8]">
                  $
                  {totalPipelineValue.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="rounded-xl bg-[#65FFAD]/10 p-3">
                <UserRound size={21} className="text-[#65FFAD]" />
              </div>
            </div>
            <p className="mt-3 text-xs text-white/40">
              Across all assigned leads
            </p>
          </div>
        </div>

        {/* Sales Representatives */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
              Team
            </p>
            <h2 className="mt-2 text-xl font-bold text-[#F5F1E8]">
              Sales Representatives
            </h2>
            <p className="mt-1 text-sm text-white/40">
              Review the sales team and their current lead workload.
            </p>
          </div>

          {repsPerformance.length === 0 ? (
            <div className="py-8 text-center text-sm text-white/40">
              No sales reps yet. Promote a user from{" "}
              <a href="/admin/users" className="text-[#4ade80] hover:underline">
                Users
              </a>
              .
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Representative
                    </th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Email
                    </th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Assigned Leads
                    </th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Won
                    </th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Reply Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {repsPerformance.map(({ rep, leads: repLeads, emailPerformance }) => (
                    <tr key={rep.id} className="border-b border-white/5 last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#65FFAD]/10">
                            <UserRound size={17} className="text-[#65FFAD]" />
                          </div>
                          <span className="font-semibold text-[#F5F1E8]">
                            {rep.username ?? rep.name ?? rep.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-white/50">{rep.email}</td>
                      <td className="py-4 text-sm text-white/70">
                        {repLeads.total}
                      </td>
                      <td className="py-4 text-sm text-[#65FFAD]">
                        {repLeads.won}
                      </td>
                      <td className="py-4 text-sm text-white/70">
                        {emailPerformance.replyRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Assignment */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                Lead Assignment
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#F5F1E8]">
                Assign &amp; Reassign Leads
              </h2>
              <p className="mt-1 text-sm text-white/40">
                Move leads between Sales Representatives.
              </p>
            </div>

            <form
              method="GET"
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <div className="relative w-full lg:w-72">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="text"
                  name="q"
                  defaultValue={query ?? ""}
                  placeholder="Search leads or company…"
                  className="w-full rounded-xl border border-white/10 bg-[#0A241B] py-2.5 pl-10 pr-4 text-sm text-[#F5F1E8] outline-none placeholder:text-white/30 focus:border-[#65FFAD]/40"
                />
              </div>

              <select
                name="rep"
                defaultValue={repFilter ?? ""}
                className="rounded-xl border border-white/10 bg-[#0A241B] px-4 py-2.5 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/40"
              >
                <option value="">All Sales Reps</option>
                <option value="unassigned">Unassigned</option>
                {allReps.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.username ?? r.email}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="rounded-xl bg-[#3a9e5f] px-5 py-2.5 text-sm font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Filter
              </button>
            </form>
          </div>

          {leads.length === 0 ? (
            <div className="py-12 text-center">
              <Users size={30} className="mx-auto text-white/20" />
              <p className="mt-3 text-sm text-white/40">No leads found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Lead
                    </th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Company
                    </th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Current Rep
                    </th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Reassign
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 last:border-0">
                      <td className="py-4">
                        <p className="font-semibold text-[#F5F1E8]">
                          {lead.name}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          {lead.email}
                        </p>
                      </td>
                      <td className="py-4 text-sm text-white/60">
                        {lead.company || "—"}
                      </td>
                      <td className="py-4">
                        <span className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/70">
                          {lead.assignedTo
                            ? lead.assignedTo.username ?? lead.assignedTo.email
                            : "Unassigned"}
                        </span>
                      </td>
                      <td className="py-4">
                        <ReassignLeadForm
                          leadId={lead.id}
                          assignedToId={
                            lead.assignedToId ? String(lead.assignedToId) : ""
                          }
                          reps={allReps}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}