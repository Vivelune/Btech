import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import LeadDetail from "@/app/components/sales/leads/LeadDetail";
import { demoLeads } from "@/app/components/sales/sales-data";

export default async function LeadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const lead =
    demoLeads.find((item) => item.id === id) ??
    demoLeads[0];

  return (
    <div className="min-h-screen bg-[#071a13] px-4 py-6 text-[#F5F1E8] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/sales/leads"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
        >
          <ArrowLeft size={17} />
          Back to Leads
        </Link>

        <div className="mb-8">
          <p className="text-sm text-emerald-300">
            Sales / Leads / {lead.id}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Lead Details
          </h1>
        </div>

        <LeadDetail lead={lead} />
      </div>
    </div>
  );
}