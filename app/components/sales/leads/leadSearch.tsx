"use client";

import { Search } from "lucide-react";

export default function LeadSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative flex-1">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
      />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search name, company, email or service..."
        className="w-full rounded-xl border border-white/10 bg-[#0A241B] py-3 pl-10 pr-4 text-sm text-[#F5F1E8] outline-none placeholder:text-white/30 focus:border-[#65FFAD]/50"
      />
    </div>
  );
}