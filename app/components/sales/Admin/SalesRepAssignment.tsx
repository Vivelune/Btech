"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  Users,
  UserPlus,
  RefreshCw,
  Search,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type SalesRep = {
  id: number;
  name: string | null;
  email: string;
  username: string | null;
  assignedLeads: number;
};

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  status: string;
  priority: string;
  assignedToId: number | null;
  assignedTo: {
    id: number;
    name: string | null;
    email: string;
  } | null;
};

export default function SalesRepAssignment() {
  const [salesReps, setSalesReps] = useState<SalesRep[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  const [selectedLead, setSelectedLead] = useState("");
  const [selectedRep, setSelectedRep] = useState("");

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/sales/admin", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load sales data.");
      }

      const data = await response.json();

      setSalesReps(data.salesReps ?? []);
      setLeads(data.leads ?? []);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading the data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAssignment() {
    if (!selectedLead || !selectedRep) {
      setError("Please select both a lead and a sales representative.");
      setSuccess("");
      return;
    }

    try {
      setAssigning(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/sales/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId: selectedLead,
          salesRepId: Number(selectedRep),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to assign the lead.");
      }

      setSuccess("Lead assigned successfully.");

      setSelectedLead("");
      setSelectedRep("");

      await loadData();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while assigning the lead."
      );
    } finally {
      setAssigning(false);
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const searchValue = search.toLowerCase();

    return (
      lead.name.toLowerCase().includes(searchValue) ||
      lead.email.toLowerCase().includes(searchValue) ||
      lead.company?.toLowerCase().includes(searchValue) ||
      lead.service?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="space-y-6">
      {/* Assignment Card */}
      <div className="rounded-2xl border border-emerald-900/50 bg-[#0b241a] p-5 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <UserPlus size={20} className="text-emerald-300" />

              <h2 className="text-lg font-semibold text-[#F5F1E8]">
                Assign Lead
              </h2>
            </div>

            <p className="mt-1 text-sm text-emerald-100/50">
              Assign or reassign a lead to a sales representative.
            </p>
          </div>

          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-800/60 px-3 py-2 text-sm text-emerald-200 transition hover:bg-emerald-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />

            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-emerald-800/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />

            <span>{success}</span>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {/* Lead */}
          <div>
            <label
              htmlFor="lead"
              className="mb-2 block text-sm font-medium text-emerald-100/80"
            >
              Select Lead
            </label>

            <select
              id="lead"
              value={selectedLead}
              onChange={(event) => setSelectedLead(event.target.value)}
              disabled={loading || assigning}
              className="w-full rounded-xl border border-emerald-900/60 bg-[#071a13] px-4 py-3 text-sm text-[#F5F1E8] outline-none transition focus:border-emerald-500"
            >
              <option value="">Choose a lead...</option>

              {filteredLeads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name}
                  {lead.company ? ` — ${lead.company}` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Sales Rep */}
          <div>
            <label
              htmlFor="salesRep"
              className="mb-2 block text-sm font-medium text-emerald-100/80"
            >
              Assign To
            </label>

            <select
              id="salesRep"
              value={selectedRep}
              onChange={(event) => setSelectedRep(event.target.value)}
              disabled={loading || assigning}
              className="w-full rounded-xl border border-emerald-900/60 bg-[#071a13] px-4 py-3 text-sm text-[#F5F1E8] outline-none transition focus:border-emerald-500"
            >
              <option value="">Choose a sales representative...</option>

              {salesReps.map((rep) => (
                <option key={rep.id} value={rep.id}>
                  {rep.name || rep.username || rep.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAssignment}
          disabled={assigning || loading || !selectedLead || !selectedRep}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {assigning ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Assigning...
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Assign Lead
            </>
          )}
        </button>
      </div>

      {/* Sales Representatives */}
      <div className="rounded-2xl border border-emerald-900/50 bg-[#0b241a] p-5 shadow-xl">
        <div className="mb-5 flex items-center gap-2">
          <Users size={20} className="text-emerald-300" />

          <div>
            <h2 className="text-lg font-semibold text-[#F5F1E8]">
              Sales Representatives
            </h2>

            <p className="text-sm text-emerald-100/50">
              Current sales representatives and assigned lead counts.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-emerald-300">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : salesReps.length === 0 ? (
          <div className="rounded-xl border border-dashed border-emerald-900/60 px-5 py-10 text-center">
            <UserRound
              size={32}
              className="mx-auto mb-3 text-emerald-500/60"
            />

            <p className="text-sm text-emerald-100/60">
              No sales representatives found.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {salesReps.map((rep) => (
              <div
                key={rep.id}
                className="rounded-xl border border-emerald-900/50 bg-[#071a13] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/50 text-emerald-300">
                    <UserRound size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#F5F1E8]">
                      {rep.name || rep.username || "Unnamed Rep"}
                    </p>

                    <p className="truncate text-xs text-emerald-100/40">
                      {rep.email}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-emerald-900/40 pt-3">
                  <span className="text-xs text-emerald-100/50">
                    Assigned leads
                  </span>

                  <span className="rounded-full bg-emerald-900/50 px-3 py-1 text-sm font-semibold text-emerald-300">
                    {rep.assignedLeads}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lead List */}
      <div className="rounded-2xl border border-emerald-900/50 bg-[#0b241a] p-5 shadow-xl">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#F5F1E8]">
              Lead Assignments
            </h2>

            <p className="text-sm text-emerald-100/50">
              Review which sales representative owns each lead.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-100/30"
            />

            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-emerald-900/60 bg-[#071a13] py-2.5 pl-10 pr-4 text-sm text-[#F5F1E8] outline-none placeholder:text-emerald-100/30 focus:border-emerald-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 size={24} className="animate-spin text-emerald-300" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="rounded-xl border border-dashed border-emerald-900/60 px-5 py-10 text-center">
            <p className="text-sm text-emerald-100/50">
              No leads found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-emerald-900/50 text-xs uppercase tracking-wide text-emerald-100/40">
                  <th className="px-4 py-3 font-medium">Lead</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Assigned To</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-emerald-900/30 last:border-0"
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium text-[#F5F1E8]">
                        {lead.name}
                      </p>

                      <p className="mt-1 text-xs text-emerald-100/40">
                        {lead.email}
                      </p>

                      {lead.company && (
                        <p className="mt-1 text-xs text-emerald-100/50">
                          {lead.company}
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-4 text-emerald-100/70">
                      {lead.service || "—"}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-emerald-900/40 px-2.5 py-1 text-xs text-emerald-300">
                        {lead.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-xs text-emerald-100/60">
                        {lead.priority}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      {lead.assignedTo ? (
                        <div>
                          <p className="font-medium text-emerald-200">
                            {lead.assignedTo.name ||
                              lead.assignedTo.email}
                          </p>

                          <p className="text-xs text-emerald-100/40">
                            {lead.assignedTo.email}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-amber-300">
                          Unassigned
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}