"use client";

import { useActionState } from "react";
import { createPendingAccount, type CreateAccountFormState } from "./actions";

const ROLE_OPTIONS = ["USER", "SALES_REP", "ADMIN"];

const initialState: CreateAccountFormState = { status: "idle" };

export default function AccountCreationForm() {
  const [state, formAction, isPending] = useActionState(
    createPendingAccount,
    initialState
  );

  return (
    <form
      action={formAction}
      className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-start"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="name@company.com"
        className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-[#F5F1E8] placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
      />

      <select
        name="role"
        defaultValue="SALES_REP"
        className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
      >
        {ROLE_OPTIONS.map((r) => (
          <option key={r} value={r} className="bg-[#061A13]">
            {r.replace("_", " ")}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-[#3a9e5f] px-5 py-2.5 text-sm font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Pre-register"}
      </button>

      {state.status === "error" && (
        <p className="text-sm text-red-400 sm:col-span-3">{state.message}</p>
      )}
      {state.status === "success" && (
        <p className="text-sm text-[#4ade80] sm:col-span-3">{state.message}</p>
      )}
    </form>
  );
}