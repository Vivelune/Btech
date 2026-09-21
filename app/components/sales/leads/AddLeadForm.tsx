"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AddLeadForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-6 sm:p-8"
    >
      {submitted && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
          <CheckCircle2 size={20} />
          Lead created successfully in demo mode.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">

        <Field
          label="Name"
          name="name"
          placeholder="Alhaji Kamara"
          required
        />

        <Field
          label="Company"
          name="company"
          placeholder="BTech Solutions"
          required
        />

        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="alhaji@example.com"
          required
        />

        <Field
          label="Phone"
          name="phone"
          placeholder="+232 76 123456"
        />

        <Field
          label="Website"
          name="website"
          placeholder="https://example.com"
        />

        <div>
          <label className="mb-2 block text-sm font-semibold text-emerald-100">
            Service
          </label>

          <select
            name="service"
            className="w-full rounded-xl border border-emerald-900/50 bg-[#0b241b] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-emerald-400"
          >
            <option>Web Design</option>
            <option>Graphic Design</option>
            <option>Video Editing</option>
            <option>SEO</option>
            <option>Digital Marketing</option>
            <option>Social Media</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-emerald-100">
            Priority
          </label>

          <select
            name="priority"
            className="w-full rounded-xl border border-emerald-900/50 bg-[#0b241b] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-emerald-400"
          >
            <option>Medium</option>
            <option>Low</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-emerald-100">
          Notes
        </label>

        <textarea
          name="notes"
          rows={5}
          placeholder="Add information about this lead..."
          className="w-full resize-none rounded-xl border border-emerald-900/50 bg-[#0b241b] px-4 py-3 text-sm text-[#F5F1E8] outline-none placeholder:text-emerald-100/30 focus:border-emerald-400"
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/sales/leads"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-800 px-5 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/40"
        >
          <ArrowLeft size={17} />
          Cancel
        </Link>

        <button
          type="submit"
          className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-[#071a13] hover:bg-emerald-300"
        >
          Create Lead
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-emerald-100">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-emerald-900/50 bg-[#0b241b] px-4 py-3 text-sm text-[#F5F1E8] outline-none placeholder:text-emerald-100/30 focus:border-emerald-400"
      />
    </div>
  );
}