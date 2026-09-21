"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewLeadPage() {
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/sales/leads"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#65FFAD]"
        >
          <ArrowLeft size={16} />
          Back to leads
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-[#F5F1E8]">
            Add New Lead
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Add a new prospect to your sales pipeline.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-5 sm:grid-cols-2"
          >
            {[
              ["name", "Full Name"],
              ["company", "Company"],
              ["email", "Email Address"],
              ["phone", "Phone Number"],
              ["website", "Website"],
            ].map(([name, label]) => (
              <div
                key={name}
                className={name === "website" ? "sm:col-span-2" : ""}
              >
                <label className="mb-2 block text-sm font-medium text-white/70">
                  {label}
                </label>

                <input
                  name={name}
                  required={name !== "website"}
                  type={
                    name === "email"
                      ? "email"
                      : name === "phone"
                        ? "tel"
                        : "text"
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#102D22] px-4 py-3 text-sm text-[#F5F1E8] outline-none placeholder:text-white/30 focus:border-[#65FFAD]/50"
                />
              </div>
            ))}

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white/70">
                Notes
              </label>

              <textarea
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-[#102D22] px-4 py-3 text-sm text-[#F5F1E8] outline-none placeholder:text-white/30 focus:border-[#65FFAD]/50"
                placeholder="Add notes about this lead..."
              />
            </div>

            <div className="flex items-center justify-end gap-3 sm:col-span-2">
              {saved && (
                <span className="text-sm text-[#65FFAD]">
                  Lead form submitted.
                </span>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#65FFAD] px-5 py-3 text-sm font-bold text-[#062017] hover:bg-[#4ade80]"
              >
                <Save size={17} />
                Save Lead
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}