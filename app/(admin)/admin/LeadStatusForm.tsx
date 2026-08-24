"use client";

import { useRef, useTransition } from "react";
import { updateLeadStatus } from "./action";

const STATUS_OPTIONS = ["NEW", "CONTACTED", "CONVERTED", "ARCHIVED"];

export default function LeadStatusForm({
  leadId,
  status,
}: {
  leadId: string;
  status: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      action={(formData) => startTransition(() => updateLeadStatus(formData))}
    >
      <input type="hidden" name="leadId" value={leadId} />
      <select
        name="status"
        defaultValue={status}
        disabled={isPending}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-[#F5F1E8] transition-opacity focus:outline-none focus:ring-1 focus:ring-[#4ade80] disabled:opacity-50"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s} className="bg-[#061A13] text-[#F5F1E8]">
            {s}
          </option>
        ))}
      </select>
    </form>
  );
}