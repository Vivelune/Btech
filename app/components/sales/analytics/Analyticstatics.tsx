const stats = [
  { label: "Sent", value: "1,248" },
  { label: "Delivered", value: "1,198" },
  { label: "Opened", value: "824" },
  { label: "Not Opened", value: "374" },
  { label: "Replied", value: "186" },
  { label: "Bounced", value: "50" },
];

export default function AnalyticsStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/60">
            {stat.label}
          </p>

          <p className="mt-3 text-2xl font-bold text-[#F5F1E8]">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}