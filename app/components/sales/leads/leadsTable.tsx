"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ExternalLink,
  Plus,
  Upload,
} from "lucide-react";

import LeadStatusBadge from "./LeadStatusBadge";
import LeadSearch from "./LeadSearch";
import LeadFilter from "./LeadFilters";
import LeadStatusDropdown, {
  type LeadStatus,
} from "./LeadStatusDropdown";

type LeadPriority = "LOW" | "MEDIUM" | "HIGH";

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
  priority: LeadPriority;
  notes: string | null;
  followUpDate: string | null;
  tags: string[];
  estimatedValue: number | null;
  assignedToId: number | null;
  assignedTo?: {
    id: number;
    name: string | null;
    email: string;
  } | null;
};

type LeadsResponse = {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
};

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<LeadStatus | "ALL">("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadLeads() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", "1");
      params.set("pageSize", "50");

      if (search.trim()) {
        params.set("q", search.trim());
      }

      if (status !== "ALL") {
        params.set("status", status);
      }

      const response = await fetch(
        `/api/leads?${params.toString()}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load leads.");
      }

      const data: LeadsResponse = await response.json();

      setLeads(data.leads);
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
  }, [search, status]);

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
        throw new Error("Failed to update lead.");
      }

      setLeads((current) =>
        current.map((lead) =>
          lead.id === leadId
            ? { ...lead, status: newStatus }
            : lead
        )
      );
    } catch (err) {
      console.error(err);
      alert("Could not update the lead status.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F1E8]">
            Leads
          </h1>

          <p className="mt-1 text-sm text-white/45">
            Manage and track your sales prospects.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/sales/leads/import"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-[#F5F1E8] hover:bg-white/[0.08]"
          >
            <Upload size={17} />
            Import CSV
          </Link>

          <Link
            href="/sales/leads/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#65FFAD] px-4 py-2.5 text-sm font-bold text-[#062017] hover:bg-[#4ade80]"
          >
            <Plus size={17} />
            Add Lead
          </Link>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <LeadSearch
          value={search}
          onChange={setSearch}
        />

        <LeadFilter
          value={status}
          onChange={setStatus}
        />
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A241B]/80">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="border-b border-white/10 bg-white/[0.025]">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Lead
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Company
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Service
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Priority
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Assigned
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-white/40">
                  View
                </th>
              </tr>
            </thead>

            <tbody>
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
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#F5F1E8]">
                        {lead.name}
                      </p>

                      <p className="mt-1 text-xs text-white/40">
                        {lead.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-white/65">
                      {lead.company || "—"}
                    </td>

                    <td className="px-5 py-4 text-sm text-white/60">
                      {lead.service || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm text-white/60">
                        {lead.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-2">
                        <LeadStatusBadge
                          status={lead.status}
                        />

                        <LeadStatusDropdown
                          value={lead.status}
                          onChange={(value) =>
                            updateStatus(lead.id, value)
                          }
                        />
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-white/50">
                      {lead.assignedTo?.name ||
                        lead.assignedTo?.email ||
                        "Unassigned"}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/sales/leads/${lead.id}`}
                        className="inline-flex rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-[#65FFAD]"
                      >
                        <ExternalLink size={17} />
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
  );
}