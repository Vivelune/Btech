"use client";

import { useActionState } from "react";
import { updateLead, type LeadFormState } from "./action";

const PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH"];
const TAG_OPTIONS = ["Web Development", "SEO", "E-commerce", "Maintenance"];

const initialState: LeadFormState = { status: "idle" };

export default function LeadDetailsForm({
  leadId,
  priority,
  notes,
  followUpDate,
  assignedToId,
  estimatedValue,
  tags,
  admins,
}: {
  leadId: string;
  priority: string;
  notes: string;
  followUpDate: string; // "" or "YYYY-MM-DD"
  assignedToId: string; // "" or numeric string
  estimatedValue: string; // "" or numeric string
  tags: string[];
  admins: { id: number; email: string; username: string | null }[];
}) {
  const [state, formAction, isPending] = useActionState(
    updateLead,
    initialState
  );

  return (
    <form action={formAction} className="mt-3 space-y-4">
      <input type="hidden" name="leadId" value={leadId} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
            Priority
          </label>
          <select
            name="priority"
            defaultValue={priority}
            className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          >
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p} className="bg-[#061A13]">
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
            Assigned to
          </label>
          <select
            name="assignedToId"
            defaultValue={assignedToId}
            className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          >
            <option value="" className="bg-[#061A13]">
              Unassigned
            </option>
            {admins.map((a) => (
              <option key={a.id} value={a.id} className="bg-[#061A13]">
                {a.username ?? a.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
            Follow-up date
          </label>
          <input
            type="date"
            name="followUpDate"
            defaultValue={followUpDate}
            className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#4ade80] [color-scheme:dark]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
            Estimated value ($)
          </label>
          <input
            type="number"
            name="estimatedValue"
            defaultValue={estimatedValue}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#F5F1E8] placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <label
              key={tag}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-white/70 has-[:checked]:border-[#4ade80]/50 has-[:checked]:bg-[#4ade80]/10 has-[:checked]:text-[#4ade80]"
            >
              <input
                type="checkbox"
                name="tags"
                value={tag}
                defaultChecked={tags.includes(tag)}
                className="accent-[#4ade80]"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
          Notes
        </label>
        <textarea
          name="notes"
          defaultValue={notes}
          rows={3}
          placeholder="Internal notes about this lead…"
          className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#F5F1E8] placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-[#3a9e5f] px-5 py-2 text-[13px] font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save details"}
        </button>

        {state.status === "error" && (
          <p className="text-[13px] text-red-400">{state.message}</p>
        )}
        {state.status === "success" && (
          <p className="text-[13px] text-[#4ade80]">{state.message}</p>
        )}
      </div>
    </form>
  );
}