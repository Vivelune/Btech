"use client";

import { useState } from "react";
import {
  Users,
  UserRound,
  Search,
  UserPlus,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type SalesRep = {
  id: number;
  name: string;
  email: string;
  leads: number;
  status: "Active" | "Inactive";
};

type Lead = {
  id: number;
  name: string;
  company: string;
  assignedTo: string;
};

const initialSalesReps: SalesRep[] = [
  {
    id: 1,
    name: "Alhaji",
    email: "alhaji@btech.com",
    leads: 8,
    status: "Active",
  },
  {
    id: 2,
    name: "Sales Representative 2",
    email: "sales2@btech.com",
    leads: 6,
    status: "Active",
  },
  {
    id: 3,
    name: "Sales Representative 3",
    email: "sales3@btech.com",
    leads: 4,
    status: "Active",
  },
];

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "John Doe",
    company: "ABC Company",
    assignedTo: "Alhaji",
  },
  {
    id: 2,
    name: "Mary Johnson",
    company: "Johnson Enterprises",
    assignedTo: "Sales Representative 2",
  },
  {
    id: 3,
    name: "Michael Smith",
    company: "Smith Construction",
    assignedTo: "Sales Representative 3",
  },
  {
    id: 4,
    name: "Sarah Williams",
    company: "Williams Group",
    assignedTo: "Alhaji",
  },
];

export default function SalesRepsPage() {
  const [salesReps] = useState<SalesRep[]>(initialSalesReps);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const [search, setSearch] = useState("");
  const [selectedRep, setSelectedRep] = useState("All");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase());

    const matchesRep =
      selectedRep === "All" || lead.assignedTo === selectedRep;

    return matchesSearch && matchesRep;
  });

  function reassignLead(
    leadId: number,
    newSalesRep: string
  ) {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              assignedTo: newSalesRep,
            }
          : lead
      )
    );
  }

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#65FFAD]">
            Admin Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8]">
            Sales Reps
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
            View Sales Representatives and manage lead assignments from one
            place.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  Sales Reps
                </p>

                <p className="mt-3 text-3xl font-bold text-[#F5F1E8]">
                  {salesReps.length}
                </p>
              </div>

              <div className="rounded-xl bg-[#65FFAD]/10 p-3">
                <Users
                  size={21}
                  className="text-[#65FFAD]"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-white/40">
              Registered sales representatives
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  Active Reps
                </p>

                <p className="mt-3 text-3xl font-bold text-[#F5F1E8]">
                  {
                    salesReps.filter(
                      (rep) => rep.status === "Active"
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-xl bg-[#65FFAD]/10 p-3">
                <CheckCircle2
                  size={21}
                  className="text-[#65FFAD]"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-white/40">
              Currently active representatives
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  Total Leads
                </p>

                <p className="mt-3 text-3xl font-bold text-[#F5F1E8]">
                  {leads.length}
                </p>
              </div>

              <div className="rounded-xl bg-[#65FFAD]/10 p-3">
                <UserRound
                  size={21}
                  className="text-[#65FFAD]"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-white/40">
              Leads currently assigned
            </p>
          </div>
        </div>

        {/* Sales Representatives */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
              Team
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#F5F1E8]">
              Sales Representatives
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Review the sales team and their current lead workload.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                    Representative
                  </th>

                  <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                    Email
                  </th>

                  <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                    Assigned Leads
                  </th>

                  <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {salesReps.map((rep) => (
                  <tr
                    key={rep.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#65FFAD]/10">
                          <UserRound
                            size={17}
                            className="text-[#65FFAD]"
                          />
                        </div>

                        <span className="font-semibold text-[#F5F1E8]">
                          {rep.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 text-sm text-white/50">
                      {rep.email}
                    </td>

                    <td className="py-4 text-sm text-white/70">
                      {rep.leads}
                    </td>

                    <td className="py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#65FFAD]/10 px-3 py-1 text-xs font-semibold text-[#65FFAD]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#65FFAD]" />
                        {rep.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Assignment */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                Lead Assignment
              </p>

              <h2 className="mt-2 text-xl font-bold text-[#F5F1E8]">
                Assign & Reassign Leads
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Move leads between Sales Representatives.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />

              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#0A241B] py-2.5 pl-10 pr-4 text-sm text-[#F5F1E8] outline-none placeholder:text-white/30 focus:border-[#65FFAD]/40"
              />
            </div>
          </div>

          {/* Rep Filter */}
          <div className="mb-5">
            <select
              value={selectedRep}
              onChange={(event) =>
                setSelectedRep(event.target.value)
              }
              className="rounded-xl border border-white/10 bg-[#0A241B] px-4 py-2.5 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/40"
            >
              <option value="All">All Sales Reps</option>

              {salesReps.map((rep) => (
                <option
                  key={rep.id}
                  value={rep.name}
                >
                  {rep.name}
                </option>
              ))}
            </select>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                    Lead
                  </th>

                  <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                    Company
                  </th>

                  <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                    Current Rep
                  </th>

                  <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                    Reassign
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-4">
                      <p className="font-semibold text-[#F5F1E8]">
                        {lead.name}
                      </p>

                      <p className="mt-1 text-xs text-white/40">
                        Lead #{lead.id}
                      </p>
                    </td>

                    <td className="py-4 text-sm text-white/60">
                      {lead.company}
                    </td>

                    <td className="py-4">
                      <span className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/70">
                        {lead.assignedTo}
                      </span>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <ArrowRight
                          size={16}
                          className="text-white/30"
                        />

                        <select
                          value={lead.assignedTo}
                          onChange={(event) =>
                            reassignLead(
                              lead.id,
                              event.target.value
                            )
                          }
                          className="rounded-lg border border-white/10 bg-[#0A241B] px-3 py-2 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/40"
                        >
                          {salesReps.map((rep) => (
                            <option
                              key={rep.id}
                              value={rep.name}
                            >
                              {rep.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="py-12 text-center">
              <Users
                size={30}
                className="mx-auto text-white/20"
              />

              <p className="mt-3 text-sm text-white/40">
                No leads found.
              </p>
            </div>
          )}
        </div>

        {/* Future Backend Notice */}
        <div className="mt-6 rounded-xl border border-[#65FFAD]/10 bg-[#65FFAD]/5 p-4">
          <div className="flex items-start gap-3">
            <UserPlus
              size={18}
              className="mt-0.5 shrink-0 text-[#65FFAD]"
            />

            <div>
              <p className="text-sm font-semibold text-[#F5F1E8]">
                Sales Rep Assignment
              </p>

              <p className="mt-1 text-xs leading-5 text-white/40">
                This frontend currently uses demonstration data. It is ready
                to connect to the lead assignment API when the backend is
                available.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}