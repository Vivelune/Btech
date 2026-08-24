"use client";

import { useRef, useTransition } from "react";
import { updateUserRole } from "./action";

const ROLE_OPTIONS = ["USER", "ADMIN"];

export default function UserRoleForm({
  userId,
  role,
  isSelf,
}: {
  userId: number;
  role: string;
  isSelf: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <form
        ref={formRef}
        action={(formData) => startTransition(() => updateUserRole(formData))}
      >
        <input type="hidden" name="userId" value={userId} />
        <select
          name="role"
          defaultValue={role}
          disabled={isPending || isSelf}
          onChange={() => formRef.current?.requestSubmit()}
          className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-[#F5F1E8] transition-opacity focus:outline-none focus:ring-1 focus:ring-[#4ade80] disabled:opacity-50"
        >
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r} className="bg-[#061A13] text-[#F5F1E8]">
              {r}
            </option>
          ))}
        </select>
      </form>
      {isSelf && (
        <p className="mt-1 text-[11px] text-white/30">This is you</p>
      )}
    </div>
  );
}