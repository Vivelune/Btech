<<<<<<< Updated upstream
import Link from "next/link";
import { ArrowRight, Search, Users } from "lucide-react";
import { getLeads } from "@/lib/leads-data";
import { LeadStatus } from "@/lib/leads";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await getLeads();
=======

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      submittedAt: "desc",
    },
  });
>>>>>>> Stashed changes

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#65FFAD]/10 p-3 text-[#65FFAD]">
              <Users size={24} />
            </div>

            <div>
              <p className="text-sm font-medium text-[#65FFAD]">
                Management
              </p>

              <h1 className="text-3xl font-bold text-[#F5F1E8]">
                Leads
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#C9D4CD]">
            View and manage leads from the BTECH platform.
          </p>
        </div>

        {/* Total leads */}
        <div className="mb-6 rounded-2xl border border-emerald-900/60 bg-[#0A241B] p-5">
          <p className="text-sm text-emerald-200/60">
            Total Leads
          </p>

          <p className="mt-1 text-3xl font-bold text-[#65FFAD]">
            {leads.length}
          </p>
        </div>

        {/* Leads table */}
        <div className="overflow-hidden rounded-2xl border border-emerald-900/60 bg-[#0A241B]">
<<<<<<< Updated upstream
          {leads.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-emerald-200/60">
              No leads yet. Submissions from the contact form will show up here.
            </div>
          ) : (
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="border-b border-emerald-900/60 bg-[#0D3024]">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Name
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Email
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Service
                    </th>

=======

          {leads.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Users
                size={40}
                className="mx-auto mb-4 text-emerald-300/40"
              />

              <h2 className="text-lg font-semibold text-[#F5F1E8]">
                No leads yet
              </h2>

              <p className="mt-2 text-sm text-[#C9D4CD]">
                When someone submits the contact form, the lead will
                appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-emerald-900/60 bg-[#0D3024]">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Name
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Email
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Service
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Submitted
                    </th>

>>>>>>> Stashed changes
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                      Action
                    </th>
                  </tr>
                </thead>
<<<<<<< Updated upstream

                <tbody className="divide-y divide-emerald-900/50">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="transition hover:bg-emerald-950/40"
                    >
                      <td className="px-6 py-5">
                        <div className="font-medium text-[#F5F1E8]">
                          {lead.name}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-[#D8E1DB]">
                        {lead.email}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={lead.status} />
                      </td>

                      <td className="px-6 py-5 text-sm text-[#D8E1DB]">
                        {lead.service}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#65FFAD] px-4 py-2 text-sm font-semibold text-[#062017] transition hover:bg-[#8AFFC2]"
                        >
                          View
                          <ArrowRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
=======

                <tbody className="divide-y divide-emerald-900/50">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="transition hover:bg-emerald-950/40"
                    >
                      {/* Name */}
                      <td className="px-6 py-5">
                        <div className="font-medium text-[#F5F1E8]">
                          {lead.name}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-5 text-sm text-[#D8E1DB]">
                        {lead.email}
                      </td>

                      {/* Service */}
                      <td className="px-6 py-5 text-sm text-[#D8E1DB]">
                        {lead.service}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <StatusBadge status={lead.status} />
                      </td>

                      {/* Submitted */}
                      <td className="px-6 py-5 text-sm text-[#D8E1DB]">
                        {new Date(
                          lead.submittedAt
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#65FFAD] px-4 py-2 text-sm font-semibold text-[#062017] transition hover:bg-[#8AFFC2]"
                        >
                          View
                          <ArrowRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

>>>>>>> Stashed changes
        </div>
      </div>
    </section>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span className="inline-flex rounded-full border border-[#65FFAD]/40 bg-[#65FFAD]/10 px-3 py-1 text-xs font-medium uppercase text-[#65FFAD]">
      {status}
    </span>
  );
}
