"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function LeadSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full lg:w-80">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200/50"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search leads, email, company..."
        className="w-full rounded-xl border border-emerald-900/50 bg-[#0b241b] py-3 pl-10 pr-4 text-sm text-[#F5F1E8] outline-none placeholder:text-emerald-100/30 focus:border-emerald-400"
      />
    </div>
  );
}