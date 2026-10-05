"use client";

import { useEffect, useState } from "react";

type Analytics = {
  rangeDays: number;
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalBounced: number;
  totalReplied: number;
  openRate: number;
  replyRate: number;
  bounceRate: number;
  timeline: {
    date: string;
    sent: number;
    delivered: number;
    opened: number;
    bounced: number;
    replied: number;
  }[];
};

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-2xl font-bold text-[#F5F1E8]">
        {value}
      </p>

      <p className="mt-1 text-xs uppercase tracking-wide text-white/40">
        {label}
      </p>
    </div>
  );
}

export default function AnalyticsPage() {
  const [days, setDays] = useState("30");
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/analytics/overview?days=${days}`
        );

        if (!response.ok) {
          throw new Error("Analytics request failed");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [days]);

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#65FFAD]">
              Sales
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#F5F1E8]">
              Analytics
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Real email performance from the backend.
            </p>
          </div>

          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-white outline-none focus:border-[#65FFAD]"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>

        {loading ? (
          <p className="text-sm text-white/40">
            Loading analytics...
          </p>
        ) : !data ? (
          <p className="text-sm text-red-300">
            Unable to load analytics.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <Stat label="Sent" value={data.totalSent} />
              <Stat label="Delivered" value={data.totalDelivered} />
              <Stat label="Opened" value={data.totalOpened} />
              <Stat label="Replied" value={data.totalReplied} />
              <Stat label="Bounced" value={data.totalBounced} />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Stat
                label="Open Rate"
                value={`${data.openRate}%`}
              />

              <Stat
                label="Reply Rate"
                value={`${data.replyRate}%`}
              />

              <Stat
                label="Bounce Rate"
                value={`${data.bounceRate}%`}
              />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/40">
                Email Timeline
              </h2>

              <div className="mt-5 space-y-3">
                {data.timeline.length === 0 ? (
                  <p className="text-sm text-white/40">
                    No email activity for this period.
                  </p>
                ) : (
                  data.timeline.map((day) => (
                    <div
                      key={day.date}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <p className="mb-3 text-sm font-semibold text-white/80">
                        {new Date(day.date).toLocaleDateString()}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-5">
                        <Metric label="Sent" value={day.sent} />
                        <Metric label="Delivered" value={day.delivered} />
                        <Metric label="Opened" value={day.opened} />
                        <Metric label="Replied" value={day.replied} />
                        <Metric label="Bounced" value={day.bounced} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <p className="text-white/30">{label}</p>
      <p className="mt-1 font-bold text-[#65FFAD]">
        {value}
      </p>
    </div>
  );
}