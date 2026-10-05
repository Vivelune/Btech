"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "REPLIED"
  | "INTERESTED"
  | "MEETING_BOOKED"
  | "QUALIFIED"
  | "CONVERTED"
  | "LOST";

type Priority = "LOW" | "MEDIUM" | "HIGH";

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  website: string | null;
  service: string | null;
  message: string;
  submittedAt: string;
  status: LeadStatus;
  priority: Priority;
  notes: string | null;
  followUpDate: string | null;
  tags: string[];
  estimatedValue: number | null;
  assignedTo: {
    id: number;
    email: string;
    username: string | null;
  } | null;
};

const statuses: { value: LeadStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "REPLIED", label: "Replied" },
  { value: "INTERESTED", label: "Interested" },
  { value: "MEETING_BOOKED", label: "Meeting Booked" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "CONVERTED", label: "Converted" },
  { value: "LOST", label: "Lost" },
];

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  async function loadLeads() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("q", search.trim());
      }

      if (status) {
        params.set("status", status);
      }

      if (priority) {
        params.set("priority", priority);
      }

      params.set("page", "1");
      params.set("pageSize", "50");

      const response = await fetch(
        `/api/leads?${params.toString()}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load leads");
      }

      const data = await response.json();

      setLeads(data.leads ?? []);
    } catch (err) {
      console.error(err);
      setError("Unable to load leads.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLeads();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status, priority]);

  async function updateStatus(
    leadId: string,
    newStatus: LeadStatus
  ) {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      await loadLeads();
    } catch (err) {
      console.error(err);
      alert("Could not update lead status.");
    }
  }

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#65FFAD]">
              Sales
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#F5F1E8]">
              Leads
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Manage your real CRM leads.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/sales/leads/new"
              className="rounded-xl bg-[#3a9e5f] px-4 py-2.5 text-sm font-bold text-[#04140b] transition hover:bg-[#65FFAD]"
            >
              + Add Lead
            </Link>

            <Link
              href="/sales/leads/import"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Bulk Upload
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 grid gap-3 md:grid-cols-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, company..."
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#65FFAD]"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-white outline-none focus:border-[#65FFAD]"
          >
            <option value="">All statuses</option>

            {statuses.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-white outline-none focus:border-[#65FFAD]"
          >
            <option value="">All priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Leads Table */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr className="text-left text-xs uppercase tracking-wide text-white/40">
                  <th className="px-5 py-4">
                    Lead
                  </th>

                  <th className="px-5 py-4">
                    Company
                  </th>

                  <th className="px-5 py-4">
                    Service
                  </th>

                  <th className="px-5 py-4">
                    Priority
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Value
                  </th>

                  <th className="px-5 py-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-white/40"
                    >
                      Loading leads...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-white/40"
                    >
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="transition hover:bg-white/[0.02]"
                    >
                      {/* Lead */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-[#F5F1E8]">
                            {lead.name}
                          </p>

                          <p className="mt-1 text-xs text-white/40">
                            {lead.email}
                          </p>
                        </div>
                      </td>

                      {/* Company */}
                      <td className="px-5 py-4 text-sm text-white/60">
                        {lead.company || "—"}
                      </td>

                      {/* Service */}
                      <td className="px-5 py-4 text-sm text-white/60">
                        {lead.service || "—"}
                      </td>

                      {/* Priority */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-white/70">
                          {formatStatus(lead.priority)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(
                              lead.id,
                              e.target.value as LeadStatus
                            )
                          }
                          className="rounded-lg border border-white/10 bg-[#0A241B] px-2 py-1.5 text-xs text-white outline-none focus:border-[#65FFAD]"
                        >
                          {statuses.map((item) => (
                            <option
                              key={item.value}
                              value={item.value}
                            >
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Estimated Value */}
                      <td className="px-5 py-4 text-sm font-semibold text-[#65FFAD]">
                        {lead.estimatedValue != null
                          ? `$${lead.estimatedValue.toLocaleString()}`
                          : "—"}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        <Link
                          href={`/sales/leads/${lead.id}`}
                          className="text-sm font-semibold text-[#65FFAD] hover:text-white"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}