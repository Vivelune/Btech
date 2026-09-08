"use client";

import { useState } from "react";
import { createManagedAccount } from "./action";

export default function AccountCreationForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const result = await createManagedAccount(formData);

      if (result.success) {
        setMessage(result.message);
        event.currentTarget.reset();
      } else {
        setError(result.message);
      }
    } catch {
      setError("Something went wrong creating the account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
            Full Name
          </label>

          <input
            name="name"
            type="text"
            required
            placeholder="Team member name"
            className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[#F5F1E8] placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
            Username
          </label>

          <input
            name="username"
            type="text"
            placeholder="username"
            className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[#F5F1E8] placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
            Email
          </label>

          <input
            name="email"
            type="email"
            required
            placeholder="user@example.com"
            className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[#F5F1E8] placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
            Account Type
          </label>

          <select
            name="role"
            defaultValue="USER"
            className="w-full rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          >
            <option value="USER">
              Team Member
            </option>

            <option value="ADMIN">
              Administrator
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
            Temporary Password
          </label>

          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Minimum 8 characters"
            className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[#F5F1E8] placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      {message && (
        <p className="text-sm text-[#4ade80]">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-[#3a9e5f] px-6 py-3 text-sm font-bold text-[#04140b] transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}