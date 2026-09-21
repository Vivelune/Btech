"use client";

import { Filter } from "lucide-react";
import { pipelineStatuses } from "../sales-data";

type Props = {
  status: string;
  company: string;
  onStatusChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
};

export default function LeadFilters({
  status,
  company,
  onStatusChange,
  onCompanyChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative">
        <Filter
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200/50"
        />

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none rounded-xl border border-emerald-900/50 bg-[#0b241b] py-3 pl-9 pr-8 text-sm text-[#F5F1E8] outline-none focus:border-emerald-400"
        >
          <option value="">All statuses</option>

          {pipelineStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <input
        value={company}
        onChange={(e) => onCompanyChange(e.target.value)}
        placeholder="Filter company..."
        className="rounded-xl border border-emerald-900/50 bg-[#0b241b] px-4 py-3 text-sm text-[#F5F1E8] outline-none placeholder:text-emerald-100/30 focus:border-emerald-400"
      />
    </div>
  );
}