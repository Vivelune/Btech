import Link from "next/link";
import { ArrowRight, Search, Users } from "lucide-react";
import { leads } from "@/lib/leads-data";
import { LeadStatus } from "@/lib/leads";

export default function LeadsPage() {
  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
            View and manage leads from the ALHAJIBTECH platform.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-emerald-900/60 bg-[#0A241B] p-4">
          <div className="flex items-center gap-3">
            <Search
              size={20}
              className="text-emerald-300/60"
            />

            <input
              type="search"
              placeholder="Search leads..."
              className="w-full bg-transparent text-sm text-[#F5F1E8] outline-none placeholder:text-emerald-200/40"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-900/60 bg-[#0A241B]">
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

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-emerald-200/70">
                    Action
                  </th>
                </tr>
              </thead>

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

          
        </div>
      </div>
    </section>
  );
}

function StatusBadge({
  status,
}: {
  status: LeadStatus
}) {
  return (
    <span className="inline-flex rounded-full uppercase border border-[#65FFAD]/40 bg-[#65FFAD]/10 px-3 py-1 text-xs font-medium text-[#65FFAD]">
      {status}
    </span>
  );
}