"use client";

import { demoLeads } from "../sales-data";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function LeadSelector({
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-emerald-100">
        Select Lead
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-emerald-900/50 bg-[#0b241b] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-emerald-400"
      >
        <option value="">Choose a lead...</option>

        {demoLeads.map((lead) => (
          <option key={lead.id} value={lead.id}>
            {lead.name} — {lead.company}
          </option>
        ))}
      </select>
    </div>
  );
}