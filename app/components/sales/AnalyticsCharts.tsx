"use client";

const emailData = [
  35, 52, 43, 68, 55, 76, 64, 82, 70, 91, 84, 98,
];

const statuses = [
  ["New", 18],
  ["Contacted", 24],
  ["Replied", 15],
  ["Interested", 12],
  ["Meeting Booked", 9],
  ["Qualified", 7],
  ["Converted", 5],
];

export default function AnalyticsCharts() {
  const max = Math.max(...emailData);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6">
        <h2 className="font-semibold text-[#F5F1E8]">
          Emails Over Time
        </h2>

        <p className="mt-1 text-sm text-white/40">
          Email activity for the selected period.
        </p>

        <div className="mt-8 flex h-56 items-end gap-2">
          {emailData.map((value, index) => (
            <div
              key={index}
              className="group flex flex-1 items-end"
            >
              <div
                className="w-full rounded-t-md bg-[#65FFAD]/70 transition group-hover:bg-[#65FFAD]"
                style={{
                  height: `${(value / max) * 100}%`,
                }}
                title={`${value} emails`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6">
        <h2 className="font-semibold text-[#F5F1E8]">
          Lead Status Breakdown
        </h2>

        <p className="mt-1 text-sm text-white/40">
          Current distribution across the sales pipeline.
        </p>

        <div className="mt-7 space-y-4">
          {statuses.map(([label, value]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-white/60">{label}</span>

                <span className="text-white/40">{value}%</span>
              </div>

              <div className="h-2 rounded-full bg-white/5">
                <div
                  className="h-2 rounded-full bg-[#65FFAD]"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}