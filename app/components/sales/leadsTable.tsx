"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Upload,
  ExternalLink,
} from "lucide-react";
import {
  leadStatuses,
  salesLeads,
} from "@/lib/sale-data";
import LeadStatusBadge from "./leadStatusBadge";

export default function LeadsTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredLeads = useMemo(() => {
    return salesLeads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || lead.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

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
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, company or email..."
            className="w-full rounded-xl border border-white/10 bg-[#0A241B] py-3 pl-10 pr-4 text-sm text-[#F5F1E8] outline-none placeholder:text-white/30 focus:border-[#65FFAD]/50"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/50"
        >
          <option value="All">All statuses</option>

          {leadStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A241B]/80">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-white/10 bg-white/[0.025]">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Lead
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Company
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Source
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
              {filteredLeads.map((lead) => (
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
                    {lead.company}
                  </td>

                  <td className="px-5 py-4">
                    <LeadStatusBadge status={lead.status} />
                  </td>

                  <td className="px-5 py-4 text-sm text-white/50">
                    {lead.source}
                  </td>

                  <td className="px-5 py-4 text-sm text-white/50">
                    {lead.assignedTo}
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
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-white/40"
                  >
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}