import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Building2,
  Pencil,
} from "lucide-react";
import { salesLeads, leadStatuses } from "@/lib/sale-data";
import LeadStatusBadge from "../../leadStatusBadge";
import LeadTimeline from "../../leadTimeline";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const lead = salesLeads.find((item) => item.id === id);

  if (!lead) {
    return (
      <section className="min-h-screen bg-[#061A13] px-6 py-12">
        <h1 className="text-2xl font-bold text-[#F5F1E8]">
          Lead not found
        </h1>

        <Link
          href="/sales/leads"
          className="mt-4 inline-block text-[#65FFAD]"
        >
          Back to leads
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/sales/leads"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#65FFAD]"
        >
          <ArrowLeft size={16} />
          Back to leads
        </Link>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-[#65FFAD]">
                  Lead Details
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#F5F1E8]">
                  {lead.name}
                </h1>

                <p className="mt-1 text-white/45">
                  {lead.company}
                </p>
              </div>

              <LeadStatusBadge status={lead.status} />
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/65">
                <Mail size={18} className="text-[#65FFAD]" />
                {lead.email}
              </div>

              <div className="flex items-center gap-3 text-sm text-white/65">
                <Phone size={18} className="text-[#65FFAD]" />
                {lead.phone}
              </div>

              <div className="flex items-center gap-3 text-sm text-white/65">
                <Globe size={18} className="text-[#65FFAD]" />
                {lead.website}
              </div>

              <div className="flex items-center gap-3 text-sm text-white/65">
                <Building2 size={18} className="text-[#65FFAD]" />
                {lead.company}
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <label className="mb-2 block text-sm font-medium text-white/70">
                Move Lead Status
              </label>

              <select
                defaultValue={lead.status}
                className="w-full rounded-xl border border-white/10 bg-[#102D22] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/50"
              >
                {leadStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <button className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[#F5F1E8] hover:bg-white/[0.05]">
              <Pencil size={16} />
              Edit Lead
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6">
            <h2 className="text-lg font-semibold text-[#F5F1E8]">
              Activity History
            </h2>

            <p className="mt-1 mb-7 text-sm text-white/40">
              Timeline of actions taken on this lead.
            </p>

            <LeadTimeline />
          </div>
        </div>
      </div>
    </section>
  );
}