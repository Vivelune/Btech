"use client";

import { useState } from "react";
import { UserRound, UsersRound } from "lucide-react";

const reps = [
  {
    id: "REP-001",
    name: "Alhaji",
    email: "alhaji@btechbusinesssolutions.com",
    leads: 12,
  },
  {
    id: "REP-002",
    name: "Sales Representative",
    email: "sales@btechbusinesssolutions.com",
    leads: 8,
  },
  {
    id: "REP-003",
    name: "Business Development",
    email: "business@btechbusinesssolutions.com",
    leads: 5,
  },
];

export default function SalesRepAssignment() {
  const [assignments, setAssignments] = useState<
    Record<string, string>
  >({
    "LEAD-001": "REP-001",
    "LEAD-002": "REP-001",
    "LEAD-003": "REP-002",
    "LEAD-004": "REP-003",
  });

  const leads = [
    {
      id: "LEAD-001",
      name: "Alhaji Kamara",
      company: "Kamara Trading",
    },
    {
      id: "LEAD-002",
      name: "Mohamed Bangura",
      company: "Bangura Construction",
    },
    {
      id: "LEAD-003",
      name: "Fatmata Sesay",
      company: "Sesay Enterprises",
    },
    {
      id: "LEAD-004",
      name: "Abdul Conteh",
      company: "Conteh Logistics",
    },
  ];

  return (
    <div className="space-y-6">

      <div className="grid gap-4 md:grid-cols-3">
        {reps.map((rep) => (
          <div
            key={rep.id}
            className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                <UserRound size={19} />
              </div>

              <div>
                <p className="font-bold">
                  {rep.name}
                </p>

                <p className="text-xs text-emerald-100/50">
                  {rep.email}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-emerald-200">
              <UsersRound size={16} />
              {rep.leads} assigned leads
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-emerald-900/40 bg-[#102D22]">
        <div className="border-b border-emerald-900/40 p-5">
          <h2 className="font-bold">
            Assign / Reassign Leads
          </h2>

          <p className="mt-1 text-sm text-emerald-100/50">
            Admin can assign leads to sales representatives.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-[#0b241b]">
              <tr>
                <th className="px-5 py-4 text-xs uppercase text-emerald-300">
                  Lead
                </th>
                <th className="px-5 py-4 text-xs uppercase text-emerald-300">
                  Company
                </th>
                <th className="px-5 py-4 text-xs uppercase text-emerald-300">
                  Assigned To
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-900/30">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {lead.name}
                    </p>

                    <p className="text-xs text-emerald-100/40">
                      {lead.id}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-emerald-100/70">
                    {lead.company}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={assignments[lead.id] ?? ""}
                      onChange={(e) =>
                        setAssignments((current) => ({
                          ...current,
                          [lead.id]: e.target.value,
                        }))
                      }
                      className="rounded-lg border border-emerald-900/50 bg-[#0b241b] px-3 py-2 text-sm text-[#F5F1E8] outline-none focus:border-emerald-400"
                    >
                      <option value="">
                        Unassigned
                      </option>

                      {reps.map((rep) => (
                        <option
                          key={rep.id}
                          value={rep.id}
                        >
                          {rep.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}