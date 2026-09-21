import {
  Building2,
  Globe,
  Mail,
  Phone,
  User,
} from "lucide-react";

import type { Lead } from "../sales-data";
import LeadTimeline from "./LeadTimeline";
import LeadStatusDropdown from "./leadStatusDropdown";

export default function LeadDetail({
  lead,
}: {
  lead: Lead;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

      <div className="space-y-6">

        <div className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                <User size={25} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {lead.name}
                </h2>

                <p className="mt-1 text-sm text-emerald-100/50">
                  {lead.id}
                </p>
              </div>
            </div>

            <LeadStatusDropdown
              status={lead.status}
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-6">
          <h2 className="text-lg font-bold">
            Lead Information
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <Info
              icon={Building2}
              label="Company"
              value={lead.company}
            />

            <Info
              icon={Mail}
              label="Email"
              value={lead.email}
            />

            <Info
              icon={Phone}
              label="Phone"
              value={lead.phone}
            />

            <Info
              icon={Globe}
              label="Website"
              value={lead.website}
            />
          </div>
        </div>

        <LeadTimeline />
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-6">
          <h2 className="text-lg font-bold">
            Sales Information
          </h2>

          <div className="mt-5 space-y-4">
            <Row label="Service" value={lead.service} />
            <Row label="Priority" value={lead.priority} />
            <Row label="Assigned To" value={lead.assignedTo} />
            <Row label="Last Activity" value={lead.lastActivity} />
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-[#071a13] hover:bg-emerald-300"
        >
          Edit Lead
        </button>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-300/60">
        <Icon size={14} />
        {label}
      </div>

      <p className="break-all text-sm text-[#F5F1E8]">
        {value}
      </p>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3">
      <span className="text-sm text-emerald-100/50">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#F5F1E8]">
        {value}
      </span>
    </div>
  );
}