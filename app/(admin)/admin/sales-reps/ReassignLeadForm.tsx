"use client";

import { useRef, useTransition } from "react";
import { assignLead } from "../action";

export default function ReassignLeadForm({
  leadId,
  assignedToId,
  reps,
}: {
  leadId: string;
  assignedToId: string; // "" or numeric string
  reps: { id: number; email: string; username: string | null }[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      action={(formData) => startTransition(() => assignLead(formData))}
    >
      <input type="hidden" name="leadId" value={leadId} />
      <select
        name="assignedToId"
        defaultValue={assignedToId}
        disabled={isPending}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-lg border border-white/10 bg-[#0A241B] px-3 py-2 text-sm text-[#F5F1E8] outline-none transition-opacity focus:border-[#65FFAD]/40 disabled:opacity-50"
      >
        <option value="" className="bg-[#061A13]">
          Unassigned
        </option>
        {reps.map((rep) => (
          <option key={rep.id} value={rep.id} className="bg-[#061A13]">
            {rep.username ?? rep.email}
          </option>
        ))}
      </select>
    </form>
  );
}