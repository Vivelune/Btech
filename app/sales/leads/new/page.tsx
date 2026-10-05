"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewLeadPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    service: "",
    message: "",
    priority: "MEDIUM",
    estimatedValue: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: string,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          website: form.website,
          service: form.service,
          message: form.message,
          priority: form.priority,
          estimatedValue: form.estimatedValue
            ? Number(form.estimatedValue)
            : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create lead");
      }

      router.push(`/sales/leads/${data.lead.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create lead"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

        <div className="mb-8">
          <Link
            href="/sales/leads"
            className="text-sm text-[#65FFAD] hover:text-white"
          >
            ← Back to Leads
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-[#F5F1E8]">
            Add Lead
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Create a new lead in the CRM.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">

            <Field
              label="Name *"
              value={form.name}
              onChange={(value) =>
                updateField("name", value)
              }
            />

            <Field
              label="Email *"
              type="email"
              value={form.email}
              onChange={(value) =>
                updateField("email", value)
              }
            />

            <Field
              label="Company"
              value={form.company}
              onChange={(value) =>
                updateField("company", value)
              }
            />

            <Field
              label="Phone"
              value={form.phone}
              onChange={(value) =>
                updateField("phone", value)
              }
            />

            <Field
              label="Website"
              value={form.website}
              onChange={(value) =>
                updateField("website", value)
              }
            />

            <Field
              label="Service"
              value={form.service}
              onChange={(value) =>
                updateField("service", value)
              }
            />

            <Field
              label="Estimated Value"
              type="number"
              value={form.estimatedValue}
              onChange={(value) =>
                updateField("estimatedValue", value)
              }
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Priority
              </label>

              <select
                value={form.priority}
                onChange={(e) =>
                  updateField("priority", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-white outline-none focus:border-[#65FFAD]"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Message
            </label>

            <textarea
              value={form.message}
              onChange={(e) =>
                updateField("message", e.target.value)
              }
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#65FFAD]"
              placeholder="Lead message or enquiry..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#3a9e5f] px-5 py-3 text-sm font-bold text-[#04140b] transition hover:bg-[#65FFAD] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Lead"}
          </button>
        </form>

      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/70">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#65FFAD]"
      />
    </div>
  );
}