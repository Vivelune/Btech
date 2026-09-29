"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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

type Activity = {
  id: string;
  type: string;
  detail: string | null;
  createdAt: string;
  user: {
    email: string;
    username: string | null;
  } | null;
};

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
  estimatedValue: number | null;
  assignedTo: {
    email: string;
    username: string | null;
  } | null;
  activities: Activity[];
};

const statuses: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "REPLIED",
  "INTERESTED",
  "MEETING_BOOKED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
];

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`/api/leads/${id}`);

        if (!response.ok) {
          throw new Error("Lead not found");
        }

        const data = await response.json();
        setLead(data.lead);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function updateLead(changes: Record<string, unknown>) {
    setSaving(true);

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changes),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Update failed");
      }

      setLead(data.lead);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Update failed"
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteLead() {
    if (!confirm("Delete this lead?")) return;

    const response = await fetch(`/api/leads/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Only an administrator can delete leads.");
      return;
    }

    router.push("/sales/leads");
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-[#061A13] p-8 text-white/50">
        Loading lead...
      </section>
    );
  }

  if (!lead) {
    return (
      <section className="min-h-screen bg-[#061A13] p-8 text-white/50">
        Lead not found.
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

        <Link
          href="/sales/leads"
          className="text-sm text-[#65FFAD]"
        >
          ← Back to Leads
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#F5F1E8]">
              {lead.name}
            </h1>

            <p className="mt-2 text-sm text-white/50">
              {lead.email}
            </p>
          </div>

          <button
            onClick={deleteLead}
            className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-400/20"
          >
            Delete
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/40">
                Lead Information
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <Info label="Company" value={lead.company} />
                <Info label="Phone" value={lead.phone} />
                <Info label="Website" value={lead.website} />
                <Info label="Service" value={lead.service} />
                <Info
                  label="Estimated Value"
                  value={
                    lead.estimatedValue != null
                      ? `$${lead.estimatedValue.toLocaleString()}`
                      : null
                  }
                />
                <Info
                  label="Assigned To"
                  value={
                    lead.assignedTo?.username ||
                    lead.assignedTo?.email ||
                    null
                  }
                />

              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Message
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/70">
                  {lead.message || "No message."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/40">
                Activity Timeline
              </h2>

              <div className="mt-5 space-y-4">
                {lead.activities.length === 0 ? (
                  <p className="text-sm text-white/40">
                    No activity yet.
                  </p>
                ) : (
                  lead.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="border-l border-[#65FFAD]/30 pl-4"
                    >
                      <p className="text-sm font-semibold text-white/80">
                        {activity.detail || formatStatus(activity.type)}
                      </p>

                      <p className="mt-1 text-xs text-white/40">
                        {new Date(
                          activity.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          <div className="space-y-6">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wide text-white/40">
                Status
              </p>

              <select
                value={lead.status}
                disabled={saving}
                onChange={(e) =>
                  updateLead({
                    status: e.target.value,
                  })
                }
                className="mt-3 w-full rounded-xl border border-white/10 bg-[#0A241B] px-3 py-3 text-sm text-white outline-none focus:border-[#65FFAD]"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>

              <p className="mt-5 text-xs uppercase tracking-wide text-white/40">
                Priority
              </p>

              <select
                value={lead.priority}
                disabled={saving}
                onChange={(e) =>
                  updateLead({
                    priority: e.target.value,
                  })
                }
                className="mt-3 w-full rounded-xl border border-white/10 bg-[#0A241B] px-3 py-3 text-sm text-white outline-none focus:border-[#65FFAD]"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/40">
        {label}
      </p>

      <p className="mt-1 text-sm text-white/70">
        {value || "—"}
      </p>
    </div>
  );
}