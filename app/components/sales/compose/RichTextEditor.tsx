"use client";

import { Bold, Italic, List, Underline } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({
  value,
  onChange,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-emerald-900/50 bg-[#0b241b]">

      <div className="flex gap-1 border-b border-emerald-900/50 p-2">
        <button
          type="button"
          className="rounded-lg p-2 text-emerald-200 hover:bg-emerald-900/50"
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-emerald-200 hover:bg-emerald-900/50"
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-emerald-200 hover:bg-emerald-900/50"
        >
          <Underline size={16} />
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-emerald-200 hover:bg-emerald-900/50"
        >
          <List size={16} />
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        placeholder="Write your email here..."
        className="w-full resize-none bg-transparent p-4 text-sm leading-7 text-[#F5F1E8] outline-none placeholder:text-emerald-100/30"
      />
    </div>
  );
}