"use client";

import type { LeadStatus } from "./leadStatusDropdown";

const statuses: { value: LeadStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All statuses" },
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "REPLIED", label: "Replied" },
  { value: "INTERESTED", label: "Interested" },
  { value: "MEETING_BOOKED", label: "Meeting Booked" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "CONVERTED", label: "Converted" },
  { value: "LOST", label: "Lost" },
];

export default function LeadFilter({
  value,
  onChange,
}: {
  value: LeadStatus | "ALL";
  onChange: (value: LeadStatus | "ALL") => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value as LeadStatus | "ALL")
      }
      className="rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/50"
    >
      {statuses.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
}