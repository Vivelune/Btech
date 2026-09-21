"use client";

import { pipelineStatuses, type LeadStatus } from "../sales-data";

type Props = {
  status: LeadStatus;
  onChange: (status: LeadStatus) => void;
};

export default function LeadStatusDropdown({
  status,
  onChange,
}: Props) {
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as LeadStatus)}
      className="rounded-lg border border-emerald-900/50 bg-[#0b241b] px-3 py-2 text-xs font-semibold text-emerald-200 outline-none focus:border-emerald-400"
    >
      {pipelineStatuses.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}