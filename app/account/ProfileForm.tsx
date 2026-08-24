"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileFormState } from "./actions";

const initialState: ProfileFormState = { status: "idle" };

export default function ProfileForm({
  name,
  username,
}: {
  name: string;
  username: string;
}) {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
          Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={name}
          className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
          Username
        </label>
        <input
          type="text"
          name="username"
          defaultValue={username}
          placeholder="letters, numbers, underscores"
          className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}
      {state.status === "success" && (
        <p className="text-sm text-[#4ade80]">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-[#3a9e5f] px-5 py-2.5 text-[13.5px] font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}